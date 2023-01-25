import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

/* eslint-disable react/jsx-props-no-spreading */
export const ShowAllIcon = (props: SvgIconProps) => (
    <SvgIcon
        viewBox="0 0 16 20"
        {...props}
    >
        <path d="M0 18H16V20H0V18ZM0 0H16V2H0V0ZM9 7H12L8 3L4 7H7V13H4L8 17L12 13H9V7Z" />
    </SvgIcon>
);
