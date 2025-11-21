import { TurboClient } from "@/structures/Client";
import { resolveConfig } from "@/utils/resolve-config";

const config = await resolveConfig("../app.config.mjs");
const client = new TurboClient(config);

client.start();
