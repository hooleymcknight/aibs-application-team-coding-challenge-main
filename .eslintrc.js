module.exports = {
    env: {
        browser: true,
        es6: true,
        'jest/globals': true,
    },
    extends: ['airbnb', 'prettier'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        module: 'readonly',
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: ['jest', 'react', 'react-hooks', '@typescript-eslint'],
    rules: {
        'default-param-last': 0,
        'react/jsx-curly-brace-presence': ['warn'],
        // We rely on Typescript to check prop types
        'react/prop-types': [0],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'error',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        'import/extensions': ['error', 'never'],
        'import/prefer-default-export': [0],
        'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
        'react/require-default-props': [2, { ignoreFunctionalComponents: true }],
        'react/function-component-definition': [
            2,
            {
                namedComponents: ['function-declaration', 'arrow-function'],
                unnamedComponents: 'arrow-function',
            },
        ],
        'no-restricted-imports': [
            'error',
            {
                patterns: ['@material-ui/*/*/*', '!@material-ui/core/test-utils/*'],
            },
        ],
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
        'no-param-reassign': [
            'error',
            {
                props: true,
                ignorePropertyModificationsFor: ['state', 'acc', 'operation'],
            },
        ],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    '**/*.test.js',
                    '**/*.spec.js',
                    '**/*.test.ts',
                    '**/*.spec.ts',
                    '**/*.test.tsx',
                    '**/*.spec.tsx',
                ],
            },
        ],
    },
    overrides: [
        {
            rules: {
                'react/jsx-props-no-spreading': 'off',
            },
        },
    ],
    settings: {
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
        react: {
            createClass: 'createReactClass', // Regex for Component Factory to use,
            // default to 'createReactClass'
            pragma: 'React', // Pragma to use, default to 'React'
            version: 'detect',
            // React version. 'detect' automatically picks the version you have installed.
            // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
            // default to latest and warns if missing
            // It will default to 'detect' in the future
            flowVersion: '0.53', // Flow version
        },
        propWrapperFunctions: [
            // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`.
            // If this isn't set, any propTypes wrapped in a function will be skipped.
            'forbidExtraProps',
            { property: 'freeze', object: 'Object' },
            { property: 'myFavoriteWrapper' },
        ],
        linkComponents: [
            // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
            'Hyperlink',
            { name: 'Link', linkAttribute: 'to' },
        ],
    },
};
