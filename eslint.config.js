import globals from 'globals';
import eslintJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintReact from '@eslint-react/eslint-plugin';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    extends: [
      eslintJs.configs.recommended,
      tseslint.configs.recommended,
      eslintReact.configs['recommended-typescript'],
    ],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      // Use TypeScript ESLint parser for TypeScript files
      parser: tseslint.parser,
    },
  },
]);
