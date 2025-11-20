import { ModuleError } from "@app/structures/Error";
import type { Localisations } from "@app/types";
import { attachArguments } from "@app/utils/attach-arguments";
import {
	type ApplicationCommandOption,
	InteractionContextType,
	type PermissionsString,
	SlashCommandBuilder
} from "discord.js";
import type { SubCommand } from "./subcommand";

export class Command extends SlashCommandBuilder {
	public aliases: string[];
	public args?: ApplicationCommandOption[];
	public category: string;
	public command_options: CommandOptions;
	public examples: string[];
	public ownerOnly: boolean;
	public permissions: CommandPermissions;
	public subcommands: SubCommand[];
	public usage: string;

	public constructor(name: string, options: CommandOptions) {
		super();

		this.setOptions(options);
		this.setAliases(options.aliases ? options.aliases : []);
		this.setCategory(options.category);
		this.setDescription(options.description);
		this.setDescriptionLocalizations(
			options.descriptionLocalisations
				? options.descriptionLocalisations
				: {}
		);
		this.setContexts([
			InteractionContextType.Guild,
			...(options.permissions?.allowDMs
				? [InteractionContextType.BotDM]
				: [])
		]);
		this.setExamples(options.examples);
		this.setOwnerOnly(options.ownerOnly ? options.ownerOnly : false);
		this.setPermissions(
			options.permissions
				? options.permissions
				: {
						allowDMs: false,
						user: ["SendMessages", "UseApplicationCommands"],
						client: [],
						voiceRequired: false
					}
		);
		this.setName(name);
		this.setNameLocalizations(
			options.nameLocalisations ? options.nameLocalisations : {}
		);
		this.setNSFW(options.permissions?.nsfw || false);
		this.setUsage(options.usage);
		this.setSubcommands(options.subcommands ? options.subcommands : []);

		attachArguments(this, options.args);
	}

	public async exec(..._args: unknown[]): Promise<unknown> {
		throw new ModuleError(
			`Command class ${this.constructor.name} "exec" method has not been implemented`
		);
	}

	public getSubCommand(name: string): SubCommand | null {
		return (
			this.subcommands.filter(
				(subcommand: SubCommand): boolean =>
					subcommand.name.toLowerCase() === name.toLowerCase()
			)[0] || null
		);
	}

	public setAliases(aliases: string[]): this {
		this.aliases = aliases;
		return this;
	}

	public setArgs(args?: ApplicationCommandOption[]): this {
		this.args = args;
		return this;
	}

	public setCategory(category: string): this {
		this.category = category;
		return this;
	}

	public setExamples(examples: string[]): this {
		this.examples = examples;
		return this;
	}

	public setOwnerOnly(ownerOnly: boolean): this {
		this.ownerOnly = ownerOnly;
		return this;
	}

	public setPermissions(permissions: CommandPermissions): this {
		this.permissions = permissions;
		return this;
	}

	public setUsage(usage: string): this {
		this.usage = usage;
		return this;
	}

	public setSubcommands(subcommands: SubCommand[]): this {
		this.subcommands = subcommands;
		return this;
	}

	private setOptions(options: CommandOptions): this {
		this.command_options = options;
		return this;
	}
}

export interface CommandPermissions {
	allowDMs: boolean;
	client: PermissionsString[];
	nsfw?: boolean;
	user: PermissionsString[];
	voiceRequired?: boolean;
}

export interface CommandOptions {
	aliases?: string[];
	args?: ApplicationCommandOption[];
	category: string;
	description: string;
	descriptionLocalisations?: Localisations;
	examples: string[];
	nameLocalisations?: Localisations;
	ownerOnly?: boolean;
	permissions?: CommandPermissions;
	subcommands?: SubCommand[];
	usage: string;
}
