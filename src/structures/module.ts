import { ModuleError } from "./Error";

export class Module {
    public name: string;
    public description: string;
    public category: string;

    public constructor(name: string, options: ModuleOptions) {
        this.name = name;
        this.description = options.description || "No description provided";
        this.category = options.category;
    }

    public async exec(..._args: unknown[]): Promise<unknown> {
        throw new ModuleError(
            `${this.constructor.name} module exec method has not been implemented`
        );
    }

    static [Symbol.hasInstance](instance: unknown) {
        return (
            instance &&
            typeof instance === "object" &&
            "name" in instance &&
            "description" in instance &&
            "category" in instance &&
            "exec" in instance
        );
    }
}

export interface ModuleOptions {
    description?: string;
    category: string;
}
