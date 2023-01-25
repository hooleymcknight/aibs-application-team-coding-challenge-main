import React from 'react';
import castArray from 'lodash/castArray';

import { white, regular, bold, lt1 } from '../../../styles/constants';
import { Typography } from '../typography';

const TOOLTIP_FONT_SIZE = '0.625rem';

const TITLE_STYLE = {
    fontWeight: bold,
    color: white,
    fontSize: TOOLTIP_FONT_SIZE,
};

const DESCRIPTION_STYLE = {
    paddingTop: 4,
    color: white,
    fontSize: TOOLTIP_FONT_SIZE,
    fontWeight: regular,
};

const UNIT_STYLE = {
    color: lt1,
    paddingLeft: 4,
    fontSize: TOOLTIP_FONT_SIZE,
    fontWeight: regular,
};

const VALUE_STYLE = {
    color: lt1,
    fontSize: TOOLTIP_FONT_SIZE,
    fontWeight: regular,
    lineHeight: TOOLTIP_FONT_SIZE,
};

export interface FeatureTooltipContentProps {
    title: string;
    description?: string;
    filterDescription?: string;
    unit?: string;
    value?: string | number | Array<string | number>;
}

export const FeatureTooltipContent = ({
    title,
    description,
    filterDescription,
    unit,
    value,
}: FeatureTooltipContentProps) => (
    <>
        {title && (
            <Typography
                component="div"
                variant="legal"
                style={TITLE_STYLE}
            >
                {title}
                {unit && (
                    <Typography
                        style={UNIT_STYLE}
                        component="span"
                    >
                        {unit}
                    </Typography>
                )}
            </Typography>
        )}
        {value && (
            <div>
                {castArray(value).map((valItem) => (
                    <Typography
                        key={valItem}
                        component="div"
                        variant="legal"
                        style={VALUE_STYLE}
                    >
                        {valItem}
                    </Typography>
                ))}
            </div>
        )}
        {filterDescription && (
            <Typography
                component="div"
                variant="legal"
                style={DESCRIPTION_STYLE}
            >
                {filterDescription}
            </Typography>
        )}
        {description && (
            <Typography
                component="div"
                variant="legal"
                style={DESCRIPTION_STYLE}
            >
                {description}
            </Typography>
        )}
    </>
);
