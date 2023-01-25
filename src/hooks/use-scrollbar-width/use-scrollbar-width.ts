import { useState, useEffect } from 'react';

export const useScrollbarWidth = () => {
    const [scrollbarWidth, setScrollbarWidth] = useState(0);

    useEffect(() => {
        // Creating invisible container
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll'; // forcing scrollbar to appear
        document.body.appendChild(outer);

        // Creating inner element and placing it in the container
        const inner = document.createElement('div');
        outer.appendChild(inner);

        // Calculating difference between container's full width and the child width
        const width = outer.offsetWidth - inner.offsetWidth;

        // Removing temporary elements from the DOM
        outer.parentNode?.removeChild(outer);

        setScrollbarWidth(width);
    }, []);

    return scrollbarWidth;
};
