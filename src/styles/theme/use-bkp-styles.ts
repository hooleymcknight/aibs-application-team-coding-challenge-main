import { makeStyles } from '@material-ui/core/styles';
import { hover, md2 } from '../constants';

export const useBKPStyles = makeStyles((theme) => ({
    root: {},
    buttonPL: {
        ...theme.typography.button,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        textTransform: 'none',
        '&:hover': {
            backgroundColor: hover,
        },
        padding: theme.spacing(2, 3),
        whiteSpace: 'nowrap',
    },
    buttonSL: {
        ...theme.typography.button,
        border: `solid ${theme.palette.primary.main} 1px`,
        color: theme.palette.common.black,
        textTransform: 'none',
        '&:hover': {
            backgroundColor: hover,
            color: theme.palette.common.white,
        },
        padding: theme.spacing(2, 3),
        whiteSpace: 'nowrap',
    },
    buttonDisabledPL: {
        ...theme.typography.button,
        backgroundColor: md2,
        color: theme.palette.primary.contrastText,
        textTransform: 'none',
        '&:hover': {
            backgroundColor: md2,
        },
        padding: theme.spacing(2, 3),
        whiteSpace: 'nowrap',
    },
    buttonDisabledSL: {
        ...theme.typography.button,
        border: `solid ${md2} 1px`,
        color: md2,
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.common.white,
        },
        padding: theme.spacing(2, 3),
        whiteSpace: 'nowrap',
    },
}));
