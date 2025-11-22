import { ModuleError } from "@/structures/Error";
import { attachArguments } from "@/utils/attach-arguments";
import {
	type ApplicationCommandOption,
	SlashCommandSubcommandBuilder
} from "discord.js";

export class SubCommand extends SlashCommandSubcommandBuilder {
	public args?: ApplicationCommandOption[];

	public constructor(name: string, options: SubCommandOptions) {
		super();

		this
            .setName(name)
            .setDescription(options.description)
            .setArguments(options.args);
	}

	public async exec(..._args: unknown[]): Promise<unknown> {
		throw new ModuleError(
			`Subcommand class ${this.constructor.name} "exec" method has not been implemented`
		);
	}

    private setArguments(args?: ApplicationCommandOption[]): void {
        if (!args) return;

        attachArguments(this, args);
    }
}

export interface SubCommandOptions {
	description: string;
	args?: ApplicationCommandOption[];
}
