import { Options } from "discord.js";
import { ALL_INTENTS, ALL_PARTIALS } from "./dist/constants/discord.js";

import "dotenv/config";

/**
 * @type {import("./src/types/index.js".ConfigOptions)}
 */
const config = {
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

export default config;
