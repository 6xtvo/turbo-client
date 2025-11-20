import fs from "node:fs";
import { ConfigError } from "@app/structures/Error";
import { UtilsError } from "@app/structures/Error";
import type { ConfigOptions } from "@app/types";

export const ValidatorService = {
	/**
	 * Ensures all environment variables are defined and a valid token has been provided/
	 * @param {ConfigOptions} config The configuration options to be validated
	 */
	validateConfig(config: ConfigOptions) {
		const env = config.env;

		for (const [key, value] of Object.entries(process.env)) {
			if (typeof env[key] !== "undefined" && value === undefined) {
				throw new ConfigError(
					`Environment variable "${key}" is undefined`
				);
			}
		}

		if (
			"TOKEN" in env &&
			!(env.TOKEN as string).match(/[A-Za-z\d]{23}\.[\w-]{6}\.[\w-]{27}/g)
		) {
			throw new ConfigError("Invalid token provided.");
		}
	},

	/**
	 * Checks if the given path is a directory.
	 * @param path The file system path to check
	 * @returns True if the path is a directory, false otherwise
	 */
	isDirectory(path: string): boolean {
		try {
			return fs.statSync(path).isDirectory();
		} catch (error) {
			throw new UtilsError(
				`Error checking if path is a directory: ${error}`
			);
		}
	}
};
