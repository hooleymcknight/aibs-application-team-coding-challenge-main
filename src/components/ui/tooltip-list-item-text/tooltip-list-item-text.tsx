import React, { FC } from 'react';

import { DisplayPropertyTooltip } from '../display-property-tooltip';
import { FEATURE_TOOLTIP_DELAY } from '../../../constants';
import { OptionBase, OptionTooltipTitleAccessor } from '../../../types';

export interface ItemTextProps {
    className: string;
}

export type TooltipListItemText = (
    option: OptionBase,
    getItemTooltipTitle?: OptionTooltipTitleAccessor
) => FC<ItemTextProps>;

export const tooltipListItemText: TooltipListItemText =
    (option, getItemTooltipTitle = () => false) =>
    ({ className, children }) =>
        (
            <DisplayPropertyTooltip
                title={getItemTooltipTitle(option)}
                enterDelay={FEATURE_TOOLTIP_DELAY}
            >
                <span className={className}>{children}</span>
            </DisplayPropertyTooltip>
        );
