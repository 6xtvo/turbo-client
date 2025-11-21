import type { LogType } from "@pkgs/types";

export const CHALK = {
	green: (t: string) => `\x1b[32m${t}\x1b[0m`,
	blue: (t: string) => `\x1b[34m${t}\x1b[0m`,
	blueBright: (t: string) => `\x1b[94m${t}\x1b[0m`,
	yellow: (t: string) => `\x1b[33m${t}\x1b[0m`,
	red: (t: string) => `\x1b[31m${t}\x1b[0m`
};

export const LEVEL_COLORS: Record<LogType, (msg: string) => string> = {
	info: CHALK.blue,
	ready: CHALK.green,
	warn: CHALK.yellow,
	error: CHALK.red
};

export const LEVEL_LABELS: Record<LogType, string> = {
	info: "INFO",
	ready: "READY",
	warn: "WARNING",
	error: "ERROR"
};
