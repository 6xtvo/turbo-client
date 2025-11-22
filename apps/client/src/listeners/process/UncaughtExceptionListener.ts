import { Listener } from "@/modules/Listener";
import { LogService } from "@/services/LogService";

export default class UncaughtExceptionListener extends Listener {
	public constructor() {
		super("uncaughtException", {
			category: "process",
			emitter: "process",
			once: false
		});
	}

	public async exec(
		_: NodeJS.Process,
		error: Error,
		origin: NodeJS.UncaughtExceptionOrigin
	) {
		LogService.error(
			`Uncaught exception: ${error.stack}\nOrigin: ${origin}`,
			"Process"
		);
	}
}
