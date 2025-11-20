import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LogService } from "@app/services/LogService";

const importPattern = /import\s+[^'"]+['"](\.+\/[^'"]+)['"]/g;
const jsExtensionPattern = /\.js$/i;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dist = path.resolve(__dirname, "../");

const excludedExts = [".mjs"];

class PathError extends Error {
	public constructor(message: string) {
		super(`PathError: ${message}`);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

async function updateFileImports(filePath: string): Promise<void> {
	try {
		if (excludedExts.some((ext) => filePath.endsWith(ext)))
			return console.log(`Skipping excluded file: ${filePath}`);

		const contents = await fs.readFile(filePath, "utf-8");

		const updatedContents = contents.replace(
			importPattern,
			(match, p1, _p2, _p3) => {
				if (!p1.match(jsExtensionPattern) && !p1.includes(".mjs"))
					return match.replace(p1, `${p1}.js`);
				return match;
			}
		);

		await fs.writeFile(filePath, updatedContents, "utf-8");
	} catch (err) {
		throw new PathError(`Error processing file ${filePath}: ${err}`);
	}
}

async function processFiles(): Promise<void> {
	try {
		const jsFiles = await getAllJsFiles(dist);
		await Promise.all(jsFiles.map(updateFileImports)).then(() =>
			LogService.info(
				`Updated imports in ${jsFiles.length} files in ${dist}`,
				"PathResolver"
			)
		);
	} catch (err) {
		throw new PathError(`Error processing directory: ${err}`);
	}
}

async function getAllJsFiles(dir: string): Promise<string[]> {
	let jsFiles: string[] = [];
	const entries = await fs.readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			// Recursively get JS files in subdirectory
			const nestedFiles = await getAllJsFiles(fullPath);
			jsFiles = jsFiles.concat(nestedFiles);
		} else if (entry.isFile() && fullPath.endsWith(".js")) {
			jsFiles.push(fullPath);
		}
	}

	return jsFiles;
}

processFiles();
