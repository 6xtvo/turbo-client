import type { Command } from "@/modules/Command";
import { LogService } from "@/services/LogService";
import type { TurboClient } from "@/structures/Client";
import { Handler, type HandlerOptions } from "@/structures/Handler";
import { Collection, REST, Routes } from "discord.js";

export class CommandHandler extends Handler<Command> {
    public aliases: Collection<string, Command> = new Collection();
    private rest: REST;

    public constructor(client: TurboClient, options: HandlerOptions) {
        super(client, options);
        this.rest = new REST().setToken(client.config.env.TOKEN);
    }

    private async registerCommands() {
        const data = (await this.rest.put(
            Routes.applicationGuildCommands(
                this.client.config.env.CLIENT_ID,
                this.client.config.env.GUILD_ID
            ),
            {
                body: this.collection
                    .map((command) => command.toJSON())
                    .concat(this.aliases.map((alias) => alias.toJSON()))
            }
        )) as { length: number }; // todo: do something better

        LogService.info(
            `Registered ${data.length} command(s) to Discord API`,
            CommandHandler.name
        );
    }

    public async run() {
        await this.loadModules(this.directory);
        await this.registerCommands();
    }
}
