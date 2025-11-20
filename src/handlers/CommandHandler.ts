import type { Command } from "@app/modules/Command";
import type { DCClient } from "@app/structures/Client";
import { Handler } from "@app/structures/Handler";

export class CommandHandler extends Handler<Command> {
    private client: DCClient;
    private directory: string;

    public constructor(client: DCClient, options: CommandHandlerOptions) {
        super();
        this.client = client;
        this.directory = options.directory;
    }
}

export interface CommandHandlerOptions {
    directory: string;
}
