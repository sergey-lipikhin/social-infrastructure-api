module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    '@mate-academy/eslint-config-react-typescript',
    '@mate-academy/eslint-config',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: [
      './apps/*/tsconfig.json',
      './packages/*/tsconfig.json',
    ],
  },
  plugins: ['@typescript-eslint'],
  settings: {
    react: {
      version: "18.2.0",
    }
  },
  ignorePatterns: [
    "node_modules",
    "dist",
    "build",
    "coverage",
    "*.log"
  ],
  rules: {
    "no-unused-vars": "off",
    'no-shadow': 'off',
    "@typescript-eslint/space-before-function-paren": "off",
    "import/no-extraneous-dependencies": "off",
  },
};
