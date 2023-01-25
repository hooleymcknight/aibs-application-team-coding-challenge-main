import { Middleware } from '@reduxjs/toolkit';
import { IS_PRODUCTION } from '../../constants';
import { errorSlice } from './error-slice';

export const errorMiddleware: Middleware = () => (next) => (action) => {
    next(action);

    if (!IS_PRODUCTION && errorSlice.actions.nonFatalError.match(action)) {
        // eslint-disable-next-line no-console
        console.error(action);
    }
};
