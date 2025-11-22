import { IS_PRODUCTION } from "@/constants/env";
import { Listener } from "@/modules/Listener";
import { LogService } from "@/services/LogService";
import type { TurboClient } from "@/structures/Client";

export default class DebugListener extends Listener {
	public constructor() {
		super("debug", {
			category: "client",
			emitter: "client",
			once: true
		});
	}

	public async exec(_: TurboClient, info: string) {
		if (!IS_PRODUCTION) {
			LogService.debug(info, DebugListener.name);
		}
	}
}
