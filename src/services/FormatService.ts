import type { ArgumentName } from "@app/types";
import type { TimeFormat, TimeValue } from "@app/types/format";
import type { PermissionsString } from "discord.js";

export const FormatService = {
	/**
	 * Creates a slash command mention.
	 * @param {string} name The name of the command
	 * @param {string} id The id of the command
	 * @returns The formatted command mention string
	 */
	commandMention(name: string, id: string): `</${string}:${string}>` {
		return `</${name}:${id}>`;
	},

	/**
	 * Formats a given value in milliseconds into a readable date string.
	 * @param {number} ms Milliseconds value
	 * @param {TimeValue} include Time values to include
	 * @param {TimeFormat} format Time format to use
	 * @returns The formatted time string
	 */
	msToTime(ms: number, include: TimeValue[], format: TimeFormat): string {
		const seconds: number = Math.floor((ms / 1000) % 60);
		const minutes: number = Math.floor((ms / (1000 * 60)) % 60);
		const hours: number = Math.floor((ms / (1000 * 60 * 60)) % 24);
		const days: number = Math.floor((ms / (1000 * 60 * 60 * 24)) % 7);

		const timeStrings = {
			seconds: seconds > 0 ? `${seconds}` : "0",
			minutes: minutes > 0 ? `${minutes}` : "0",
			hours: hours > 0 ? `${hours}` : "0",
			days: days > 0 ? `${days}` : "0"
		};

		const timeString: string[] = [];

		switch (format) {
			case "abbrev":
				for (const value of include) {
					timeStrings[value] &&
						timeString.push(`${timeStrings[value]}${value[0]}`);
				}

				return timeString.join(", ");
			case "full":
				for (const value of include) {
					timeStrings[value] &&
						timeString.push(`${timeStrings[value]} ${value}`);
				}

				return timeString.join(", ");
			case "shorthand":
				for (const value of include) {
					if (hours === 0 && value !== "hours")
						timeStrings[value] &&
							timeString.push(
								value === "days"
									? timeStrings[value]
									: timeStrings[value].padStart(2, "0")
							);
				}

				return timeString.join(":");
			default:
				return "";
		}
	},

	/**
	 * Formats the content into a readable permission string
	 * @param {PermissionsString} permission The permission to format
	 * @returns The formatted permission string
	 */
	permission(permission: PermissionsString): string {
		return permission
			.replace(/[A-Z]/g, " $&")
			.trim()
			.replace("V A D", "VAD");
	},

	/**
	 * Returns the string argument type of the given integer.
	 * @param {number} type The string argument
	 * @returns {ArgumentName} The argument type as a string.
	 */
	argumentType(type: number): ArgumentName {
		switch (type) {
			case 1:
				return "Subcommand";
			case 2:
				return "SubcommandGroup";
			case 3:
				return "String";
			case 4:
				return "Integer";
			case 5:
				return "Boolean";
			case 6:
				return "User";
			case 7:
				return "Channel";
			case 8:
				return "Role";
			case 9:
				return "Mentionable";
			case 10:
				return "Number";
			default:
				return "Unknown";
		}
	}
};
