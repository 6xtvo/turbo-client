import { TurboClient } from "@/structures/Client";
import config from "../app.config.mjs";

const client = new TurboClient(config);

client.start();
