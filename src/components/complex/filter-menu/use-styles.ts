import { alpha, makeStyles } from '@material-ui/core/styles';

import { regular, lt1, mdMid, md2, white, dk2, primaryBrightBlue, lt2, translucent } from '../../../styles/constants';

/**
 * Inline styles void use of !important
 */
export const FILTER_ITEM_STYLE = {
    marginLeft: 0,
    marginRight: 0,
};
export const CHECKBOX_STYLE = { padding: 5 };

export const useStyles = makeStyles((theme) => ({
    root: {},
    filterButton: {
        width: '100%',
        height: 'auto',
        minHeight: '46px',
        borderRadius: '0px',
        justifyContent: 'left',
        backgroundColor: white,
        '&:hover': {
            backgroundColor: white,
        },
    },
    filterCountBar: {
        height: '24px',
        backgroundColor: primaryBrightBlue,
        position: 'absolute',
        transform: 'translateY(-4px)',
        opacity: 0.5,
        transitionProperty: 'width',
        transitionDelay: '0.1s',
        transitionDuration: '0.2s',
    },
    chipsWrapper: {
        textAlign: 'left',
        fontWeight: regular,
        fontSize: '15px',
        lineHeight: '28px',
        color: mdMid,
        display: 'flex',
        alignItems: 'center',
    },
    accordionIcon: {
        fontWeight: regular,
        fontSize: '15px',
        lineHeight: '28px',
        color: mdMid,
        display: 'flex',
        marginLeft: theme.spacing(1),
    },
    icon: {
        display: 'inline-flex',
        verticalAlign: 'middle',
    },
    menu: {
        maxWidth: '900px',
    },
    chipsLabel: {
        paddingRight: theme.spacing(1),
        flexShrink: 0,
    },
    chip: {
        backgroundColor: lt1,
        '&:focus': {
            backgroundColor: lt1,
        },
        margin: '1px',
    },
    columnHeader: {
        width: '100%',
        borderRight: `1px solid ${lt1}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: theme.spacing(5),
        position: 'relative', // Allows for the resizer to position itself
    },
    resizer: {
        width: theme.spacing(1),
        height: '100%',
        position: 'absolute',
        right: 0,
        top: 0,
        cursor: 'col-resize',
    },
    columnItems: {
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        minWidth: 200,
        borderRight: `1px solid ${lt1}`,
        overflowX: 'hidden',
    },
    columnsContainer: {
        overflowX: 'auto',
        overflowY: 'hidden',
        flexWrap: 'nowrap',
        maxWidth: '100%',
    },
    columnsScrollContainer: {
        display: 'flex',
    },
    noFilters: {
        width: '100%',
        padding: theme.spacing(3),
        textAlign: 'center',
        backgroundColor: lt2,
    },
    filterColumnHeaderUnit: {
        color: md2,
        paddingLeft: theme.spacing(1),
    },
    filterItem: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        '& .MuiFormControlLabel-label': {
            // 30px accounts for checkbox
            width: 'calc(100% - 30px)',
            paddingRight: theme.spacing(1),
        },
    },
    filterListItem: {
        padding: 0,
    },
    filterItemText: {
        userSelect: 'none',
        position: 'relative',
        width: '100%',
        paddingLeft: theme.spacing(0.5),
        color: dk2,
    },
    filterItemTextCountWrapper: {
        display: 'flex',
        width: '100%',
    },
    filterItemTextWrapper: {
        flex: '0 1 auto',
        display: 'flex',
        overflow: 'hidden',
        '& span': {
            width: '100%',
        },
    },
    filterItemCountWrapper: {
        flex: '0 0 auto',
        marginLeft: 'auto',
        minWidth: 'min(20%, 50px)',
        paddingLeft: theme.spacing(2),
    },
    filterDrag: {
        position: 'sticky',
        bottom: '0%',
        width: '100%',
        backgroundColor: lt2,
        cursor: 'ns-resize',
        borderBottom: `1px solid ${lt1}`,
    },
    filterSlideCloseButton: {
        borderRadius: 0,
        backgroundColor: lt2,
        width: theme.spacing(2),
        height: theme.spacing(2),
        padding: 0,
    },
    filterSearchDisabledHeaderText: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        padding: theme.spacing(1),
    },
    closeIconButton: {
        borderRadius: 0,
        padding: theme.spacing(1.25),
    },
    filterPopover: {
        '& .MuiPaper-elevation8': {
            overflowY: 'hidden',
        },
    },
    labelCheckbox: {
        flex: '0 0 auto',
    },
    searchInputHeader: {
        '& .MuiInputBase-input': {
            padding: theme.spacing(1),
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
    },
    label: {
        width: '100%',
    },
    histogramBarContainer: {
        height: theme.spacing(3),
        '& .MuiListItem-gutters': {
            paddingLeft: '0px',
            paddingRight: '0px',
            marginLeft: theme.spacing(1.5),
        },
        cursor: 'pointer',
    },
    histogramBarListItem: {
        height: theme.spacing(3 - 2 / 8), // subtracting 2 pixels
    },
    histogramBar: {
        height: theme.spacing(3 - 2 / 8), // subtracting 2 pixels
        backgroundColor: primaryBrightBlue,
        position: 'absolute',
        transform: 'translateY(-4px)',
        opacity: 0.5,
        transitionProperty: 'width',
        transitionDelay: '0.1s',
        transitionDuration: '0.2s',
    },
    histogramSlider: {
        marginTop: '11px',
        marginRight: '0px',
        width: '20px',
        '& .MuiSlider-thumb': {
            width: '8px',
            height: '8px',
        },
        '& .MuiSlider-vertical .MuiSlider-thumb': {
            marginLeft: '-3px',
            marginBottom: '-3px',
        },
        '& .MuiSlider-markLabel': {
            fontSize: '10px',
        },
    },
    histogramBarText: {
        position: 'relative',
        marginLeft: 'auto',
        paddingLeft: theme.spacing(0.5),
        marginRight: theme.spacing(1.5),
        top: '3px',
        color: dk2,
    },
    rangeText: {
        marginRight: '10px',
        marginLeft: '10px',
        '& .MuiOutlinedInput-inputMarginDense': {
            paddingTop: '5px',
            paddingBottom: '5px',
        },
    },
    minMaxContainer: {
        display: 'flex',
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        '& .MuiOutlinedInput-input': {
            // Hardcoded 14px for left/right padding to match input label
            padding: `${theme.spacing(1.5)}px 14px`,
        },
    },
    minMaxFieldSpacer: {
        margin: theme.spacing(0.5),
    },
    sliderHistogramContainer: {
        display: 'flex',
    },
    searchIcon: {
        borderRadius: 0,
        padding: theme.spacing(1.25),
    },
    filterSettingsButton: {
        borderRadius: 0,
    },
    filterResetButton: {
        borderRadius: 0,
    },
    treeSubDirectory: {
        marginLeft: 10,
        fillOpacity: 0.6,
    },
    treeFilterContainer: {
        '& .MuiTreeItem-root': {
            transitions: {
                duration: 150,
                property: 'background-color',
                delay: 0,
                easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
        },
        '& .MuiTreeItem-root:focus > .MuiTreeItem-content .MuiTreeItem-label': {
            backgroundColor: translucent,
        },
        ' & .MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label:hover, .MuiTreeItem-root.Mui-selected:focus > .MuiTreeItem-content .MuiTreeItem-label':
            {
                backgroundColor: lt1,
            },
        '& .MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label': {
            backgroundColor: lt1,
        },
        '& .MuiTreeItem-root.Mui-selected:hover > .MuiTreeItem-content .MuiTreeItem-label': {
            backgroundColor: '#00000014',
        },
        '& .MuiTreeItem-iconContainer': {
            zIndex: 10,
        },
        '& .MuiTreeItem-content': {
            paddingLeft: 8,
        },
        backgroundColor: lt2,
        height: 460,
        flexGrow: 1,
        overflow: 'hidden',
        minWidth: 200,
    },
    treeHeaderLabel: {
        justifySelf: 'flex-start',
        paddingLeft: 10,
    },
    treeHeaderBox: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& $filterSearchDisabledHeaderText': {
            padding: theme.spacing(0),
        },
        '& .MuiButton-text': {
            padding: 0,
            '&. MuiButton-label': {
                width: 0,
                height: 20,
            },
        },
    },
    treeHeaderButton: {
        borderRadius: 0,
        padding: theme.spacing(0.5),
    },
    treeViewContainer: {
        height: '96%',
        overflowY: 'scroll',
    },
    treeView: {
        '& .MuiFormControlLabel-root': {
            width: '100%',
            marginRight: 0,
        },
        '& .MuiFormControlLabel-label': {
            width: '100%',
        },
        '& .MuiSvgIcon-root': {
            width: 18,
            fill: '#000000',
            opacity: 0.6,
        },
        [`& .MuiTreeItem-group`]: {
            zIndex: 10,
            backgroundColor: lt2,
            marginLeft: 15,
            paddingLeft: 18,
            borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
        },
    },
}));
