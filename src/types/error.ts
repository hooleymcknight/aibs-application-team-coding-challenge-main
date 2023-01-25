// eslint-disable-next-line max-classes-per-file
import type { ApolloError } from '@apollo/client';

/**
 * Represents custom errors we can recover from. Eg use-case,
 * Fetch call fails, but navigation to other parts of site
 * are still possible.
 */
export class NonFatalError extends Error {}

/**
 * Represents custom errors we can associate with useQuery apart from
 * the ones Apollo sends. This means, if something is unexpected in the payload,
 * we can return this class of error.
 */
export class UseQueryNonFatalError extends NonFatalError {}

/**
 * Specific non fatal error where properties are not found.
 */
export class PropertiesNotFoundError extends UseQueryNonFatalError {
    static readonly message: string = 'No options found in `specimenProperties` query payload. Cannot render page.';

    readonly message: string = PropertiesNotFoundError.message;

    readonly name: string;
}

export type BkpServiceError = UseQueryNonFatalError | ApolloError;
