import type { ClientOptions, CommandInteraction } from "discord.js";

export interface ConfigOptions {
	clientOptions: ClientOptions;
	env: NodeJS.ProcessEnv;
	owners: string[];
}

export interface ErrorOptions {
	deferred?: boolean;
	emitter: string;
	ephemeral?: boolean;
	error: string;
	method: "reply" | "send";
}

export interface WarnOptions {
	message: string;
	ephemeral?: boolean;
}

export type MessageFunction<T> =
	| string
	| ((interaction: CommandInteraction, client: T) => Promise<string>);
