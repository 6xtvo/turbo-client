import { Listener } from "@app/modules/listener";
import { LogService } from "@app/services/LogService";
import type { MinkoClient } from "@app/structures/Client";
import { ActivityType } from "discord.js";

export default class ReadyListener extends Listener {
	public constructor() {
		super("ready", {
			category: "client",
			emitter: "client",
			once: true
		});
	}

	public async exec(client: MinkoClient): Promise<void> {
		if (client.isReady()) {
			console.log(
				LogService.ready(
					`Successfully logged in as ${client.user.tag}`,
					"ReadyListener"
				)
			);
			// Note: need to change Logger to log to console

			client.user.setActivity({
				name: "minkos toes",
				type: ActivityType.Streaming,
				url: "https://www.twitch.tv/minkoj"
			});
		}
	}
}
