import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

import { ServiceError } from '../../components/complex/error';
import { selectKey } from '../../services/key';
import { useFilterQuery } from '../../services/filter/hooks/use-filter-options-query';
import { selectFilterPropertyReferenceIds } from '../../services/view-properties/selectors';
import { FilterCategoryArguments } from '../../services/filter';
import { CodeChallengeFilter } from '../../containers/code-challenge-filter/code-challenge-filter';

export const CodeChallengeFilterLayout = () => {
    const key = useSelector(selectKey);
    const { data: filterAllOptions, loading: filterLoading, error: filterError } = useFilterQuery(key);

    const filterCurrentOptions = useSelector(selectFilterPropertyReferenceIds);
    const filterOptions = useMemo(() => {
        return filterCurrentOptions?.reduce((filterOption, option: string) => {
            const optionFilter = filterAllOptions.find(
                (filter: FilterCategoryArguments) => filter.referenceId === option
            );

            if (optionFilter) {
                filterOption.push(optionFilter);
            }

            return filterOption;
        }, []);
    }, [filterAllOptions, filterCurrentOptions]);

    if (filterLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <CircularProgress />
            </Box>
        );
    }
    if (filterError) return <ServiceError />;

    return (
        <CodeChallengeFilter
            filterOptions={filterOptions}
            filterAllOptions={filterAllOptions}
        />
    );
};
