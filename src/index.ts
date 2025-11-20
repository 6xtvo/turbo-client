import { MinkoClient } from "@app/structures/Client";

// @ts-ignore
import config from "../app.config.mjs";

const client = new MinkoClient(config);

client.start();
