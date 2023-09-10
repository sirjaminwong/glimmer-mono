module.exports = {
  root: true,
  extends: ["custom/next"],
  rules: {
    'import/no-unresolved': 'off',
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "no-console": 'warn',
  }
};
