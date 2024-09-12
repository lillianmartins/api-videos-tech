import globals from "globals";
import pluginJs from "@eslint/js";

{
  "env": {
      "es2021": true,
      "node": true
  },
  "extends": "eslint:recommended",
  "overrides": [
  ],
  "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module"
  },
  "rules": {
      "indent": [
          "error",
          2
      ],
      "linebreak-style": [
          "error",
          "windows"
      ],
      "quotes": [
          "error",
          "double"
      ],
      "semi": [
          "error",
          "always"
      ]
  }
}

export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
];
