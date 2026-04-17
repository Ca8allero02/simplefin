module.exports = {
    env: { browser: true, es2020: true},
    extends: [
        'eslint:recomended',
        'plugin:react/recomended',
        'plugin:react-hooks/recomended',
        'prettier',
    ],
    plugins: ['react', 'react-hooks'],
    parseOptions: {ecmaVersion: 'latest', sourceType: 'module'},
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
    },
    settings: {
        react: { version: 'detected' },
    },
}
