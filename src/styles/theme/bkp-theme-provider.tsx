import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { bkpTheme } from './bkp-theme';

export const BkpThemeProvider: React.FunctionComponent<{}> = ({ children }) => (
    <ThemeProvider theme={bkpTheme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
);
