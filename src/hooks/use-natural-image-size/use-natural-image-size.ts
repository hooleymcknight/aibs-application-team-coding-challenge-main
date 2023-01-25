import { useState, useLayoutEffect } from 'react';

import { SizeDimensions } from '../../types';

const ZERO_SIZE_DIMENSIONS: Partial<SizeDimensions> = {
    width: 0,
    height: 0,
};

export const useNaturalImageSize = (src: string): Partial<SizeDimensions> => {
    const [nativeImageSize, setNativeImageSize] = useState(ZERO_SIZE_DIMENSIONS);

    useLayoutEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setNativeImageSize({
                height: img?.naturalHeight,
                width: img?.naturalWidth,
            });
        };
    }, [src]);

    return nativeImageSize;
};
