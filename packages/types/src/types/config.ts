import type { ClientOptions, CommandInteraction } from "discord.js";

export interface ConfigOptions {
	banner?: string;
	clientOptions: ClientOptions;
	env: NodeJS.ProcessEnv;
	owners: string[];
	version: string;
}

export interface ErrorMessageOptions {
	emitter: string;
	error: string | unknown;
}

export type MessageFunction<T> =
	| string
	| ((interaction: CommandInteraction, client: T) => Promise<string>);
