module.exports = {
  extends: "airbnb-base",
  // extends: "eslint:recommended",
  env: {
    es6: true,
    "jest/globals": true
  },
  globals: {
    // window: 'writable', // readonly | writable
    // global: 'writable'
  },
  plugins: ["jest"],
  rules: { // error | warn | off
    "indent": ["error", 2, { "SwitchCase": 1, "MemberExpression": 0 }],
    "func-names": "off",
    "no-void": "off",
    "no-param-reassign": "off",
    "arrow-body-style": "off",
    "import/prefer-default-export": "off",
    "prefer-spread": "off",
    "arrow-parens": "off",
    "prefer-const": "off",
    "prefer-template": "off",
    "no-unused-expressions": ["error", { "allowShortCircuit": true, "allowTernary": true }],
    "default-case": "off",
    "no-plusplus": "off",
    "comma-dangle": "off",
    "no-unused-vars": ["error", { "vars": "local", "args": "none", "ignoreRestSiblings": true }],
    "no-throw-literal": "off",
    "newline-per-chained-call": "off"
  }
};
