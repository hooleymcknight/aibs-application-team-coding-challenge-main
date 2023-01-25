import castArray from 'lodash/castArray';
import queryString from 'query-string';
import { DATA_URI_BASE } from '../../constants';

export function isInternalUrl(host: string, url: string): boolean {
    const domains = host.split('.');
    // .com/org/gov is in the last spot
    const rootDomain = domains[domains.length - 2];
    // We know it's internal if it contains the site's host or is a relative path
    return url?.includes(rootDomain) || !(url?.startsWith('http') || url?.startsWith('ftp'));
}

export function setTargetForUrl(host: string, url: string): string {
    return isInternalUrl(host, url) ? '_self' : '_blank';
}

export const getProjectUrl = (refId: string | number, page: string, base: string = DATA_URI_BASE): string =>
    `${base}/${refId}/${page}`;

const parseNumericParameterFromSearch = (search: string, parameterName: string, defaultValue: number) => {
    // parse query string search into object: { [limitKey]: number }
    const config = queryString.parse(search);

    const [parameterString] = castArray(config[parameterName] ?? '');
    const parsedInt = parseInt(parameterString, 10);

    if (Number.isNaN(parsedInt)) {
        return defaultValue;
    }

    return Math.abs(parsedInt);
};

/**
 * Parses the pagination limit from the URL
 * @param search URL search string
 * @param defaultValue Fallback value when a valid limit cannot be parsed
 */
// eslint-disable-next-line max-len
export const parseLimitFromSearch = (search: string, defaultValue: number) =>
    parseNumericParameterFromSearch(search, 'limit', defaultValue);

/**
 * Parses the pagination offset from the URL
 * @param search URL search string
 * @param defaultValue Fallback value when a valid offset cannot be parsed
 */
// eslint-disable-next-line max-len
export const parseOffsetFromSearch = (search: string, defaultValue: number) =>
    parseNumericParameterFromSearch(search, 'offset', defaultValue);
