import { makeStyles } from '@material-ui/core/styles';
import { dk1 } from '../../../styles/constants';

export const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: dk1,
    },
    text: {
        color: theme.palette.primary.contrastText,
    },
}));
