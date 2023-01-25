import { format } from 'd3-format';

// d3-format string specifier docs: https://github.com/d3/d3-format#locale_format
// .2 is precision
// ~ is to trim insignificant trailing zeros
// e is exponent notation
// s is decimal notation with an SI prefix
const exponentNotationFormatter = format('.2~e');
const siPrefixFormatter = format('.3~s');
const basicFormatter = format('.3');

// Formats numbers into a standardized display string in preparation for rendering
// Examples of desired behavior
// - 0.3694 → 0.369
// - 0.000036542 → 3.65x10^-5
// - 3,000,000 → 3M
// - 3,154,156 → 3.15M
// - 423,123,432 → 423M
export const formatNumber = (num: number) => {
    if (num > 999) {
        return siPrefixFormatter(num);
    }

    if (num < 0.0001 && num > 0) {
        return exponentNotationFormatter(num);
    }

    return basicFormatter(num);
};
