import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { BkpThemeProvider } from '../../styles/theme';
import { BkpServerProvider } from '../../services/apollo';
import { ReduxProvider } from '../../services/redux';
import { CodeChallenge } from '../code-challenge';

export const Main = (): React.ReactElement => (
    <BrowserRouter>
        <BkpThemeProvider>
            <ReduxProvider>
                <BkpServerProvider>
                    <Routes>
                        <Route
                            path="/"
                            element={<CodeChallenge />}
                        />
                    </Routes>
                </BkpServerProvider>
            </ReduxProvider>
        </BkpThemeProvider>
    </BrowserRouter>
);
