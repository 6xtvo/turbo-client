import { ModuleError } from "@app/structures/Error";
import { attachArguments } from "@app/utils/attach-arguments";
import {
	type ApplicationCommandOption,
	SlashCommandSubcommandBuilder
} from "discord.js";

export class SubCommand extends SlashCommandSubcommandBuilder {
	public args?: ApplicationCommandOption[];

	public constructor(name: string, options: SubCommandOptions) {
		super();

		this.setName(name);
		this.setDescription(options.description);
		this.setArgs(options.args);

		attachArguments(this, options.args);
	}

	public async exec(..._args: unknown[]): Promise<unknown> {
		throw new ModuleError(
			`Subcommand class ${this.constructor.name} "exec" method has not been implemented`
		);
	}

	public setArgs(args?: ApplicationCommandOption[]): this {
		this.args = args;
		return this;
	}
}

export interface SubCommandOptions {
	description: string;
	args?: ApplicationCommandOption[];
}
