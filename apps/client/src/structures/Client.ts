import { ListenerHandler } from "@/handlers/ListenerHandler";
import type { ConfigOptions } from "@pkgs/types";

import { join } from "node:path";
import { EmbedService } from "@/services/EmbedService";
import { printInfo } from "@/utils/print-info";
import { Client } from "discord.js";

export class TurboClient extends Client {
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
		await printInfo(this.config.version, this.config.banner);
		await this.listenerHandler.run();
	}

	public async start() {
		await this.init();
		return this.login(this.config.env.TOKEN);
	}
}
