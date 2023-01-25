import React from 'react';
import { Box } from '@material-ui/core';

export const highlightSubstringInString = (mainString: string, subString: string) => {
    if (!subString) {
        return mainString;
    }

    const substringIndex = mainString.toLowerCase().indexOf(subString.toLowerCase());

    if (substringIndex < 0) {
        return mainString;
    }

    return (
        <>
            {mainString.slice(0, substringIndex)}
            <Box
                component="span"
                fontWeight="fontWeightBold"
            >
                {mainString.slice(substringIndex, substringIndex + subString.length)}
            </Box>

            {mainString.slice(substringIndex + subString.length, mainString.length + subString.length)}
        </>
    );
};

interface LimitedSurroundingTextMatchConfig {
    mainString: string;
    subString: string;
    wordsBefore?: number;
    wordsAfter?: number;
    useEllipsis?: boolean;
}

// Escapes chars that will break regex
// Specifically fixes use-case "(mouse Sst)-like"
// https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
export function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export const getSurroundingTextMatches = ({
    mainString,
    subString,
    wordsBefore = 2,
    wordsAfter = 2,
}: LimitedSurroundingTextMatchConfig): RegExpMatchArray => {
    const escapedSubString = escapeRegExp(subString);
    // RegExp based on https://stackoverflow.com/questions/15496795/regexp-to-get-n-words-before-and-after/15586010
    const pattern = `((?:[^ ]+[ -,a-z0-9]){0,${wordsBefore}})(${escapedSubString})((?:[ -,a-z0-9][^ ]+){0,${wordsAfter}})`; // eslint-disable-line max-len
    const reg = new RegExp(pattern, 'i');
    return mainString.match(reg);
};

export const highlightSubstringWithLimitedContext = (config: LimitedSurroundingTextMatchConfig) => {
    const match = getSurroundingTextMatches(config);
    if (!match) {
        return null;
    }

    const { 0: regExpMatch, 1: beforeMatch, 2: inputMatch, 3: afterMatch, index } = match;

    const { mainString, useEllipsis = true } = config;

    const startWithEllipsis = useEllipsis && index > 0;
    const endWithEllipsis = useEllipsis && mainString.length > index + regExpMatch.length;

    return (
        <>
            {startWithEllipsis && <span>&#8230;</span>}
            {beforeMatch}
            <Box
                component="span"
                fontWeight="fontWeightBold"
            >
                {inputMatch}
            </Box>
            {afterMatch}
            {endWithEllipsis && <span>&#8230;</span>}
        </>
    );
};
