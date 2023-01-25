import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { withStyles } from '@material-ui/core/styles';

import { lt1 } from '../../../../styles/constants';

// While other modules use the Hook API, I am following the Customized Accordions approach here.
// https://material-ui.com/components/accordion/#customized-accordions
// The Hooks API approach made it difficult to remove some of the built-in styling with regard to:
// padding, margins, heights.
export const FilterAccordion = withStyles({
    root: {
        boxShadow: 'none',
        padding: 0,
        margin: 0,
    },
})(MuiAccordion);

export const FilterAccordionSummary = withStyles((theme) => ({
    root: {
        marginBottom: -1,
        minHeight: theme.spacing(5),
        '&$expanded': {
            minHeight: theme.spacing(5),
        },
        padding: 0,
        borderTop: `1px solid ${lt1}`,
        borderBottom: `1px solid ${lt1}`,
    },
    content: {
        margin: 0,
        '&$expanded': {
            margin: 0,
        },
    },
    expanded: {},
}))(MuiAccordionSummary);

export const FilterAccordionDetails = withStyles({
    root: {
        padding: 0,
        height: '200px',
    },
})(MuiAccordionDetails);
