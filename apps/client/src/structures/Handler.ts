import fs from "node:fs";
import { ValidatorService } from "@/services/ValidatorService";
import { ModuleError } from "@/structures/Error";
import { Module } from "@/structures/Module";
import { Collection } from "discord.js";
import { Category } from "./Category";
import type { TurboClient } from "./Client";
import { LogService } from "@/services/LogService";

export class Handler<T extends Module = Module> {
	/**
	 * Categories for modules.
	 */
	public categories: Collection<string, Category<T>> = new Collection();

	/**
	 * The collection of modules.
	 */
	public collection: Collection<string, T> = new Collection();

	protected client: TurboClient;
	protected directory: string;

	public constructor(client: TurboClient, options: HandlerOptions) {
		this.client = client;
		this.directory = options.directory;
	}

	/**
	 * Adds a module to the collection.
	 * @param module The module to be added to the collection.
	 */
	private setModule(module: T): void {
		this.collection.set(module.name, module);

		if (!this.categories.has(module.category)) {
			const category = new Category<T>(module.category);
			category.collection.set(module.name, module);

			this.categories.set(module.category, category);
		} else {
			const category = this.categories.get(module.category);
			category?.collection.set(module.name, module);
		}
	}

	/**
	 * Reads a module from the specified path and adds it to the collection.
	 * @param path The path to the module file.
	 * @throws {ModuleError} If the module does not have a default export or if the default export is not an instance of Module.
	 */
	private async readModule(path: string) {
		try {
			const module = await import(`file://${path}`);

			if (module.default) {
				const instance = new module.default();

				if (instance instanceof Module) {
					this.setModule(instance as T);
				} else {
					throw new ModuleError(
						`Module ${path} default export is not an instance of Module`
					);
				}
			} else {
				throw new ModuleError(
					`Module ${path} does not have a default export`
				);
			}
		} catch (error) {
			LogService.error(error, Handler.name);
		}
	}

	private isModule(path: string): boolean {
		return ["Command", "Listener", "Inhibitor"].some((type) =>
			path.endsWith(`${type}.js`)
		);
	}

	/**
	 * Loads modules from the specified paths.
	 * @param path The path to the directory containing the modules.
	 * @throws {ModuleError} If the module does not have a default export or if the default export is not an instance of Module.
	 */
	protected async loadModules(path: string) {
		if (ValidatorService.isDirectory(path)) {
			for (const child of fs.readdirSync(path)) {
				const childPath = `${path}/${child}`;
				if (this.isModule(childPath)) {
					await this.readModule(childPath);
				} else {
					await this.loadModules(childPath);
				}
			}
		}
	}
}

export interface HandlerOptions {
	directory: string;
}
