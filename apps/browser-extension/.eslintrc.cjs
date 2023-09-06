module.exports = {
  root: true,
  extends: ["custom/next"],
  rules:{
    "no-unused-vars": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    'import/no-unresolved': 'off',
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "import/no-extraneous-dependencies": "off",
    "no-console": 'warn',
  }
};
