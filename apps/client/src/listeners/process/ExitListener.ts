import { ERROR_CODES } from "@/constants/logger";
import { Listener } from "@/modules/Listener";
import { LogService } from "@/services/LogService";

export default class ExitListener extends Listener {
	public constructor() {
		super("exit", {
			category: "process",
			emitter: "process",
			once: false
		});
	}

	public async exec(_: NodeJS.Process, code: number) {
		LogService.info(
			`Exiting with code ${code} (${ERROR_CODES[code]})`,
			"Process"
		);
	}
}
