/**
 * Standalone script to resolve relative import paths in compiled JavaScript files.
 * As the `LogService` can't be imported as paths haven't yet been resolved,
 * this script includes a minimal logging implementation.
 */

// -----------------------------
// Imports
// -----------------------------
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// -----------------------------
// Types
// -----------------------------
type LogType = "info" | "ready" | "warn" | "error";

// -----------------------------
// Constants
// -----------------------------
const CHALK = {
	green: (t: string) => `\x1b[32m${t}\x1b[0m`,
	blue: (t: string) => `\x1b[34m${t}\x1b[0m`,
	blueBright: (t: string) => `\x1b[94m${t}\x1b[0m`,
	yellow: (t: string) => `\x1b[33m${t}\x1b[0m`,
	red: (t: string) => `\x1b[31m${t}\x1b[0m`
};

const LEVEL_COLORS: Record<LogType, (msg: string) => string> = {
	info: CHALK.blue,
	ready: CHALK.green,
	warn: CHALK.yellow,
	error: CHALK.red
};

const LEVEL_LABELS: Record<LogType, string> = {
	info: "INFO",
	ready: "READY",
	warn: "WARNING",
	error: "ERROR"
};

const importPattern = /import\s+[^'"]+['"](\.+\/[^'"]+)['"]/g;
const jsExtensionPattern = /\.js$/i;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dist = path.resolve(__dirname, "../");
const excludedExts = [".mjs"];

// -----------------------------
// Logging utilities
// -----------------------------
function format(type: LogType, message: string, emitter: string): string {
	const date = CHALK.green(
		new Date().toLocaleDateString().replaceAll("/", "-")
	);
	const time = CHALK.green(new Date().toLocaleTimeString().toUpperCase());

	const level = LEVEL_COLORS[type](LEVEL_LABELS[type]);

	const paddedEmitter =
		CHALK.blueBright(emitter) +
		" ".repeat(Math.max(0, 27 - emitter.length) + 1);

	return `${date} ${time}  ${level.padEnd(8)} --- [main] ${paddedEmitter}: ${message}`;
}

function info(message: string) {
	console.log(format("info", message, "PathResolver"));
}

function error(message: string) {
	return format("error", message, "PathError");
}

// -----------------------------
// Error Class
// -----------------------------
class PathError extends Error {
	public constructor(message: string) {
		super(error(message));
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

// -----------------------------
// Core file-processing functions
// -----------------------------
async function updateFileImports(filePath: string): Promise<void> {
	try {
		if (excludedExts.some((ext) => filePath.endsWith(ext)))
			return console.log(`Skipping excluded file: ${filePath}`);

		const contents = await fs.readFile(filePath, "utf-8");

		const updatedContents = contents.replace(importPattern, (match, p1) => {
			if (!p1.match(jsExtensionPattern) && !p1.includes(".mjs"))
				return match.replace(p1, `${p1}.js`);
			return match;
		});

		await fs.writeFile(filePath, updatedContents, "utf-8");
	} catch (err) {
		throw new PathError(`Error processing file ${filePath}: ${err}`);
	}
}

async function getAllJsFiles(dir: string): Promise<string[]> {
	let jsFiles: string[] = [];
	const entries = await fs.readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			const nestedFiles = await getAllJsFiles(fullPath);
			jsFiles = jsFiles.concat(nestedFiles);
		} else if (entry.isFile() && fullPath.endsWith(".js")) {
			jsFiles.push(fullPath);
		}
	}

	return jsFiles;
}

async function processFiles(): Promise<void> {
	try {
		const jsFiles = await getAllJsFiles(dist);
		await Promise.all(jsFiles.map(updateFileImports)).then(() =>
			info(`Updated imports in ${jsFiles.length} files in ${dist}`)
		);
	} catch (err) {
		throw new PathError(`Error processing directory: ${err}`);
	}
}

// -----------------------------
// Entrypoint
// -----------------------------
processFiles();
