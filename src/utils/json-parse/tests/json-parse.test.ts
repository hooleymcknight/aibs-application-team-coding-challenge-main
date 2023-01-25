import { jsonParse } from '../json-parse';

describe('jsonParse', () => {
    describe('case: valid string', () => {
        test('it returns an array', () => {
            const result = jsonParse('["foo", "bar", 123]');
            expect(result).toEqual(['foo', 'bar', 123]);
        });

        test('it returns an object', () => {
            const test = {
                foo: 123,
                bar: 'baz',
            };
            const result = jsonParse(JSON.stringify(test));
            expect(result).toEqual(test);
        });
    });

    describe('case: invalid argument', () => {
        test('it returns null', () => {
            const result = jsonParse(undefined);
            expect(result).toEqual(null);
        });

        test('it returns null', () => {
            const result = jsonParse('[foo}');
            expect(result).toEqual(null);
        });
    });
});
