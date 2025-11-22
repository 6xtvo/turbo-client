import { Listener } from "@/modules/Listener";
import { LogService } from "@/services/LogService";

export default class WarningListener extends Listener {
	public constructor() {
		super("warning", {
			category: "process",
			emitter: "process",
			once: false
		});
	}

	public async exec(_: NodeJS.Process, warning: Error) {
		LogService.warn(warning.stack ?? warning.message, "Process");
	}
}
