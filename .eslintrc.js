const { version } = require("react/package.json");

module.exports = {
  env: { browser: true, node: true, es6: true },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: { jsx: true }
  },
  plugins: ["react", "import", "unicorn"],
  settings: { react: { version } },
  extends: [
    "eslint:recommended",
    "plugin:unicorn/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:react/recommended",
    "prettier",
    "prettier/react"
  ],
  rules: {
    "import/named": ["error"],
    "import/no-extraneous-dependencies": ["error"],
    "import/no-namespace": ["error"],
    "no-console": ["off"],
    "no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: true }
    ],
    "react/default-props-match-prop-types": [
      "error",
      { allowRequiredDefaults: true }
    ],
    "react/jsx-key": ["error"],
    "react/jsx-no-duplicate-props": ["error"],
    "react/no-access-state-in-setstate": ["error"],
    "react/no-array-index-key": ["error"],
    "react/no-direct-mutation-state": ["error"],
    "react/no-typos": ["error"],
    "react/no-unused-prop-types": ["error", { skipShapeProps: true }],
    "react/no-unused-state": ["error"],
    "react/prop-types": ["warn"],
    "react/react-in-jsx-scope": ["error"],
    "react/style-prop-object": ["error"]
  }
};
