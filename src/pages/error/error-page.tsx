import React from 'react';

import { FatalErrorPage } from './fatal-error-page';
import { NonFatalErrorPage } from './non-fatal-error-page';
import { NonFatalError } from '../../types';

export const ErrorPage = ({ error }: { error: Error }) => {
    if (error instanceof NonFatalError) {
        return <NonFatalErrorPage />;
    }
    return <FatalErrorPage />;
};
