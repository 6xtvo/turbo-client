import { Collection } from "discord.js";

export class Category<T> {
	public name: string;
	public description: string;
	public collection: Collection<string, T> = new Collection<string, T>();

	public constructor(
		name: string,
		description = "No description has been provided."
	) {
		this.name = name;
		this.description = description;
	}
}
