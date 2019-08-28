module.exports = {
  extends: "airbnb-base",
  // extends: "eslint:recommended",
  env: {
    es6: true
  },
  globals: {
    // window: 'writable', // readonly | writable
    // global: 'writable'
  },
  rules: { // error | warn | off
    "indent": ["error", 2],
    "func-names": "off",
    "no-void": "off",
    "no-param-reassign": "off",
    "arrow-body-style": "off",
    "import/prefer-default-export": "off",
    "prefer-spread": "off"
  }
};
