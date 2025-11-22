import { ListenerHandler } from "@/handlers/ListenerHandler";
import type { ConfigOptions } from "@pkgs/types";

import { join } from "node:path";
import { CommandHandler } from "@/handlers/CommandHandler";
import { EmbedService } from "@/services/EmbedService";
import { printInfo } from "@/utils/print-info";
import { Client } from "discord.js";

export class TurboClient extends Client {
	public config: ConfigOptions;
	public commandHandler: CommandHandler;
	public listenerHandler: ListenerHandler;
	public embeds = new EmbedService({
		default: 0x2f3136
	});

	public constructor(config: ConfigOptions) {
		super(config.clientOptions);
		this.config = config;

		this.commandHandler = new CommandHandler(this, {
			directory: join(import.meta.dirname, "..", "commands")
		});
		this.listenerHandler = new ListenerHandler(this, {
			directory: join(import.meta.dirname, "..", "listeners")
		});
	}

	private async init() {
		await printInfo(this.config.version, this.config.banner);

		await this.listenerHandler.run();
		await this.commandHandler.run();
	}

	public async start() {
		await this.init();
		return super.login(this.config.env.TOKEN);
	}
}
