// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow optionalDependencies
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // A maximum line length
    'max-len': ["error", 200],
    'no-multiple-empty-lines': ["error", { "max": 2, "maxEOF": 2 }],

    // Turn off rules for more flexibility
    'eqeqeq': 0,
    'padded-blocks': 0,
    'guard-for-in': 0,
    'no-trailing-spaces': 0,
    'no-plusplus': 0,
    'no-continue': 0,
    'one-var': 0,
    'one-var-declaration-per-line': 0,
    'func-names': 0,
    'object-curly-spacing': 0,
    'class-methods-use-this': 0,
    'no-fallthrough': 0,
    'no-console': 0,
    'no-unused-vars': 0,
    'linebreak-style': 0,
    'import/newline-after-import': 0,
  }
}
