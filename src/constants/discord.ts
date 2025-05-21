import Utils from "@app/utils";

import { GatewayIntentBits, Partials } from "discord.js";

const ALL_INTENTS = Utils.enumValues(GatewayIntentBits)
const ALL_PARTIALS = Utils.enumValues(Partials)

export {
    ALL_INTENTS,
    ALL_PARTIALS
}