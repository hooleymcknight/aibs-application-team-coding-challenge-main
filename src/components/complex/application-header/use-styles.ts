import { makeStyles } from '@material-ui/core/styles';
import { APPLICATION_HEADER_HEIGHT } from '../../../constants';
import { primaryDarkBlue, bold, zIndexMap } from '../../../styles/constants';

export const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: primaryDarkBlue,
        minHeight: theme.spacing(APPLICATION_HEADER_HEIGHT),
        position: 'sticky',
        top: 0,
        zIndex: zIndexMap.applicationHeader,
    },
    title: {
        margin: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    },
    titleText: {
        color: theme.palette.primary.contrastText,
        fontWeight: bold,
        fontSize: '18px',
        lineHeight: '24px',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
    },
    nav: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        flexGrow: 2,
        // Increasing order on xs screens causes the navigation to appear after the logo, terms, and help menu,
        // improving the UI/UX by placing the navigation dropdown on its own line. It's not perfect, as long
        // navigations (like the cell type cards page) will break the flow and push terms and help to a new line
        // even on sm sized screens, but it's an improvement.
        [theme.breakpoints.down('xs')]: {
            order: 1,
        },
    },
}));
