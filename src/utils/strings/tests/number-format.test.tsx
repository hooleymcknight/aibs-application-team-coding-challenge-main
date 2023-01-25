import { formatNumber } from '../number-format';

describe('number format util', () => {
    test('it returns correct rounding and sig figs for small numbers', () => {
        const result = formatNumber(0.3694);
        const zero = formatNumber(0.0);

        expect(result).toBe('0.369');
        expect(zero).toBe('0');
    });

    test('it returns correct rounding and sig figs for exponentially small numbers', () => {
        const result = formatNumber(0.0000365424);

        expect(result).toBe('3.65e-5');
    });

    test('it returns correct rounding and sig figs for big numbers', () => {
        const threeMil = formatNumber(3_000_000);
        const threeMilAndChange = formatNumber(3_154_156);
        const fourHundredMil = formatNumber(423_123_432);

        expect(threeMil).toBe('3M');
        expect(threeMilAndChange).toBe('3.15M');
        expect(fourHundredMil).toBe('423M');
    });
});
