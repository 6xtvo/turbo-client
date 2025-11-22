import type { Listener } from "@/modules/Listener";
import { Handler } from "@/structures/Handler";

export class ListenerHandler extends Handler<Listener> {
	private addListener(listener: Listener): void {
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
				this.addListener(listener);
			}
		}
	}
}
