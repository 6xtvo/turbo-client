import { DCClient } from "@app/structures/Client";

// @ts-ignore
import config from "../app.config.mjs";

const client = new DCClient(config);

client.start();
