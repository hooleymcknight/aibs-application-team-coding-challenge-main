import React from 'react';
import Button, { ButtonTypeMap } from '@material-ui/core/Button';
import ChevronDown from 'mdi-material-ui/ChevronDown';
import ChevronUp from 'mdi-material-ui/ChevronUp';

import FilterIcon from '../../../../assets/images/Filter-Icon.png';
import { useStyles } from '../use-styles';
import { mdMid } from '../../../../styles/constants';
import { FilterChips, FilterChipsProps } from './filter-chips';
import { DisplayPropertyTooltip } from '../../../ui';

export interface FilterButtonProps extends FilterChipsProps {
    onButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    chevron?: boolean;
    filterIsOpen?: boolean;
    variant?: ButtonTypeMap['props']['variant'];
}

export const FilterButton = ({
    onButtonClick,
    chevron,
    filterIsOpen,
    displayNameMap,
    filterState,
    clearCategoryFilterState,
    variant,
}: FilterButtonProps) => {
    const classes = useStyles();

    const accordionIcon = filterIsOpen ? (
        <div className={classes.accordionIcon}>
            <DisplayPropertyTooltip title="Close Filter">
                <ChevronUp htmlColor={mdMid} />
            </DisplayPropertyTooltip>
        </div>
    ) : (
        <div className={classes.accordionIcon}>
            <DisplayPropertyTooltip title="Open Filter">
                <ChevronDown htmlColor={mdMid} />
            </DisplayPropertyTooltip>
        </div>
    );

    return (
        <Button
            className={classes.filterButton}
            variant={variant}
            color="default"
            disableRipple
            disableFocusRipple
            onClick={onButtonClick}
            startIcon={
                <img
                    src={FilterIcon}
                    alt="Specimen filter icon"
                />
            }
        >
            <FilterChips
                displayNameMap={displayNameMap}
                filterState={filterState}
                clearCategoryFilterState={clearCategoryFilterState}
            />
            {chevron && accordionIcon}
        </Button>
    );
};
