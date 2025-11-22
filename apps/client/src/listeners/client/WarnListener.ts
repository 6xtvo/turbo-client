import { Listener } from "@/modules/Listener";
import { LogService } from "@/services/LogService";
import type { TurboClient } from "@/structures/Client";

export default class WarnListener extends Listener {
    public constructor() {
        super("warn", {
            category: "client",
            emitter: "client",
            once: true
        });
    }

    public async exec(_: TurboClient, message: string) {
        LogService.warn(message, WarnListener.name);
    }
}
