import type { AppConfig } from "./src/types"
import { ALL_INTENTS, ALL_PARTIALS } from "./src/constants/discord"

import { Options } from "discord.js";

const config: AppConfig = {
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
        TOKEN: process.env.TOKEN
    },
    owners: ["521576111621144591"]
};

export default config;