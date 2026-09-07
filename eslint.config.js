// Flat-config equivalent of scratch-ext's .eslintrc.json
// https://github.com/FurryR/scratch-ext/blob/main/.eslintrc.json
import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        Scratch: 'readonly',
        window: 'readonly',
        document: 'readonly',
        console: 'readonly'
      }
    },
    rules: {
      indent: 'off',
      'linebreak-style': ['error', 'unix'],
      quotes: 'off',
      semi: ['error', 'never'],
      'no-extra-semi': 'off',
      '@typescript-eslint/no-namespace': 'off'
    }
  },
  {
    ignores: ['output/', 'dist/', 'node_modules/']
  }
)
