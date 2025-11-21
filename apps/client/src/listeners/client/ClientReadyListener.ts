import { Listener } from "@/modules/Listener";
import { LogService } from "@/services/LogService";
import type { TurboClient } from "@/structures/Client";
import { ActivityType } from "discord.js";

export default class ClientReadyListener extends Listener {
	public constructor() {
		super("clientReady", {
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
				ClientReadyListener.name
			);

			client.user.setActivity({
				name: "minkos toes",
				type: ActivityType.Streaming,
				url: "https://www.twitch.tv/minkoj"
			});
		}
	}
}
