import { ListenerHandler } from "@app/handlers/ListenerHandler";
import { ValidatorService } from "@app/services/ValidatorService";
import type { ConfigOptions } from "@app/types";

import { join } from "node:path";
import { EmbedService } from "@app/services/EmbedService";
import { Client } from "discord.js";

export class MinkoClient extends Client {
	public config: ConfigOptions;
	public embeds = new EmbedService({
		default: 0x2f3136
	});

	public listenerHandler = new ListenerHandler(this, {
		directory: join(import.meta.dirname, "..", "listeners")
	});

	public constructor(config: ConfigOptions) {
		super(config.clientOptions);
		this.config = config;
	}

	private async init() {
		ValidatorService.validateConfig(this.config);

		await this.listenerHandler.run();
	}

	public async start() {
		await this.init();
		return this.login(this.config.env.TOKEN);
	}
}
