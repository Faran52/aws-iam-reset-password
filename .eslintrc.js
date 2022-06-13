module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    'no-param-reassign': 'off',
    'no-console': 'off',
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    indent: [
      'error',
      2,
      { SwitchCase: 1 },
    ],
    'max-len': [
      'error', {
        code: 120,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-shadow': ['error'],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          multiline: true,
          minProperties: 3,
        },
        ObjectPattern: { multiline: true },
        ImportDeclaration: { multiline: true },
        ExportDeclaration: {
          minProperties: 3,
          multiline: true,
        },
      },
    ],
    'array-bracket-newline': [
      'error',
      {
        minItems: 3,
        multiline: true,
      },
    ],
    'no-underscore-dangle': [
      'error',
      {
        allow: [
          '_source',
          '_scroll_id',
        ],
      },
    ],
    'import/no-cycle': [
      'error',
      {
        maxDepth: 10,
        ignoreExternal: true,
      },
    ],
  },
};
