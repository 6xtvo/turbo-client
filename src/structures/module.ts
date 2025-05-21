import { ImplementError } from "./errors";

export class Module {
    public name: string;
    public description: string;
    public category: string;

    public async exec(..._args: any[]): Promise<any> {
        throw new ImplementError(`${this.constructor.name} module exec method has not been implemented`)
    }
}