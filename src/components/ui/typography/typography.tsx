import React from 'react';
import MUITypography, { TypographyProps as MUITypographyProps } from '@material-ui/core/Typography';
import { typographyVariantMap } from '../../../styles/theme';
import { TypographyVariant } from '../../../styles/types/typography';

export interface TypographyProps extends Omit<MUITypographyProps, 'variant'> {
    variant?: TypographyVariant;
    component?: React.ElementType;
}

/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment */
export const Typography = ({ variant, ...props }: TypographyProps) => (
    <MUITypography
        {...props}
        variant={variant ? typographyVariantMap[variant] : undefined}
    />
);
