import React from 'react';
import { FEATURE_TOOLTIP_DELAY } from '../../../../constants';
import { DisplayPropertyTooltip, FeatureTooltipContent } from '../../../ui/display-property-tooltip';
import { useStyles } from '../use-styles';

export interface FilterColumnHeaderLabelProps {
    title: string;
    description: string;
    unit: string;
    actionButtons?: React.ReactElement;
}

export const FilterColumnHeaderLabel = ({ title, description, unit }: FilterColumnHeaderLabelProps) => {
    const classes = useStyles();

    return (
        <DisplayPropertyTooltip
            title={
                <FeatureTooltipContent
                    title={title}
                    description={description}
                    unit={unit}
                />
            }
            placement="bottom-start"
            enterDelay={FEATURE_TOOLTIP_DELAY}
        >
            <span className={classes.filterSearchDisabledHeaderText}>
                <span>{title}</span>
                {unit && <span className={classes.filterColumnHeaderUnit}>{unit}</span>}
            </span>
        </DisplayPropertyTooltip>
    );
};
