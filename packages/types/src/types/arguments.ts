import type { ApplicationCommandOptionType } from "discord.js";

export type ArgumentName =
	| keyof typeof ApplicationCommandOptionType
	| "Unknown";
