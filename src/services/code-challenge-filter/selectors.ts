import { createSelector } from 'reselect';

import {
    FILTER_ARGUMENT_QUERY_DELIMITER,
    FILTER_FIELD_QUERY_DELIMITER,
    PROJECT_REFERENCE_IDS,
    QUERYSTRING_COMMA_REPLACER,
} from '../../constants';
import { selectKey } from '../key/selectors';
import { RootState } from '../redux';

const selectFilterState = (state: RootState) => state.filter;
export const selectFilter = createSelector([selectFilterState, selectKey], (filterState, key) => filterState[key]);

export const projectFilter = createSelector([selectFilter], (selectedFilter) =>
    selectedFilter.filter(({ field }) => field === PROJECT_REFERENCE_IDS)
);

export const selectFilterQueryOption = createSelector([selectFilter], (filter) =>
    filter?.reduce<{ [key: string]: string[] }>((acc, filterArgument) => {
        const filterField = `filter${FILTER_FIELD_QUERY_DELIMITER}${filterArgument.field}`;
        if (!acc[filterField]) {
            acc[filterField] = [];
        }

        const filterArgumentValue = filterArgument.value.replace(',', QUERYSTRING_COMMA_REPLACER);

        acc[filterField].push(`${filterArgument.operator}${FILTER_ARGUMENT_QUERY_DELIMITER}${filterArgumentValue}`);

        return acc;
    }, {})
);
