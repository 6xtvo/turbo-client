import { Listener } from "@/modules/Listener";
import type { TurboClient } from "@/structures/Client";
import type { Interaction } from "discord.js";

export default class InteractionCreateListener extends Listener {
    public constructor() {
        super("interactionCreate", {
            category: "client",
            emitter: "client"
        });
    }

    public async exec(client: TurboClient, interaction: Interaction) {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.user.bot) return;
        if (!interaction.isCommand()) return;
    
        const command = client.commandHandler.collection.get(interaction.commandName);

        if (!command) return client.embeds.warn(interaction, `The command \`${interaction.commandName}\` was not found, or currently unavailable.`);

        try {
            await command.exec(client, interaction);
        } catch (error) {
            client.embeds.error(interaction, {
                error,
                emitter: InteractionCreateListener.name
            });
        }
    }
}
