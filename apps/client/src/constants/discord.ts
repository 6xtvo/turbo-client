import { enumValues } from "@/utils/enum-values";
import { GatewayIntentBits, Partials } from "discord.js";

const ALL_INTENTS = enumValues(GatewayIntentBits);
const ALL_PARTIALS = enumValues(Partials);

export { ALL_INTENTS, ALL_PARTIALS };
