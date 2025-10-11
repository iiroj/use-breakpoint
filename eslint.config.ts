import type { ConfigObject } from '@eslint/core'
import { defineConfig } from 'eslint/config'
import eslintJs from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const config: ConfigObject[] = defineConfig(
  {
    ignores: ['coverage/**', 'dist/**'],
  },
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'sort-imports': 'error',
    },
  },
  eslintJs.configs.recommended,
  tseslint.configs.eslintRecommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  eslintPluginPrettierRecommended,
)

export default config
