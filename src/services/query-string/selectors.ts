import { createSelector } from 'reselect';
import queryString from 'query-string';
import { selectFilterPropertyReferenceIdsQueryOption } from '../view-properties/selectors';
import { selectFilterQueryOption } from '../code-challenge-filter/selectors';

export const selectQueryString = createSelector(
    [selectFilterQueryOption, selectFilterPropertyReferenceIdsQueryOption],
    (filterQueryOption, filterPropertyReferenceIdsQueryOption) =>
        queryString.stringify(
            {
                ...filterQueryOption,
                ...filterPropertyReferenceIdsQueryOption,
            },
            { arrayFormat: 'comma' }
        )
);
