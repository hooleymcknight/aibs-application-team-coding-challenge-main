export const pct = (num: number, denom: number): string => {
    if (denom === 0) {
        return '0%';
    }

    const p = Math.round((num / denom) * 100);
    return `${p}%`;
};
