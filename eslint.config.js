import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';

/** @type {import('eslint').Linter.FlatConfig} */
const config = [
    {
        languageOptions: {
            parser: typescriptEslintParser,
            globals: {

            },
        },
        plugins: {
            '@typescript-eslint': typescriptEslintPlugin,
        },
        rules: {
            'max-len': ['error', 100],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            'no-var': 'error',
            'semi': 'error',
            'indent': 'error',
            'no-multi-spaces': 'error',
            'space-in-parens': 'error',
            'no-multiple-empty-lines': 'error',
            'prefer-const': 'error',
            'no-use-before-define': 'error',
            'camelcase': 'error',
            'prefer-arrow-callback': 'error',
            'arrow-spacing': ['error', { 'before': true, 'after': true }],
            'no-console': 'warn',
            'consistent-return': 'error',
            'quotes': ['error', 'single'],
            'no-unused-vars': 'warn',
            'no-duplicate-imports': 'error',
        },
        ignores: ['dist/**/*'],
    },
];

export default config;