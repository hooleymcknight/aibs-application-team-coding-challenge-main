/**
 * This is a safe way to JSON parse a string.
 * JSON.parse Throws a SyntaxError exception if the string to parse is not valid JSON.
 * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#exceptions
 * Using a "try catch" to catch the error prevents crashing.
 * @param value any string
 * @returns either JSON parsed value or null
 */
export const jsonParse = <T>(value?: string): T | null => {
    try {
        return value ? (JSON.parse(value) as T) : null;
    } catch {
        return null;
    }
};
