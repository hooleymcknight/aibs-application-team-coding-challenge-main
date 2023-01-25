import { validFloatInput } from '../valid-float-input';

describe('Valid Float Input', () => {
    test('handles progress of valid input', () => {
        const digits = ['-', '1', '2', '3', '.', '4', '5'];
        let testInput = '';
        digits.forEach((digit) => {
            testInput += digit;
            expect(validFloatInput(testInput)).toEqual(testInput);
        });
    });

    test('handles a variety of numbers', () => {
        // eslint-disable-next-line max-len
        const tests = [
            '-90210',
            '-867.5309',
            '-123',
            '-0.123',
            '-.034',
            '-0',
            '0',
            '.034',
            '0.123',
            '123',
            '867.5309',
            '90210',
        ];
        tests.forEach((input) => {
            expect(validFloatInput(input)).toEqual(input);
        });
    });

    test('does not trim leading zeros', () => {
        const testInput = '0002000';
        expect(validFloatInput(testInput)).toEqual(testInput);
    });

    test('prevents adding initial invalid characters', () => {
        const invalid = ['f', 'o', 'o', 'b', '{'];
        let testInput = '';
        invalid.forEach((ch) => {
            testInput += ch;
            expect(validFloatInput(testInput)).toEqual('');
        });
    });

    test('prevents adding invalid characters after valid characters', () => {
        const invalid = ['f', 'o', 'o', 'b', '{', '.', '-', ','];
        let testInput = '123.45';
        invalid.forEach((ch) => {
            testInput += ch;
            expect(validFloatInput(testInput)).toEqual('123.45');
        });
    });

    test('handles leading decimal point', () => {
        const tests = ['.', '-.', '-0.', '.45', '-.45', '-0.45', '-0.45'];
        tests.forEach((input) => {
            expect(validFloatInput(input)).toEqual(input);
        });
    });
});
