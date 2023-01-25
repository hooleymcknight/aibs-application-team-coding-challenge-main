import { DragHandleCallback } from '../../../hooks';
import { FilterCounts, TotalCounts } from '../../../services/filter';
import {
    FilterState,
    FilterItemStateUpdate,
    CategoryDisplayNameMap,
    SliderItemState,
    FilterType,
    OptionTooltipTitleAccessor,
} from '../../../types';
import { ListDropdownOption, ListDropdownOptionsMap } from '../list-dropdown';

export type HandleItemClick = (categoryName: string, itemName: string, type: FilterType) => () => void;

export type HandleSiderDrag = (categoryName: string, slider: SliderItemState, type: FilterType) => void;

export type HandleColumnDrag = (referenceId: string) => DragHandleCallback;

export interface FilterMenuProps {
    displayNameMap: CategoryDisplayNameMap;
    filterState: FilterState;
    filterCounts: FilterCounts;
    totalCounts: TotalCounts;
    filterHeight: number;
    isSearchAvailable: boolean;
    isFilterOpen?: boolean;
    setFilterViewState?: (isOpen: boolean) => void;
    setFilterHeightState?: (height: number) => void;
    setFilterItemState: (filterItemUpdate: FilterItemStateUpdate) => void;
    onPageReset?: () => void;
    clearCategoryFilterState: (categoryName: string) => void;
    optionsMap?: ListDropdownOptionsMap<ListDropdownOption>;
    setSelectedOptions?: (selectedOptions: ListDropdownOption[]) => void;
    getItemTooltipTitle?: OptionTooltipTitleAccessor;
    tableSyncState?: boolean;
    toggleTableSyncState?: () => void;
}
