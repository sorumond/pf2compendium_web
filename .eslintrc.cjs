module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    quotes: ["error", "single"],
    "no-console": "off",
    "no-restricted-syntax": [
      "error",
      {
        "selector": "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        "message": "Unexpected property on console object was called"
      }
    ],
    "@typescript-eslint/no-unused-vars": ["off"],
    "@typescript-eslint/no-empty-interface": [
      "error",
      {
        "allowSingleExtends": true
      }
    ],
    "@typescript-eslint/no-inferrable-types": [
      "warn",
      {
        "ignoreParameters": true,
        "ignoreProperties": true
      }
    ],
    "@typescript-eslint/no-empty-function": ["off"],
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/semi": ["error"],
    "no-empty-function": "off",
    "eqeqeq": "off",
    "comma-dangle": ["error", "never"],
    "sonarjs/cognitive-complexity": ["off"]
  },
}
