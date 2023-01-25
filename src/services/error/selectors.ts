import { RootState } from '../redux';

export const selectFatalErrorMessage = (state: RootState) => state.errors.fatalError?.error.message;
export const selectNonFatalErrors = (state: RootState) => state.errors.nonFatalErrors;
