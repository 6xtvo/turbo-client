import path from "node:path";
import { fileURLToPath } from "node:url";
import { LogService } from "@/services/LogService";
import { PathError } from "@/structures/Error";
import type { ConfigOptions } from "@pkgs/types";

export async function resolveConfig(filePath: string): Promise<ConfigOptions> {
	try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
		const resolvedPath = path.resolve(__dirname, "..", filePath);
		const configFile = await import(`file://${resolvedPath}`);

		if (configFile?.default) {
			return configFile.default as ConfigOptions;
		}

		throw new PathError("Config file does not have a default export");
	} catch (error: unknown) {
		LogService.log("error", (error as Error).message, "ConfigResolver");
		return {} as ConfigOptions;
	}
}
