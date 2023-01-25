import React, { ReactElement, useCallback, useMemo, useState, MouseEvent, ChangeEvent } from 'react';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Popover, { PopoverOrigin } from '@material-ui/core/Popover';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import flatMap from 'lodash/flatMap';

import { DisplayPropertyTooltip, Typography } from '../../ui';
import { useStyles } from './use-styles';
import { OptionBase, OptionTooltipTitleAccessor } from '../../../types';
import { tooltipListItemText } from '../../ui/tooltip-list-item-text';
import { highlightSubstringInString } from '../../../utils';

const anchorOrigin: PopoverOrigin = { vertical: 'bottom', horizontal: 'left' };
const transformOrigin: PopoverOrigin = { vertical: 'top', horizontal: 'left' };

export type ListDropdownOptionsMap<T extends ListDropdownOption> = Map<string, T[]>;

export interface ListDropdownOption extends OptionBase {
    field: string;
}

export interface ListDropdownProps<T extends ListDropdownOption> {
    PopoverButton: ReactElement;
    ActionIcon?: ReactElement;
    FilterIcon?: ReactElement;
    title: string;
    chipsLabel: string;
    optionsMap: ListDropdownOptionsMap<T>;
    selectedOptions: T[];
    getItemTooltipTitle?: OptionTooltipTitleAccessor;
    onChipIconClick?: (option: T) => void; // If not provided, chip action will not show
    onChipDeleteClick: (option: T) => void;
    getIcon: (option: T) => ReactElement;
    onItemClick: (event: MouseEvent, option: T) => void;
    onActionIconClick?: (event: MouseEvent) => void;
    onFilterIconClick?: (event: MouseEvent) => void;
    onSyncButtonHover?: (event: MouseEvent) => void;
    onSyncButtonLeave?: (event: MouseEvent) => void;
    setIsDropdownOpen?: (isOpen: boolean) => void;
}

export const ListDropdown = <T extends ListDropdownOption>(props: ListDropdownProps<T>) => {
    const {
        PopoverButton,
        ActionIcon,
        FilterIcon,
        title,
        chipsLabel,
        optionsMap,
        selectedOptions,
        getItemTooltipTitle,
        onChipIconClick,
        onChipDeleteClick,
        getIcon,
        onItemClick,
        onActionIconClick,
        onFilterIconClick,
        onSyncButtonHover,
        onSyncButtonLeave,
        setIsDropdownOpen = () => {},
    } = props;

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [searchString, setSearchString] = useState<string>('');
    const [showSearch, setShowSearch] = useState<boolean>(false);

    const handleClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
            setIsDropdownOpen(true);
        },
        [setIsDropdownOpen]
    );

    const handleClose = useCallback(() => {
        setAnchorEl(null);
        setIsDropdownOpen(false);
    }, [setIsDropdownOpen]);

    const handleSearchChange = useCallback((input: string) => {
        setSearchString(input);
    }, []);

    const paperProps = useMemo(
        () => ({
            square: true,
            elevation: 1,
        }),
        []
    );

    const filteredOptions = new Map(
        Array.from(optionsMap.entries()).map(([groupKey, options]) => [
            groupKey,
            options.filter((o) => o.label.toLowerCase().includes(searchString.toLowerCase())),
        ])
    );

    const areOptionsAvailable = flatMap(Array.from(filteredOptions.values())).length > 0;

    const inputEndAdornment = (
        <InputAdornment position="end">
            <DisplayPropertyTooltip title="Cancel search">
                <IconButton
                    onClick={() => {
                        setShowSearch(false);
                        handleSearchChange('');
                    }}
                    className={classes.closeIconButton}
                >
                    <ClearIcon fontSize="small" />
                </IconButton>
            </DisplayPropertyTooltip>
        </InputAdornment>
    );

    const header = (
        <div className={classes.headerBox}>
            {!showSearch && (
                <Typography
                    variant="titleUppercase"
                    color="textSecondary"
                    className={classes.title}
                >
                    {title}
                </Typography>
            )}
            {FilterIcon && !showSearch ? (
                <IconButton
                    onMouseOver={onSyncButtonHover}
                    onMouseLeave={onSyncButtonLeave}
                    color="default"
                    disableRipple
                    className={classes.headerIcon}
                    onClick={onFilterIconClick}
                >
                    {FilterIcon}
                </IconButton>
            ) : null}
            {ActionIcon && !showSearch ? (
                <IconButton
                    color="default"
                    disableRipple
                    className={classes.headerIcon}
                    onClick={onActionIconClick}
                >
                    {ActionIcon}
                </IconButton>
            ) : null}
            <DisplayPropertyTooltip title="Search">
                <IconButton
                    color="default"
                    disableRipple
                    onClick={() => setShowSearch(true)}
                    className={`${classes.headerIcon} ${classes.searchIcon}`}
                >
                    <SearchIcon fontSize="small" />
                </IconButton>
            </DisplayPropertyTooltip>
            {showSearch && (
                <TextField
                    placeholder="Search"
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleSearchChange(e.target.value)}
                    onBlur={() => {
                        setShowSearch(searchString !== '');
                    }}
                    InputProps={{
                        autoFocus: true,
                        endAdornment: inputEndAdornment,
                        disableUnderline: true,
                    }}
                    className={classes.searchField}
                />
            )}
        </div>
    );

    const chips = (
        <Box className={classes.chipsBox}>
            <Typography variant="description">{chipsLabel}</Typography>
            <Box className={`chipsHolder ${classes.chipsHolder}`}>
                {selectedOptions.map((option) => (
                    <Chip
                        key={`chip-${option.label}`}
                        className={classes.chip}
                        icon={
                            onChipIconClick && (
                                <Box
                                    onClick={() => onChipIconClick(option)}
                                    className={classes.chipIconWrapper}
                                >
                                    {getIcon(option)}
                                </Box>
                            )
                        }
                        label={option.label}
                        onDelete={() => onChipDeleteClick(option)}
                    />
                ))}
            </Box>
        </Box>
    );

    const optionsList = (
        <List className={classes.list}>
            {areOptionsAvailable &&
                Array.from(filteredOptions.entries()).map(([group, groupOptions]) => (
                    <React.Fragment key={group}>
                        {groupOptions.length > 0 && (
                            <ListSubheader>
                                <Typography
                                    variant="titleUppercaseSmall"
                                    className={classes.listSubheader}
                                >
                                    {group}
                                </Typography>
                            </ListSubheader>
                        )}
                        {groupOptions.map((option) => (
                            <ListItem
                                className={classes.listItem}
                                key={option.label}
                                onClick={(event) => onItemClick(event, option)}
                            >
                                <ListItemIcon>{getIcon(option)}</ListItemIcon>
                                <ListItemText
                                    primary={highlightSubstringInString(option.label, searchString)}
                                    primaryTypographyProps={{
                                        className: classes.itemText,
                                        component: tooltipListItemText(option, getItemTooltipTitle),
                                    }}
                                />
                            </ListItem>
                        ))}
                    </React.Fragment>
                ))}
            {!areOptionsAvailable && <Typography className={classes.noOptionsFound}>No properties found</Typography>}
        </List>
    );

    return (
        <>
            {React.cloneElement(PopoverButton, { onClick: handleClick })}
            <Popover
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
                PaperProps={paperProps}
            >
                <Box className={`listDropdown ${classes.listDropdown}`}>
                    {header}
                    {chips}
                    {optionsList}
                </Box>
            </Popover>
        </>
    );
};
