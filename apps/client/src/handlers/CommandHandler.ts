import type { Command } from "@/modules/Command";
import type { TurboClient } from "@/structures/Client";
import { Handler } from "@/structures/Handler";

export class CommandHandler extends Handler<Command> {
	private client: TurboClient;
	private directory: string;

	public constructor(client: TurboClient, options: CommandHandlerOptions) {
		super();
		this.client = client;
		this.directory = options.directory;
	}
}

export interface CommandHandlerOptions {
	directory: string;
}
