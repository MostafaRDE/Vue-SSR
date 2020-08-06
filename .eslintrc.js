module.exports = {
    'ecmaFeatures': {
        'modules': true,
    },
    'env': {
        'es6': true,
        'browser': true,
        'node': true,
    },
    'extends': [
        'eslint:recommended',
    ],
    'parserOptions': {
        'sourceType': 'module',
        'ecmaVersion': 2020,
    },
    'rules': {
        'array-bracket-spacing': [ 'error', 'always' ],
        'brace-style': [ 'error', 'stroustrup', { 'allowSingleLine': true } ],
        'comma-dangle': [ 'error', 'always-multiline' ],
        'comma-spacing': [ 'error', { 'before': false, 'after': true } ],
        'eqeqeq': 'warn',
        'indent': [ 'error', 4, {
            'SwitchCase': 1,
        } ],
        'init-declarations': 'off',
        'linebreak-style': [ 'error', 'windows' ],
        'no-cond-assign': [ 'error', 'always' ],
        'no-console': 'off',
        'no-empty': 'off',
        'no-inline-comments': 'off',
        'no-unused-vars': [ 'off', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false } ],
        'object-curly-spacing': [ 'error', 'always' ],
        'one-var': 'off', // ["error", "never"]
        'quotes': [ 'error', 'single' ],
        'semi': [ 'error', 'never' ],
        'space-infix-ops': [ 'error', { 'int32Hint': false } ],
        'strict': 'off',
    },
}
