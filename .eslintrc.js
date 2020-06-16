module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ['sonarjs'],
  extends: ['plugin:vue/essential', '@vue/airbnb', 'plugin:sonarjs/recommended'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': ['off'],
    'object-curly-newline': ['off'],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.vue'],
      },
    },
  },
};
