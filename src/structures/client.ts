import type { AppConfig } from "@app/types";
import Utils from "@app/utils";

import { Client } from "discord.js";

export class WestsideClient extends Client {
    public config: AppConfig;

    public constructor(config: AppConfig) {
        super(config.clientOptions);
        this.config = config;
    }

    private async init() {
        Utils.validateConfig(this.config);
    }

    public async start() {
        await this.init();
        return this.login(this.config.env.TOKEN)
    }
}