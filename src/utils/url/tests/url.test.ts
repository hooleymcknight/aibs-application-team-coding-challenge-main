import { isInternalUrl, parseLimitFromSearch, parseOffsetFromSearch, setTargetForUrl } from '../url';

const HOST = 'dev-knowledge.brain-map.org';

// Internal URL examples
const absoluteUrl =
    'https://dev-knowledge.brain-map.org/data?limit=10&offset=0&sortDirection=ASC&sortProperty=program.title';
const slashUrl = '/data';
const noSlashWithQueries = 'data?=10&offset=0';
const differentSubdomain = 'https://something-or-rather.brain-map.org';

// External URL examples
const externalUrl = 'http://google.com';
const externalHttpsUrl = 'https://duckduckgo.com';
const externalFtpUrl = 'ftp://brainfiles.com/brainthings';

describe('isInternalUrl', () => {
    describe('internal URLs', () => {
        test('it returns true for absolute URL', () => {
            expect(isInternalUrl(HOST, absoluteUrl)).toBeTruthy();
        });

        test('it returns true for relative URL starting with slash', () => {
            expect(isInternalUrl(HOST, slashUrl)).toBeTruthy();
        });

        test('it returns true for relative URL without slash and queries', () => {
            expect(isInternalUrl(HOST, noSlashWithQueries)).toBeTruthy();
        });

        test('it returns true for different subdomain', () => {
            expect(isInternalUrl(HOST, differentSubdomain)).toBeTruthy();
        });
    });

    describe('external URLs', () => {
        test('it returns false for external HTTP url', () => {
            expect(isInternalUrl(HOST, externalUrl)).toBeFalsy();
        });

        test('it returns false for external HTTPS url', () => {
            expect(isInternalUrl(HOST, externalHttpsUrl)).toBeFalsy();
        });

        test('it returns false for external FTP url', () => {
            expect(isInternalUrl(HOST, externalFtpUrl)).toBeFalsy();
        });
    });
});

describe('setTargetForUrl', () => {
    describe('internal URLs', () => {
        test('it returns _self for absolute URL', () => {
            expect(setTargetForUrl(HOST, absoluteUrl)).toBe('_self');
        });

        test('it returns _self for relative URL starting with slash', () => {
            expect(setTargetForUrl(HOST, slashUrl)).toBe('_self');
        });

        test('it returns _self for relative URL without slash and queries', () => {
            expect(setTargetForUrl(HOST, noSlashWithQueries)).toBe('_self');
        });
    });

    describe('external URLs', () => {
        test('it returns false for external HTTP url', () => {
            expect(setTargetForUrl(HOST, externalUrl)).toBe('_blank');
        });

        test('it returns false for external HTTPS url', () => {
            expect(setTargetForUrl(HOST, externalHttpsUrl)).toBe('_blank');
        });
    });
});

describe('parseLimitFromSearch', () => {
    test('it returns correct number from search string', () => {
        const search = 'limit=100&offset=1000&other=thing';
        expect(parseLimitFromSearch(search, 10)).toBe(100);
    });

    test('it returns default value when limit is not a number', () => {
        const search = 'limit=GARBAGE&offset=1000&other=thing';
        expect(parseLimitFromSearch(search, 10)).toBe(10);
    });
});

describe('parseOffsetFromSearch', () => {
    test('it returns correct number from search string', () => {
        const search = 'limit=100&offset=1000&other=thing';
        expect(parseOffsetFromSearch(search, 10)).toBe(1000);
    });

    test('it returns default value when limit is not a number', () => {
        const search = 'limit=100&offset=GARBAGE&other=thing';
        expect(parseOffsetFromSearch(search, 10)).toBe(10);
    });
});
