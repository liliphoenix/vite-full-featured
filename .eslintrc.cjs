module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/recommended',
    'standard-with-typescript',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue']
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['Home', 'Login', 'index']
      }
    ],
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'vue/no-v-model-argument': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/ban-ts-comment': 'off'
  }
}
