import { useEffect, useState } from 'react';

export const useKeyPressed = (...keys: string[]) => {
    const [keyPressed, setKeyPressed] = useState(false);

    useEffect(() => {
        const downHandler = (e: KeyboardEvent) => {
            if (keys.includes(e.key)) {
                setKeyPressed(true);
            }
        };

        const upHandler = (e: KeyboardEvent) => {
            if (keys.includes(e.key)) {
                setKeyPressed(false);
            }
        };

        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    });

    return keyPressed;
};
