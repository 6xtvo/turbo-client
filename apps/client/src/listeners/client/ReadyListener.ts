import { Listener } from "@/modules/Listener";
import { LogService } from "@/services/LogService";
import type { TurboClient } from "@/structures/Client";
import { ActivityType } from "discord.js";

export default class ReadyListener extends Listener {
	public constructor() {
		super("ready", {
			category: "client",
			emitter: "client",
			once: true
		});
	}

	public async exec(client: TurboClient): Promise<void> {
		if (client.isReady()) {
			LogService.log(
				"ready",
				`Successfully logged in as ${client.user.tag}`,
				this.constructor.name
			);

			client.user.setActivity({
				name: "minkos toes",
				type: ActivityType.Streaming,
				url: "https://www.twitch.tv/minkoj"
			});
		}
	}
}
