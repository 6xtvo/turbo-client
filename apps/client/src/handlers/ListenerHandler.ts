import type { Listener } from "@/modules/Listener";
import { LogService } from "@/services/LogService";
import type { TurboClient } from "@/structures/Client";
import { Handler } from "@/structures/Handler";

export class ListenerHandler extends Handler<Listener> {
	private client: TurboClient;
	private directory: string;

	public constructor(client: TurboClient, options: ListenerHandlerOptions) {
		super();
		this.client = client;
		this.directory = options.directory;
	}

	private runListener(listener: Listener): void {
		switch (listener.emitter) {
			case "client":
				if (listener.once) {
					this.client.once(
						listener.name.toString(),
						listener.exec.bind(null, this.client)
					);
				} else {
					this.client.on(
						listener.name.toString(),
						listener.exec.bind(null, this.client)
					);
				}

				break;
			case "process":
				if (listener.once) {
					process.once(
						listener.name,
						listener.exec.bind(null, process)
					);
				} else {
					process.on(
						listener.name,
						listener.exec.bind(null, process)
					);
				}

				break;
		}
	}

	public async run() {
		await this.loadModules(this.directory);

		for (const category of this.categories.values()) {
			for (const listener of category.collection.values()) {
				this.runListener(listener);
			}

			LogService.info(
				`Loaded ${category.collection.size} listener(s) from the category "${category.name}"`,
				this.constructor.name
			);
		}
	}
}

export interface ListenerHandlerOptions {
	directory: string;
}
