module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    // Turn off certain typescript-eslint rules
    '@typescript-eslint/no-unused-vars': 0, // This is enabled in our tsconfig file becuase the lint doens't support JSX usage
    '@typescript-eslint/array-type': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/prefer-interface': 0,
    '@typescript-eslint/prefer-namespace-keyword': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-parameter-properties': 0,
    // https://github.com/typescript-eslint/typescript-eslint/issues/249
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-object-literal-type-assertion': 0,
    '@typescript-eslint/indent': 0,

    // Override certain typescript-eslint rules
    '@typescript-eslint/member-delimiter-style': [
      2,
      {
        multiline: {
          delimiter: 'none',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      2,
      {
        accessibility: 'no-public',
        overrides: {parameterProperties: 'explicit'},
      },
    ],
    '@typescript-eslint/interface-name-prefix': [2, 'always'],

    // Turn on the prettier rules
    'prettier/prettier': 'error',
    // This is a weird one and needs to be duped here and .prettierrc
    // https://github.com/prettier/eslint-config-prettier#max-len
    'max-len': [
      2,
      {
        code: 140,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
}
