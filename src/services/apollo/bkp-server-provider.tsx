import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { bkpServerClient } from './bkp-server-client';

export const BkpServerProvider: React.FunctionComponent = ({ children }) => {
    const dispatch = useDispatch();

    return <ApolloProvider client={bkpServerClient(dispatch)}>{children}</ApolloProvider>;
};
