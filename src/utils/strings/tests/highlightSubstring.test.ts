import { getSurroundingTextMatches } from '../highlightSubstring';

describe('highlightSubstring', () => {
    describe('getSurroundingTextMatches', () => {
        test('Finds match in middle of sentence', () => {
            const config = {
                mainString: 'If only my buddy Mikey was around',
                subString: 'only',
                wordsBefore: 0,
                wordsAfter: 2,
            };
            const result = getSurroundingTextMatches(config);
            const [, before, match, after] = result;
            expect(before).toBe('');
            expect(match).toBe('only');
            expect(after).toBe(' my buddy');
            expect(result.index).toBe(3);
        });

        test('Finds match in middle of sentence with a space', () => {
            const config = {
                mainString: 'If only my buddy Mikey was around',
                subString: 'my ',
            };
            const result = getSurroundingTextMatches(config);
            const [, before, match, after] = result;
            expect(before).toBe('If only ');
            expect(match).toBe('my ');
            expect(after).toBe('buddy Mikey');
            expect(result.index).toBe(0);
        });

        test('Finds match at start of sentence', () => {
            const config = {
                mainString: 'If only my buddy Mikey was around',
                subString: 'If',
            };
            const result = getSurroundingTextMatches(config);
            const [, before, match, after] = result;
            expect(before).toBe('');
            expect(match).toBe('If');
            expect(after).toBe(' only my');
            expect(result.index).toBe(0);
        });

        test('Finds match at end of sentence', () => {
            const config = {
                mainString: 'If only my buddy Mikey was around',
                subString: ' around',
            };
            const result = getSurroundingTextMatches(config);
            const [, before, match, after] = result;
            expect(before).toBe('Mikey was');
            expect(match).toBe(' around');
            expect(after).toBe('');
            expect(result.index).toBe(17);
        });
    });
});
