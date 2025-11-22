import { Listener } from "@/modules/Listener";
import { LogService } from "@/services/LogService";
import type { TurboClient } from "@/structures/Client";

export default class ErrorListener extends Listener {
	public constructor() {
		super("error", {
			category: "client",
			emitter: "client",
			once: true
		});
	}

	public async exec(_: TurboClient, error: Error) {
		LogService.error(error, ErrorListener.name);
	}
}
