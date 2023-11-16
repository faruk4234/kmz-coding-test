module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [ 'plugin:react/recommended', 'standard-with-typescript' ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: [ './tsconfig.json' ]
  },
  plugins: [ 'react' ],
  rules: {
    indent: [ 'error', 2, { SwitchCase: 1 }],
    semi: [ 2, 'never' ],
    'max-len': [
      'error',
      200,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }
    ],
    'max-classes-per-file': [ 'error', 1 ],
    'no-underscore-dangle': [ 'error', { allow: [ '_id', '__v', '__t' ] }], // allow use of '_id' property
    'no-use-before-define': [
      'error',
      { functions: true, classes: false, variables: false }
    ],
    'newline-before-return': 2,
    'array-bracket-spacing': [ 'error', 'always', { objectsInArrays: false }],
    'no-multiple-empty-lines': [ 'error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    'react/function-component-definition': 'off',
    radix: 'off',
    'consistent-return': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        caughtErrors: 'all',
        args: 'after-used',
        ignoreRestSiblings: false
      }
    ],

    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          minProperties: 4,
          multiline: true,
          consistent: true
        },
        ObjectPattern: {
          minProperties: 4,
          multiline: true,
          consistent: true
        },
        ImportDeclaration: {
          minProperties: 4,
          multiline: true,
          consistent: true
        },
        ExportDeclaration: {
          minProperties: 4,
          multiline: true,
          consistent: true
        }
      }
    ],

    'react-native/no-unused-styles': 'off', // 2
    'import/order': [
      'error',
      {
        groups: [ 'builtin', 'external', 'internal' ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '*.png',
            group: 'sibling',
            patternOptions: { matchBase: true },
            position: 'after'
          }
        ],
        pathGroupsExcludedImportTypes: [ 'react' ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ]
  }
}
