import { makeStyles } from '@material-ui/core/styles';
import { lt1, lt2, mdMid, white } from '../../../styles/constants';

export const useStyles = makeStyles((theme) => ({
    listDropdown: {
        minWidth: '550px',
    },
    headerBox: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(1),
        borderBottom: `2px solid ${lt1}`,
    },
    title: {
        padding: theme.spacing(1),
        minWidth: '215px',
    },
    headerIcon: {
        padding: theme.spacing(1.25),
        borderRadius: 0,
    },
    searchIcon: {
        marginLeft: 'auto',
    },
    syncButton: {
        '&:hover': {
            borderRadius: 0,
        },
    },
    searchField: {
        flexGrow: 1,
    },
    closeIconButton: {
        padding: theme.spacing(1.25),
        borderRadius: 0,
    },
    chipsBox: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    chipsHolder: {
        flexGrow: 1,
        maxWidth: '450px',
        minHeight: '40px',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        paddingBottom: theme.spacing(0.25),
        borderBottom: `1px solid ${lt1}`,
    },
    chip: {
        margin: theme.spacing(0.25),
    },
    chipIconWrapper: {
        cursor: 'pointer',
        display: 'flex',
    },
    listSubheader: {
        color: mdMid,
        paddingLeft: theme.spacing(5),
    },
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        padding: 0,
    },
    listItem: {
        paddingTop: 0,
        paddingBottom: 0,
        minHeight: '40px',
        '&:hover': {
            textDecoration: 'none',
            backgroundColor: lt2,
            cursor: 'pointer',
        },
        '& svg:not(:hover)': {
            color: mdMid,
        },
        '& .MuiListItemIcon-root': {
            minWidth: 40,
            display: 'flex',
            justifyContent: 'center',
        },
        '&.Mui-selected': {
            backgroundColor: white,
        },
    },
    itemText: {
        display: 'inline',
    },
    noOptionsFound: {
        textAlign: 'center',
        padding: theme.spacing(1),
    },
}));
