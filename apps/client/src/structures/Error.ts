export class ConfigError extends Error {
	public constructor(message: string) {
		super(`ConfigError: ${message}`);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class ModuleError extends Error {
	public constructor(message: string) {
		super(`ModuleError: ${message}`);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class UtilsError extends Error {
	public constructor(message: string) {
		super(`UtilsError: ${message}`);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class PathError extends Error {
	public constructor(message: string) {
		super(`PathError: ${message}`);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}
