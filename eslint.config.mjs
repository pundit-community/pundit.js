import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import eslintConfigPrettier from 'eslint-config-prettier'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error'
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier
]
