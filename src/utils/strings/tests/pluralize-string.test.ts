import { pluralizeString, pluralizeNoun } from '../pluralize-string';

describe('pluralizeString', () => {
    describe('case: non-plural', () => {
        test('it returns no default suffix', () => {
            const result = pluralizeString(1, 'duck', 's');
            expect(result).toEqual('1 duck');
        });

        test('it returns no given suffix', () => {
            const result = pluralizeString(1, 'grass', 'es');
            expect(result).toEqual('1 grass');
            const result2 = pluralizeNoun(1, 'duck');
            expect(result2).toEqual('duck');
        });
    });

    describe('case: plural', () => {
        test('it returns default suffix', () => {
            const result = pluralizeString(2, 'duck');
            expect(result).toEqual('2 ducks');
            const result2 = pluralizeNoun(100, 'duck');
            expect(result2).toEqual('ducks');
        });

        test('it returns given suffix', () => {
            const result = pluralizeString(100, 'grass', 'es');
            expect(result).toEqual('100 grasses');
        });
    });
});
