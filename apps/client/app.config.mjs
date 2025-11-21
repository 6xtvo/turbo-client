import { Options } from "discord.js";
import "dotenv/config";

/**
 * @param {import("discord.js").GatewayIntentBits[]} ALL_INTENTS
 * @param {import("discord.js").Partials[]} ALL_PARTIALS
 * @returns {import("@pkgs/types").ConfigOptions}
 */
const config = (ALL_INTENTS, ALL_PARTIALS) => {
	return {
		clientOptions: {
			allowedMentions: {
				parse: ["roles", "users"],
				repliedUser: false
			},
			intents: ALL_INTENTS,
			makeCache: Options.cacheEverything(),
			partials: ALL_PARTIALS,
			sweepers: Options.DefaultSweeperSettings
		},
		env: {
			CLIENT_ID: process.env.CLIENT_ID,
			CLIENT_SECRET: process.env.CLIENT_SECRET,
			TOKEN: process.env.TOKEN
		},
		owners: ["921906726817644594"]
	};
};

export default config;
