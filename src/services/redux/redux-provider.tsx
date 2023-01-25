import React from 'react';
import { Provider } from 'react-redux';
import { reduxStore } from './redux-store';

export const ReduxProvider: React.FunctionComponent = ({ children }) => (
    <Provider store={reduxStore}>{children}</Provider>
);
