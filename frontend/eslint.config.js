const globals = require('globals');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');

module.exports = [
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        plugins: {
            react,
            "react-hooks": reactHooks,
        },
        languageOptions: {
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
        },
        settings: {
            react: {
                version: "detect"
            }
        }
    },
];