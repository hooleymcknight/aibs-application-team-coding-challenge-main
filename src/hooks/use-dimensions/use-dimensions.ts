/**
 * "Fork" of the following project:
 * https://github.com/Swizec/useDimensions/blob/master/src/index.ts
 */

import { useState, useCallback, useLayoutEffect } from 'react';

export interface DimensionObject {
    width: number;
    height: number;
    left: number;
    x: number;
    top: number;
    y: number;
    right: number;
    bottom: number;
}

export type UseDimensionsHook = [(node: HTMLElement) => void, null | DimensionObject, HTMLElement | null];

export interface UseDimensionsArgs {
    liveMeasure?: boolean;
    documentListeners?: string[];
    windowListeners?: string[];
}

function getDimensionObject(node: HTMLElement): DimensionObject {
    const rect = node.getBoundingClientRect();

    return {
        width: rect.width,
        height: rect.height,
        left: rect?.x || rect.left,
        x: rect?.x || rect.left,
        top: rect?.y || rect.top,
        y: rect?.y || rect.top,
        right: rect.right,
        bottom: rect.bottom,
    };
}

/**
 * useDimensions
 * A hook to get useful measurements from getBoundingClientRect.
 * WARNING: DO NOT pass a new argument object to this hook
 * unless you really need to update listeners a lot.
 * Passing a new argument will drastically reduce performance.
 * There are subtle differences between document and window listeners, so both are provided.
 */
export function useDimensions({
    liveMeasure = true,
    documentListeners,
    windowListeners,
}: UseDimensionsArgs = {}): UseDimensionsHook {
    const [dimensions, setDimensions] = useState<DimensionObject | null>(null);
    const [node, setNode] = useState<HTMLElement | null>(null);

    const ref = useCallback((nextNode: HTMLElement) => {
        setNode(nextNode);
    }, []);

    useLayoutEffect(() => {
        if (node) {
            const measure = () => window.requestAnimationFrame(() => setDimensions(getDimensionObject(node)));

            measure();

            if (liveMeasure) {
                window.addEventListener('resize', measure);
                window.addEventListener('scroll', measure);
                if (documentListeners) {
                    documentListeners.forEach((type) => {
                        document.addEventListener(type, measure);
                    });
                }
                if (windowListeners) {
                    windowListeners.forEach((type) => {
                        window.addEventListener(type, measure);
                    });
                }

                return () => {
                    window.removeEventListener('resize', measure);
                    window.removeEventListener('scroll', measure);
                    if (documentListeners) {
                        documentListeners.forEach((type) => {
                            document.removeEventListener(type, measure);
                        });
                    }
                    if (windowListeners) {
                        windowListeners.forEach((type) => {
                            window.removeEventListener(type, measure);
                        });
                    }
                };
            }
        }

        return () => {};
    }, [liveMeasure, documentListeners, windowListeners, node]);

    return [ref, dimensions, node];
}
