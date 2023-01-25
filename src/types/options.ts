import { TooltipProps } from '@material-ui/core/Tooltip';
import { FilterType } from './filter-argument';

import { PropertyDisplayName } from './property-display-names';

export interface OptionBase {
    label: string;
}

export type OptionTooltipTitleAccessor = (option: OptionBase) => TooltipProps['title'];

export type OptionGroupMap = Record<string, PropertyDisplayName>;

export interface FeatureOption extends OptionBase {
    label: string;
    field: string;
    groupKey: string;
    description?: string;
    type: FilterType;
    unit?: string;
}
