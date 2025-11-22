import { TurboClient } from "@/structures/Client";
import { resolveConfig } from "@/utils/resolve-config";
import "@pkgs/env";

const config = await resolveConfig("../app.config.mjs");
const client = new TurboClient(config);

client.start();
