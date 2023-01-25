import get from 'lodash/get';

import { FLOAT_REGEX } from '../../constants';

/**
 * This function provides an "in progress" valid float input string.
 * This function is strictly for validating a string and returning a string.
 * This function DOES NOT provide numerical parsing.
 * This function only prevents the user from inputing non-float-like strings.
 * For example, to input 123.45, one must input
 * 1
 * 12
 * 123
 * 123.
 * 123.4
 * 123.45
 */
export const validFloatInput = (input: string): string => {
    // If the regex match fails, return empty string so the input stays empty
    const match = input.match(FLOAT_REGEX);
    const value = get(match, 0, '');

    return value;
};
