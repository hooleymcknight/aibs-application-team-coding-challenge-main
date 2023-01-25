import React, { FC } from 'react';
import { MockedProvider, MockedProviderProps } from '@apollo/client/testing';

/**
 * Convenience wrapper for imperatively testing useQuery.
 * Many examples assume using the MockedProvider directly in jsx,
 * but this provides a way to test a useQuery hook directly
 * when used in conjunction with testing-library-react-hooks.renderHook.
 */
export const getMockQueryProvider =
    (props: MockedProviderProps): FC =>
    ({ children }) =>
        (
            <MockedProvider
                addTypename
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
            >
                {children}
            </MockedProvider>
        );
