import type { LogType } from "@pkgs/types";

export const ERROR_CODES: Record<number, string> = {
	0: "success",
	1: "uncaught fatal exception",
	2: "bash error",
	3: "internal JavaScript parse error",
	4: "internal javascript evaluation failure",
	5: "fatal error",
	6: "non-function internal exception handler",
	7: "internal exception handler run-time failure",
	8: "uncaught exception (deprecated)",
	9: "invalid argument",
	10: "internal JavaScript run-time failure",
	12: "invalid debug argument"
};

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
	error: CHALK.red,
    debug: CHALK.blueBright
};

export const LEVEL_LABELS: Record<LogType, string> = {
	info: "INFO",
	ready: "READY",
	warn: "WARNING",
	error: "ERROR",
    debug: "DEBUG"
};
