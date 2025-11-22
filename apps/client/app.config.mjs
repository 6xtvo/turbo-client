import fs from "node:fs";
import path from "node:path";
import { Options } from "discord.js";
import "dotenv/config";

const pkg = JSON.parse(
	fs.readFileSync(path.resolve(import.meta.dirname, "package.json"), "utf8")
);

/**
 * @param {import("discord.js").GatewayIntentBits[]} ALL_INTENTS
 * @param {import("discord.js").Partials[]} ALL_PARTIALS
 * @returns {import("@pkgs/types").ConfigOptions}
 */
const config = (ALL_INTENTS, ALL_PARTIALS) => {
	return {
		banner: `
_______________ _______________________ ________         /\\      /\\  _________ .____    .______________ __________________
\\__    ___/    |   \\______   \\______   \\\\_____  \\       / /     / /  \\_   ___ \\|    |   |   \\_   _____/ \\      \\__    ___/
   |   |  |    |   /|       _/|    |  _/ /   |   \\     / /     / /   /    \\  \\/|    |   |   ||    __)_  /   |   \\|    |   
   |   |  |    |  / |    |   \\|    |   \\/    |    \\   / /     / /    \\     \\___|    |___|   ||        \\/    |    \\    |   
   |___|  |______/  |____|_  /|______  /\\_______  /  / /     / /      \\______  /_______ \\___/_______  /\\____|__  /____|   
                           \\/        \\/         \\/   \\/      \\/              \\/        \\/           \\/         \\/         
        `,
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
            GUILD_ID: process.env.GUILD_ID,
			TOKEN: process.env.TOKEN
		},
		owners: ["921906726817644594"],
		version: pkg.version
	};
};

export default config;
