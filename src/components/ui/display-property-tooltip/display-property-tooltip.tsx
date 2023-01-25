/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import MUITooltip, { TooltipProps } from '@material-ui/core/Tooltip';

import { DEFAULT_TOOLTIP_DELAY } from '../../../constants';

export const DisplayPropertyTooltip = ({ title, children, enterDelay, ...props }: TooltipProps) => {
    const [show, setShow] = useState(true);

    const handleWheel = useCallback(() => {
        if (!show) return;

        // If the user scrolls, disable the current tooltip.
        setShow(false);
        // Reset tooltip after ~1,500ms
        setTimeout(() => setShow(true), DEFAULT_TOOLTIP_DELAY);
    }, [show]);

    if (!title || !show) {
        return children;
    }

    return (
        <MUITooltip
            enterDelay={enterDelay || DEFAULT_TOOLTIP_DELAY}
            onWheel={handleWheel}
            title={title}
            {...props}
        >
            {children}
        </MUITooltip>
    );
};
