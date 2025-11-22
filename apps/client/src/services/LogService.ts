import { CHALK, LEVEL_COLORS, LEVEL_LABELS } from "@/constants/logger";
import type { LogType } from "@pkgs/types";

export const LogService = {
	normalise(data: unknown): string {
		if (typeof data === "string") return data;
		if (data instanceof Error) return data.stack ?? data.message;
		return JSON.stringify(data);
	},

	/**
	 * Formats a log message.
	 * @param {LogType} type The log level type
	 * @param {string} message The message to log
	 * @param {string} emitter The source of the log message
	 * @returns The formatted log string.
	 */
	format(type: LogType, message: string, emitter: string): string {
		const date = CHALK.green(
			new Date().toLocaleDateString().replaceAll("/", "-")
		);
		const time = CHALK.green(new Date().toLocaleTimeString().toUpperCase());
		const level = LEVEL_COLORS[type](LEVEL_LABELS[type]);
		const paddedLevel =
			level + " ".repeat(Math.max(0, 8 - LEVEL_LABELS[type].length));
		const paddedEmitter =
			CHALK.blueBright(emitter) +
			" ".repeat(Math.max(0, 27 - emitter.length) + 1);

		return `${date} ${time}  ${paddedLevel} --- [main] ${paddedEmitter}: ${message}`;
	},

	log(type: LogType, data: unknown, emitter: string) {
		const message = this.normalise(data);
		console.log(this.format(type, message, emitter));
	},

	/**
	 * Logs an info level message.
	 * @param {unknown} data The data to log
	 * @param {string} emitter The source of the log message
	 */
	info(data: unknown, emitter: string) {
		this.log("info", data, emitter);
	},

	/**
	 * Logs a ready level message.
	 * @param {unknown} data The data to log
	 * @param {string} emitter The source of the log message
	 */
	ready(data: unknown, emitter: string) {
        this.log("ready", data, emitter);
	},

	/**
	 * Logs a warn level message.
	 * @param {unknown} data The data to log
	 * @param {string} emitter The source of the log message
	 */
	warn(data: unknown, emitter: string) {
		this.log("warn", data, emitter);
	},

	/**
	 * Logs an error level message.
	 * @param {unknown} data The data to log
	 * @param {string} error_type The type of error e.g. `PathError`
	 */
	error(data: unknown, error_type: string) {
		this.log("error", data, error_type);
	},
    
	/**
	 * Logs a debug level message.
	 * @param {unknown} data The data to log
	 * @param {string} emitter The source of the log message
	 */
	debug(data: unknown, emitter: string) {
		this.log("debug", data, emitter);
	}
};
