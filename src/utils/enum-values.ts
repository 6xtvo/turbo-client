/**
 * Fetches enum values and returns them as an array.
 * @param e The enum object to extract values from
 * @returns An array of the enum's values.
 */
export function enumValues<T extends Record<string, string | number>>(
	e: T
): T[keyof T][] {
	return Object.values(e) as T[keyof T][];
}
