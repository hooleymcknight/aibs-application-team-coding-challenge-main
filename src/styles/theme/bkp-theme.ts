import { createTheme } from '@material-ui/core/styles';
import {
    primaryBrightBlue,
    primaryDarkBlue,
    white,
    roboto,
    regular,
    lato,
    demiBold,
    medium,
    bold,
    md1,
    hover,
    md2,
    tonalMedium,
    lt1,
} from '../constants';

export const bkpTheme = createTheme({
    overrides: {
        MuiButton: {
            contained: {
                boxShadow: 'none',
                paddingLeft: '24px',
                paddingRight: '24px',
                borderRadius: '5px',
                minWidth: '75px',
                height: '40px',
                '&:disabled': {
                    backgroundColor: md2,
                    color: white,
                },
            },
            containedPrimary: {
                '&:hover': {
                    boxShadow: 'none',
                },
            },
            outlined: {
                borderWidth: '1px',
                boxShadow: 'none',
                paddingLeft: '24px',
                paddingRight: '24px',
                borderRadius: '5px',
                minWidth: '75px',
                height: '40px',
                color: md2,
                '&:hover': {
                    boxShadow: 'none',
                },
                '&:disabled': {
                    color: md2,
                },
            },
            outlinedPrimary: {
                '&:hover': {
                    boxShadow: 'none',
                    backgroundColor: hover,
                    color: white,
                    border: 'none',
                },
                color: primaryDarkBlue,
            },
            sizeSmall: {
                minWidth: '60px',
                height: '32px',
                borderRadius: '4px',
                paddingLeft: '22px',
                paddingRight: '22px',
                fontSize: '15px',
            },
            text: {
                paddingLeft: '24px',
                paddingRight: '24px',
                lineHeight: '32px',
                fontWeight: bold,
                letterSpacing: '0.01em',
                '&:disabled': {
                    color: md2,
                },
            },
            textPrimary: {
                '&:hover': {
                    backgroundColor: 'inherit',
                    color: hover,
                },
                '&:active': {
                    color: tonalMedium,
                },
            },
        },
        MuiListItem: {
            root: {
                '&$selected': { backgroundColor: lt1 },
            },
        },
    },
    palette: {
        background: {
            default: white,
        },
        primary: {
            light: primaryBrightBlue,
            main: primaryBrightBlue,
            dark: hover,
            contrastText: white,
        },
    },
    typography: {
        // d1
        h1: {
            fontFamily: lato,
            fontSize: '50px',
            fontWeight: regular,
            lineHeight: '72px',
            letterSpacing: '0em',
            color: primaryDarkBlue,
        },
        // d2
        h2: {
            fontFamily: lato,
            fontSize: '40px',
            fontWeight: regular,
            lineHeight: '48px',
            letterSpacing: '0em',
            color: primaryDarkBlue,
        },
        // h1
        h3: {
            fontFamily: lato,
            fontSize: '26px',
            fontWeight: demiBold,
            lineHeight: '32px',
            letterSpacing: '0em',
            color: primaryDarkBlue,
        },
        // h2
        h4: {
            fontFamily: lato,
            fontSize: '26px',
            fontWeight: medium,
            lineHeight: '32px',
            letterSpacing: '0em',
            color: primaryDarkBlue,
        },
        // titleUppercase
        h5: {
            fontFamily: roboto,
            fontSize: '16px',
            fontWeight: bold,
            lineHeight: '24px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: primaryDarkBlue,
        },
        // title
        h6: {
            fontFamily: roboto,
            fontSize: '16px',
            fontWeight: bold,
            letterSpacing: '0em',
            lineHeight: '24px',
            color: primaryDarkBlue,
        },
        // emphasis
        overline: {
            fontFamily: roboto,
            fontSize: '16px',
            fontWeight: medium,
            lineHeight: '24px',
            letterSpacing: '0em',
            textTransform: 'none',
            color: primaryDarkBlue,
        },
        // body
        body1: {
            fontFamily: roboto,
            fontSize: '16px',
            fontWeight: regular,
            lineHeight: '24px',
            letterSpacing: '0em',
            color: md1,
        },
        // description
        body2: {
            fontFamily: roboto,
            fontSize: '14px',
            fontWeight: regular,
            lineHeight: '16px',
            letterSpacing: '0.01em',
            color: md1,
        },
        // legal
        caption: {
            fontFamily: roboto,
            fontSize: '12px',
            fontWeight: regular,
            lineHeight: '16px',
            letterSpacing: '0.01em',
            color: md1,
        },
        // button
        button: {
            fontFamily: roboto,
            fontSize: '16px',
            fontWeight: bold,
            letterSpacing: '0.01em',
            textTransform: 'none',
            color: primaryDarkBlue,
        },
        // titleUppercaseSmall
        subtitle1: {
            fontFamily: roboto,
            fontSize: '13px',
            fontWeight: bold,
            lineHeight: '24px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: primaryDarkBlue,
        },
        // titleSmall
        subtitle2: {
            fontFamily: roboto,
            fontSize: '14px',
            fontWeight: medium,
            lineHeight: '24px',
            letterSpacing: '0.01em',
            color: primaryDarkBlue,
        },
    },
});
