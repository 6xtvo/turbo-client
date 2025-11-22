import { Command } from "@/modules/Command";
import type { TurboClient } from "@/structures/Client";
import type { CommandInteraction } from "discord.js";

export default class ToesCommand extends Command {
    public constructor() {
        super("toes", {
            category: "fun",
            description: "u want sum toes?",
            examples: ["toes"]
        });
    }

    public async exec(_client: TurboClient, interaction: CommandInteraction) {
        await interaction.reply("chat is requesting minkos toes");
    }
}
