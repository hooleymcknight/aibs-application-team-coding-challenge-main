import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { errorMiddleware } from '../error/middleware';

export const middleware = getDefaultMiddleware().concat(errorMiddleware);
