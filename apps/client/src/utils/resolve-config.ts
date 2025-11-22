import path from "node:path";
import { fileURLToPath } from "node:url";
import { ALL_INTENTS, ALL_PARTIALS } from "@/constants/discord";
import { LogService } from "@/services/LogService";
import { ValidatorService } from "@/services/ValidatorService";
import { PathError } from "@/structures/Error";
import type { ConfigOptions } from "@pkgs/types";

export async function resolveConfig(filePath: string): Promise<ConfigOptions> {
	try {
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);
		const resolvedPath = path.resolve(__dirname, "..", filePath);
		const configFile = await import(`file://${resolvedPath}`);

		if (configFile?.default) {
			const defaultConfig = configFile.default;
			let config: ConfigOptions = defaultConfig;

			if (typeof defaultConfig === "function") {
				config = defaultConfig(ALL_INTENTS, ALL_PARTIALS);
			}

			ValidatorService.validateConfig(config);

			LogService.info(
				`Successfully resolved config from ${resolvedPath}`,
				"ConfigResolver"
			);

			return config;
		}

		throw new PathError("Config file does not have a default export");
	} catch (error: unknown) {
		LogService.error(error, "ConfigResolver");
	}

	return {} as ConfigOptions;
}
