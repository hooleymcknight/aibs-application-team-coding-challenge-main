export const pluralizeNoun = (count: number, noun: string, suffix = 's') => `${noun}${count !== 1 ? suffix : ''}`;

// TODO: Consider using the number formatter here
export const pluralizeString = (count: number, noun: string, suffix = 's') =>
    `${count} ${pluralizeNoun(count, noun, suffix)}`;
