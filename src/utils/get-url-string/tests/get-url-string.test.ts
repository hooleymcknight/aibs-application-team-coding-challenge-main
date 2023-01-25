import { getURLString } from '../get-url-string';

describe('getURLString', () => {
    describe('Basic properties', () => {
        test('it returns a string with a query', () => {
            const config = {
                origin: 'origin',
                pathname: 'pathname',
                search: 'search',
            };
            expect(getURLString(config)).toBe('originpathname?search');
        });

        test('it returns a string without a query', () => {
            const config = {
                origin: 'origin',
                pathname: 'pathname',
                search: '',
            };
            expect(getURLString(config)).toBe('originpathname');
        });

        test('it returns a string for a common example with query string', () => {
            const config = {
                origin: 'http://localhost:8080',
                pathname: '/data-collection-projects',
                search: 'grant.name=U19%20Zeng&modality.name=transcriptomics,cell%20morphology',
            };
            expect(getURLString(config)).toBe(
                'http://localhost:8080/data-collection-projects?grant.name=U19%20Zeng&modality.name=transcriptomics,cell%20morphology'
            );
        });

        test('it returns a string for a common example without querystring', () => {
            const config = {
                origin: 'http://localhost:8080',
                pathname: '/data-collection-projects',
                search: '',
            };
            expect(getURLString(config)).toBe('http://localhost:8080/data-collection-projects');
        });
    });

    describe('Other cases', () => {
        test('it returns an empty string for empty string config values', () => {
            const config = {
                origin: '',
                pathname: '',
                search: '',
            };
            expect(getURLString(config)).toBe('');
        });

        test('it returns a string for empty fields', () => {
            expect(
                getURLString({
                    origin: 'origin',
                    pathname: '',
                    search: '',
                })
            ).toBe('origin');

            expect(
                getURLString({
                    origin: '',
                    pathname: 'pathname',
                    search: '',
                })
            ).toBe('pathname');

            expect(
                getURLString({
                    origin: '',
                    pathname: '',
                    search: 'search',
                })
            ).toBe('?search');

            expect(
                getURLString({
                    origin: '',
                    pathname: 'pathname',
                    search: 'search',
                })
            ).toBe('pathname?search');
        });
    });
});
