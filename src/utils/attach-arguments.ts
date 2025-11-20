import type { Command } from "@app/modules/command";
import type { SubCommand } from "@app/modules/subcommand";
import {
	type ApplicationCommandAttachmentOption,
	type ApplicationCommandBooleanOption,
	type ApplicationCommandChannelOption,
	type ApplicationCommandMentionableOption,
	type ApplicationCommandNumericOption,
	type ApplicationCommandOption,
	ApplicationCommandOptionType,
	type ApplicationCommandRoleOption,
	type ApplicationCommandStringOption,
	type SlashCommandAttachmentOption,
	type SlashCommandBooleanOption,
	type SlashCommandChannelOption,
	type SlashCommandIntegerOption,
	type SlashCommandMentionableOption,
	type SlashCommandNumberOption,
	type SlashCommandRoleOption,
	type SlashCommandStringOption
} from "discord.js";

/**
 * Attaches the given arguments to the given command or subcommand.
 * @param {Command | SubCommand} command The command or subcommand to attach the arguments to
 * @param {ApplicationCommandOption[]} args The arguments to attach
 */
export function attachArguments(
	command: Command | SubCommand,
	args?: ApplicationCommandOption[]
): void {
	if (!args) return;

	for (const arg of args) {
		switch (arg.type) {
			case ApplicationCommandOptionType.Attachment: {
				const attachmentArg: ApplicationCommandAttachmentOption =
					arg as ApplicationCommandAttachmentOption;

				command.addAttachmentOption(
					(
						option: SlashCommandAttachmentOption
					): SlashCommandAttachmentOption =>
						option
							.setName(attachmentArg.name)
							.setDescription(attachmentArg.description)
							.setRequired(attachmentArg.required || false)
							.setNameLocalizations(
								attachmentArg.nameLocalizations
									? attachmentArg.nameLocalizations
									: {}
							)
							.setDescriptionLocalizations(
								attachmentArg.descriptionLocalizations
									? attachmentArg.descriptionLocalizations
									: {}
							)
				);

				break;
			}

			case ApplicationCommandOptionType.Boolean: {
				const booleanArg: ApplicationCommandBooleanOption =
					arg as ApplicationCommandBooleanOption;

				command.addBooleanOption(
					(
						option: SlashCommandBooleanOption
					): SlashCommandBooleanOption =>
						option
							.setName(booleanArg.name)
							.setDescription(booleanArg.description)
							.setRequired(booleanArg.required || false)
							.setNameLocalizations(
								booleanArg.nameLocalizations
									? booleanArg.nameLocalizations
									: {}
							)
							.setDescriptionLocalizations(
								booleanArg.descriptionLocalizations
									? booleanArg.descriptionLocalizations
									: {}
							)
				);

				break;
			}

			case ApplicationCommandOptionType.Channel: {
				const channelArg: ApplicationCommandChannelOption =
					arg as ApplicationCommandChannelOption;

				command.addChannelOption(
					(
						option: SlashCommandChannelOption
					): SlashCommandChannelOption =>
						option
							.setName(channelArg.name)
							.setDescription(channelArg.description)
							.setRequired(channelArg.required || false)
							.setNameLocalizations(
								channelArg.nameLocalizations
									? channelArg.nameLocalizations
									: {}
							)
							.setDescriptionLocalizations(
								channelArg.descriptionLocalizations
									? channelArg.descriptionLocalizations
									: {}
							)
				);

				break;
			}

			case ApplicationCommandOptionType.Integer: {
				const integerArg: ApplicationCommandNumericOption =
					arg as ApplicationCommandNumericOption;

				command.addIntegerOption(
					(
						option: SlashCommandIntegerOption
					): SlashCommandIntegerOption => {
						const opt: SlashCommandIntegerOption = option
							.setName(integerArg.name)
							.setDescription(integerArg.description)
							.setRequired(integerArg.required || false)
							.setNameLocalizations(
								integerArg.nameLocalizations
									? integerArg.nameLocalizations
									: {}
							)
							.setDescriptionLocalizations(
								integerArg.descriptionLocalizations
									? integerArg.descriptionLocalizations
									: {}
							)
							.setAutocomplete(integerArg.autocomplete || false);

						integerArg.choices &&
							opt.setChoices(...integerArg.choices);
						integerArg.minValue &&
							opt.setMinValue(integerArg.minValue);
						integerArg.maxValue &&
							opt.setMaxValue(integerArg.maxValue);

						return opt;
					}
				);

				break;
			}

			case ApplicationCommandOptionType.Mentionable: {
				const mentionableArg: ApplicationCommandMentionableOption =
					arg as ApplicationCommandMentionableOption;

				command.addMentionableOption(
					(
						option: SlashCommandMentionableOption
					): SlashCommandMentionableOption =>
						option
							.setName(mentionableArg.name)
							.setDescription(mentionableArg.description)
							.setRequired(mentionableArg.required || false)
							.setNameLocalizations(
								mentionableArg.nameLocalizations
									? mentionableArg.nameLocalizations
									: {}
							)
							.setDescriptionLocalizations(
								mentionableArg.descriptionLocalizations
									? mentionableArg.descriptionLocalizations
									: {}
							)
				);

				break;
			}

			case ApplicationCommandOptionType.Number: {
				const numberArg: ApplicationCommandNumericOption =
					arg as ApplicationCommandNumericOption;

				command.addNumberOption(
					(
						option: SlashCommandNumberOption
					): SlashCommandNumberOption => {
						const opt: SlashCommandNumberOption = option
							.setName(numberArg.name)
							.setDescription(numberArg.description)
							.setRequired(numberArg.required || false)
							.setNameLocalizations(
								numberArg.nameLocalizations
									? numberArg.nameLocalizations
									: {}
							)
							.setDescriptionLocalizations(
								numberArg.descriptionLocalizations
									? numberArg.descriptionLocalizations
									: {}
							)
							.setAutocomplete(numberArg.autocomplete || false);

						numberArg.choices &&
							opt.setChoices(...numberArg.choices);
						numberArg.minValue &&
							opt.setMinValue(numberArg.minValue);
						numberArg.maxValue &&
							opt.setMaxValue(numberArg.maxValue);

						return opt;
					}
				);

				break;
			}

			case ApplicationCommandOptionType.Role: {
				const roleArg: ApplicationCommandRoleOption =
					arg as ApplicationCommandRoleOption;

				command.addRoleOption(
					(option: SlashCommandRoleOption): SlashCommandRoleOption =>
						option
							.setName(roleArg.name)
							.setDescription(roleArg.description)
							.setRequired(roleArg.required || false)
							.setNameLocalizations(
								roleArg.nameLocalizations
									? roleArg.nameLocalizations
									: {}
							)
							.setDescriptionLocalizations(
								roleArg.descriptionLocalizations
									? roleArg.descriptionLocalizations
									: {}
							)
				);

				break;
			}

			case ApplicationCommandOptionType.String: {
				const stringArg: ApplicationCommandStringOption =
					arg as ApplicationCommandStringOption;

				command.addStringOption(
					(
						option: SlashCommandStringOption
					): SlashCommandStringOption => {
						const opt: SlashCommandStringOption = option
							.setName(stringArg.name)
							.setDescription(stringArg.description)
							.setRequired(stringArg.required || false)
							.setNameLocalizations(
								stringArg.nameLocalizations
									? stringArg.nameLocalizations
									: {}
							)
							.setDescriptionLocalizations(
								stringArg.descriptionLocalizations
									? stringArg.descriptionLocalizations
									: {}
							)
							.setAutocomplete(stringArg.autocomplete || false);

						stringArg.choices &&
							opt.setChoices(...stringArg.choices);
						stringArg.minLength &&
							opt.setMinLength(stringArg.minLength);
						stringArg.maxLength &&
							opt.setMaxLength(stringArg.maxLength);

						return opt;
					}
				);

				break;
			}
		}
	}
}
