import { useState, useCallback, MouseEvent } from 'react';
import { clamp } from 'lodash';

import { useEvent } from '../use-event/use-event';

export type DragHandleCallback = ({ newWidth, newHeight }: { newWidth: number; newHeight: number }) => void;

export const useDragHandle = (startingSize: number, minSize: number, maxSize: number, onChange: DragHandleCallback) => {
    const [anchorOptions, setAnchorOptions] = useState({
        width: startingSize,
        height: startingSize,
        isStarted: false,
        startX: 0,
        startY: 0,
    });

    const handleStart = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            setAnchorOptions({
                width: startingSize,
                height: startingSize,
                isStarted: true,
                startX: event.clientX,
                startY: event.clientY,
            });
        },
        [startingSize]
    );

    const handleEnd = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            if (!anchorOptions.isStarted) {
                return;
            }

            setAnchorOptions((previous) => ({
                ...previous,
                isDragging: false,
                isStarted: false,
            }));

            onChange({ newWidth: anchorOptions.width, newHeight: anchorOptions.height });
        },
        [anchorOptions.isStarted, anchorOptions.width, anchorOptions.height, onChange]
    );

    const handleMove = useCallback(
        (event: MouseEvent) => {
            event.preventDefault();
            if (!anchorOptions.isStarted) {
                return;
            }

            const clampedWidth = clamp(anchorOptions.width + event.clientX - anchorOptions.startX, minSize, maxSize);
            const clampedHeight = clamp(anchorOptions.height + event.clientY - anchorOptions.startY, minSize, maxSize);

            setAnchorOptions((previous) => ({
                ...previous,
                width: clampedWidth,
                height: clampedHeight,
                startX: event.clientX,
                startY: event.clientY,
            }));

            onChange({ newWidth: clampedWidth, newHeight: clampedHeight });
        },
        [anchorOptions, maxSize, minSize, onChange]
    );

    // We don't need to expose handleMove or handleEnd to the user because those are handled automatically
    // by event listeners, but handleStart needs to be connected to a specific DOM element
    useEvent('mousemove', handleMove);
    useEvent('mouseup', handleEnd);

    return { handleStart };
};
