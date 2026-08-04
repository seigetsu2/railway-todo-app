import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import react from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: "latest",
      },
    },
    extends: [
      js.configs.recommended,
      react.configs.flat.recommended,
      eslintConfigPrettier,
    ],
    plugins: {
      react,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
]);
