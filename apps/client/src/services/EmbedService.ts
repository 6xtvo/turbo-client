import type { ErrorMessageOptions } from "@pkgs/types";
import {
	type CommandInteraction,
	EmbedBuilder,
	type EmbedData
} from "discord.js";
import { LogService } from "./LogService";

export class EmbedService<TColors extends Record<string, number>> {
	public colors: TColors;

	public constructor(colors: TColors) {
		this.colors = colors;
	}

	public createEmbed(options: EmbedData): EmbedBuilder {
		return new EmbedBuilder(
			options.color ? options : { ...options, color: this.colors.default }
		);
	}

	public error(interaction: CommandInteraction, options: ErrorMessageOptions) {
		LogService.error(options.error, options.emitter);

		const embed: EmbedBuilder = this.createEmbed({
			author: {
				name: "Whoops! Looks like an internal error occurred.",
				iconURL: interaction.client.user.displayAvatarURL()
			},
			description: `Hey there, ${interaction.user}. Looks like an internal error occurred while processing your command. Please try again later, or if the problem persists, try contacting the owner.`
		});

        return interaction.reply({
            embeds: [embed],
            flags: ["Ephemeral"]
        })
	}

	public warn(interaction: CommandInteraction, message: string) {
		return interaction.reply({
			embeds: [
				this.createEmbed({
					color: this.colors.default,
					description: message
				})
			],
			flags: ["Ephemeral"]
		});
	}
}
