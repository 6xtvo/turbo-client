import { LogService } from "@app/services/LogService";
export class ConfigError extends Error {
	public constructor(message: string) {
		super(LogService.error(message, "ConfigError"));
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class ModuleError extends Error {
	public constructor(message: string) {
		super(LogService.error(message, "ModuleError"));
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class UtilsError extends Error {
	public constructor(message: string) {
		super(LogService.error(message, "UtilsError"));
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class PathError extends Error {
	public constructor(message: string) {
		super(LogService.error(message, "PathError"));
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

