import React, { useCallback, MouseEvent, ReactElement } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

import { OptionTooltipTitleAccessor } from '../../../types';
import { ListDropdown, ListDropdownOption, ListDropdownOptionsMap } from '../list-dropdown';

export interface AddRemoveDropdownProps {
    popoverButton: ReactElement;
    title: string;
    actionIcon?: ReactElement;
    filterIcon?: ReactElement;
    optionsMap: ListDropdownOptionsMap<ListDropdownOption>;
    selectedOptions: ListDropdownOption[];
    setSelectedOptions: (selectedOptions: ListDropdownOption[]) => void;
    getItemTooltipTitle?: OptionTooltipTitleAccessor;
    onActionIconClick?: (event: MouseEvent) => void;
    onFilterIconClick?: (event: MouseEvent) => void;
    observeMenuItemClick?: (option: ListDropdownOption, isAdded: boolean) => void;
    onSyncButtonHover?: (event: MouseEvent) => void;
    onSyncButtonLeave?: (event: MouseEvent) => void;
}

export const AddRemoveDropdown = (props: AddRemoveDropdownProps) => {
    const {
        popoverButton,
        title,
        actionIcon,
        filterIcon,
        optionsMap,
        selectedOptions,
        setSelectedOptions,
        getItemTooltipTitle,
        onActionIconClick,
        onFilterIconClick,
        onSyncButtonHover,
        onSyncButtonLeave,
        observeMenuItemClick,
    } = props;

    const getCheckboxIcon = useCallback(
        (option: ListDropdownOption) => (
            <Checkbox
                checked={selectedOptions.some((so) => so.field === option.field)}
                disableRipple
                color="default"
            />
        ),
        [selectedOptions]
    );

    const handleMenuItemClick = useCallback(
        (_: React.MouseEvent, option: ListDropdownOption) => {
            if (selectedOptions.some((so) => so.field === option.field)) {
                setSelectedOptions(selectedOptions.filter(({ label }) => label !== option.label));
                if (observeMenuItemClick) {
                    observeMenuItemClick(option, false);
                }
            } else {
                setSelectedOptions([...selectedOptions, option]);
                if (observeMenuItemClick) {
                    observeMenuItemClick(option, true);
                }
            }
        },
        [observeMenuItemClick, selectedOptions, setSelectedOptions]
    );

    const handleChipDeleteClick = useCallback(
        (option: ListDropdownOption) => {
            setSelectedOptions(selectedOptions.filter(({ label }) => label !== option.label));
            if (observeMenuItemClick) {
                observeMenuItemClick(option, false);
            }
        },
        [observeMenuItemClick, selectedOptions, setSelectedOptions]
    );

    return (
        <ListDropdown
            PopoverButton={popoverButton}
            ActionIcon={actionIcon}
            FilterIcon={filterIcon}
            title={title}
            chipsLabel="Selected"
            optionsMap={optionsMap}
            selectedOptions={selectedOptions}
            getItemTooltipTitle={getItemTooltipTitle}
            onChipDeleteClick={handleChipDeleteClick}
            getIcon={getCheckboxIcon}
            onItemClick={handleMenuItemClick}
            onActionIconClick={onActionIconClick}
            onFilterIconClick={onFilterIconClick}
            onSyncButtonHover={onSyncButtonHover}
            onSyncButtonLeave={onSyncButtonLeave}
        />
    );
};
