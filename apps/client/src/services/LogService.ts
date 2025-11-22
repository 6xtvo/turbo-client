import { CHALK, LEVEL_COLORS, LEVEL_LABELS } from "@/constants/logger";
import type { LogType } from "@pkgs/types";

export const LogService = {
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

	/**
	 * Logs a message to the console.
	 * @param {LogType} type The log level type
	 * @param {string} message The message to log
	 * @param {string} emitter The source of the log message
	 */
	log(type: LogType, message: string, emitter: string): void {
		console.log(this.format(type, message, emitter));
	},

	/**
	 * Logs an info level message.
	 * @param {string} message The message to log
	 * @param {string} emitter The source of the log message
	 */
	info(message: string, emitter: string) {
		return this.format("info", message, emitter);
	},

	/**
	 * Logs a ready level message.
	 * @param {string} message The message to log
	 * @param {string} emitter The source of the log message
	 */
	ready(message: string, emitter: string) {
		return this.format("ready", message, emitter);
	},

	/**
	 * Logs a warn level message.
	 * @param {string} message The message to log
	 * @param {string} emitter The source of the log message
	 */
	warn(message: string, emitter: string) {
		return this.format("warn", message, emitter);
	},

	/**
	 * Logs an error level message.
	 * @param {string} message The message to log
	 * @param {string} error_type The type of error e.g. `PathError`
	 */
	error(message: string, error_type: string) {
		return this.format("error", message, error_type);
	}
};
