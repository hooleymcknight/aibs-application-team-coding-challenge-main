module.exports = {
    roots: ['<rootDir>/src'],
    testEnvironment: 'jsdom',
    testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest'],
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    },
};
