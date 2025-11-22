import { ModuleError } from "@/structures/Error";
import type { Module } from "@/structures/Module";
import { attachArguments } from "@/utils/attach-arguments";
import type { Localisations } from "@pkgs/types";
import {
	type ApplicationCommandOption,
	InteractionContextType,
	SlashCommandBuilder
} from "discord.js";
import type { SubCommand } from "./SubCommand";

export class Command extends SlashCommandBuilder implements Module {
	public args?: ApplicationCommandOption[];
	public category!: string;
	public examples!: string[];
	public ownerOnly = false;
	public permissions?: CommandPermissions;
	public subcommands?: SubCommand[];
	public usage!: string;

	public constructor(name: string, options: CommandOptions) {
		super();

		const opts = this.options
			.map((opt) => {
				const { name, required } = opt.toJSON();
				return required ? `<${name}>` : `[${name}]`;
			})
			.join(" ");

		this.setName(name)
			.setNameLocalizations(options.nameLocalisations ?? {})
			.setDescription(options.description)
			.setDescriptionLocalizations(options.descriptionLocalisations ?? {})
			.setCategory(options.category)
			.setExamples(options.examples.map(example => `/${example}`))
			.setOwnerOnly(options.ownerOnly || false)
			.setUsage(`/${name} ${opts}`.trim())
			.setContexts([
				InteractionContextType.Guild,
				...(options.permissions?.allowDMs
					? [InteractionContextType.BotDM]
					: [])
			])
			.setNSFW(options.permissions?.nsfw || false)
			.setSubcommands(options.subcommands ?? [])
			.setArguments(options.args);

		if (options.permissions?.user) {
			this.setDefaultMemberPermissions(options.permissions.user);
		}
	}

	public async exec(..._args: unknown[]): Promise<unknown> {
		throw new ModuleError(
			`Command class ${this.constructor.name} "exec" method has not been implemented`
		);
	}

	protected getSubCommand(name: string): SubCommand | undefined {
		return this.subcommands?.filter(
			(subcommand: SubCommand): boolean =>
				subcommand.name.toLowerCase() === name.toLowerCase()
		)[0];
	}

	protected setCategory(category: string): this {
		this.category = category;
		return this;
	}

	protected setExamples(examples: string[]): this {
		this.examples = examples;
		return this;
	}

	protected setOwnerOnly(ownerOnly: boolean): this {
		this.ownerOnly = ownerOnly;
		return this;
	}

	protected setUsage(usage: string): this {
		this.usage = usage;
		return this;
	}

	protected setSubcommands(subcommands: SubCommand[]): this {
		this.subcommands = subcommands;

		for (const subcommand of subcommands) {
			this.addSubcommand(subcommand);
		}

		return this;
	}

	private setArguments(args?: ApplicationCommandOption[]): void {
		if (!args) return;

		attachArguments(this, args);
	}
}

export interface CommandPermissions {
	allowDMs: boolean;
	nsfw?: boolean;
	user?: string | number | bigint;
}

export interface CommandOptions {
	args?: ApplicationCommandOption[];
	category: string;
	description: string;
	descriptionLocalisations?: Localisations;
	examples: string[];
	nameLocalisations?: Localisations;
	ownerOnly?: boolean;
	permissions?: CommandPermissions;
	subcommands?: SubCommand[];
}
