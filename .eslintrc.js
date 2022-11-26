module.exports = {
    plugins: [
        '@typescript-eslint',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        project: ['./tsconfig.json'],
    },
    extends: [
        'eslint:recommended',
        'prettier',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/object-curly-spacing': 'off',
        '@typescript-eslint/strict-boolean-expressions': ['error', { allowString: false, allowNumber: false }],
        'eqeqeq': ['error', 'always'],
        'linebreak-style': 'off',
        'prettier/prettier': ['error', {
            singleQuote: true,
            useTabs: false,
            endOfLine: 'lf',
            printWidth: 120,
            trailingComma: 'all',
            semi: true,
            arrowParens: 'always',
            tabWidth: 2
        }],
        'yoda': ['error', 'never'],
    },
};
