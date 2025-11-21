import { ModuleError } from "@/structures/Error";
import { Module } from "@/structures/Module";
import type { ListenerEmitter, ListenerName } from "@pkgs/types";

export class Listener extends Module {
	public emitter: ListenerEmitter;
	public once: boolean;

	public constructor(name: ListenerName, options: ListenerOptions) {
		super(name, {
			category: options.category,
			description: options.description
		});

		this.emitter = options.emitter;
		this.once = options.once ?? false;
	}

	public async exec(..._args: unknown[]): Promise<unknown> {
		throw new ModuleError(
			`Listener class ${this.constructor.name} "exec" method has not been implemented`
		);
	}
}

export interface ListenerOptions {
	category: string;
	description?: string;
	emitter: ListenerEmitter;
	once?: boolean;
}
