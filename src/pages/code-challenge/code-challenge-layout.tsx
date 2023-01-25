import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { filterColumnSyncSlice, selectTableSyncState } from '../../services/filter-column-sync';
import { filterViewSlice } from '../../services/filter-view/filter-view-slice';
import { filterSlice } from '../../services/code-challenge-filter/filter-slice';
import { keySlice, selectKey } from '../../services/key';
import { facetPropertiesSlice } from '../../services/view-properties';
import { filterPropertyReferenceIdsSlice } from '../../services/view-properties/property-names-slices';
import { FilterArgument, TableFacetProperty } from '../../types';
import { CodeChallengeFilterLayout } from './code-challenge-filter-layout';

interface CodeChallengeLayoutProps {
    referenceId: string;
    defaultFilter: FilterArgument[];
    columns: string[];
    columnValidationSet: Set<string>;
    allFieldsData: TableFacetProperty[];
}

export const CodeChallengeLayout = ({
    referenceId,
    defaultFilter,
    columns,
    columnValidationSet,
    allFieldsData,
}: CodeChallengeLayoutProps) => {
    const dispatch = useDispatch();
    const { search } = useLocation();

    const decodedSearch = decodeURIComponent(search);
    // TODO: In the future, we should re-think how state management
    // TODO: is assessed for when we can render the pages.
    // We evaluate if state is ready to render once state is set.
    // We make such a judgement by simply seeing if the
    // current specimen key matches the current url referenceId.
    const key = useSelector(selectKey);
    const canRender = key === referenceId;
    const tableSyncState = useSelector(selectTableSyncState);

    useEffect(() => {
        dispatch(keySlice.actions.setKey(referenceId));
        dispatch(filterSlice.actions.initializeFilter(referenceId, decodedSearch, defaultFilter));
        dispatch(
            filterPropertyReferenceIdsSlice.actions.initPropertyReferenceIds(
                referenceId,
                decodedSearch,
                columnValidationSet,
                columns
            )
        );
        dispatch(facetPropertiesSlice.actions.setFacetProperties(referenceId, allFieldsData));
        dispatch(filterViewSlice.actions.initializeFilterView(referenceId, false));
        // tableSyncState defaults to true on initial load
        // if tableSyncState[key] exists and is false we do not
        // want to dispatch action to set it to true to maintain state
        if (tableSyncState === undefined) {
            dispatch(filterColumnSyncSlice.actions.setFilterColumnSync(key, true));
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (canRender) {
        return <CodeChallengeFilterLayout />;
    }

    return null;
};
