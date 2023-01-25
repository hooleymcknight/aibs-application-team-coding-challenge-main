/* eslint-disable import/no-import-module-exports */
import { configureStore } from '@reduxjs/toolkit';
import { IS_PRODUCTION } from '../../constants';
import { middleware } from './redux-middleware';
import { rootReducer } from './root-reducer';

export const reduxStore = configureStore({
    reducer: rootReducer,
    middleware,
});

if (!IS_PRODUCTION && module.hot) {
    module.hot.accept('./root-reducer', () => reduxStore.replaceReducer(rootReducer));
}

export type AppDispatch = typeof reduxStore.dispatch;
