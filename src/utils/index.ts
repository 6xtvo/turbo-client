import type { AppConfig } from "@app/types";
import { ConfigError } from "@app/structures/errors"

export default class Utils {
    public static validateConfig(config: AppConfig) {
        const env = config.env;

        for (const [key, value] of Object.entries(process.env)) {
            if (typeof env[key] !== "undefined" && value === undefined) {
                throw new ConfigError(`Environment variable "${key}" is undefined`);
            }
        }
    }

    public static enumValues<T extends Record<string, string | number>>(e: T): (T[keyof T])[] {
        return Object.values(e) as (T[keyof T])[];
    }
}