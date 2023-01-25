import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { UseQueryNonFatalError } from '../../types';
import { CodeChallengeLayout } from './code-challenge-layout';
import { errorSlice } from '../../services/error';
import { FETCH_ERROR_MESSAGE } from '../../constants';
import { FullPageSpinner, Typography } from '../../components/ui';
import { ErrorPage } from '../error';
import { NotFound } from '../not-found';
import { PageRoute } from '../types';
import { useColumnValidationSet, useDefaultsQuery, useSearchFields } from '../../services/view-properties';
import { ApplicationHeader } from '../../components/complex/application-header';

export const CodeChallenge: PageRoute = () => {
    const dispatch = useDispatch();
    // Reference ID for a project in the Brain Knowledge Platform that is used to populate filter data
    const referenceId = 'JGN327NUXRZSHEV88TN';

    const {
        loading: defaultDisplayLoading,
        error: defaultDisplayError,
        data: defaultDisplayData,
    } = useDefaultsQuery(referenceId);

    const {
        loading: columnValidationSetLoading,
        error: columnValidationSetError,
        data: columnValidationSetData,
    } = useColumnValidationSet(referenceId);

    const { loading: allFieldsLoading, error: allFieldsError, data: allFieldsData } = useSearchFields(referenceId);

    const isLoading = defaultDisplayLoading || columnValidationSetLoading || allFieldsLoading;

    const error = defaultDisplayError || columnValidationSetError || allFieldsError;

    useEffect(() => {
        if (error instanceof UseQueryNonFatalError) {
            dispatch(errorSlice.actions.nonFatalError(FETCH_ERROR_MESSAGE, error));
        }
    }, [error, dispatch]);

    if (isLoading) return <FullPageSpinner />;
    if (error) return <ErrorPage error={error} />;
    if (!allFieldsData) return <NotFound path="/404" />;

    const { properties, defaultFilter } = defaultDisplayData;

    return (
        <>
            <ApplicationHeader title="Allen Institute for Brain Science">
                <Typography style={{ color: 'white' }}>Application Team Coding Challenge</Typography>
            </ApplicationHeader>
            <CodeChallengeLayout
                referenceId={referenceId}
                columns={properties}
                columnValidationSet={columnValidationSetData}
                allFieldsData={allFieldsData}
                defaultFilter={defaultFilter}
            />
        </>
    );
};
