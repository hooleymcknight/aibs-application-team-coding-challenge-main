export const dispatchCustomEvent = <T>(eventName: string, detail?: T): void => {
    const customEvent = new CustomEvent(eventName, { detail });

    document.dispatchEvent(customEvent);
};
