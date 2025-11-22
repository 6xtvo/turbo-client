import { Listener } from "@/modules/Listener";
import { LogService } from "@/services/LogService";

export default class UnhandledRejectionListener extends Listener {
	public constructor() {
		super("unhandledRejection", {
			category: "process",
			emitter: "process",
			once: false
		});
	}

	public async exec(_: NodeJS.Process, error: Error) {
		LogService.error(`Unhandled rejection: ${error.stack}`, "Process");
	}
}
