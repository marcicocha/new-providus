module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'font-family-no-missing-generic-family-keyword': null,
    'at-rule-no-unknown': null,
    'length-zero-no-unit': null,
  },
  ignorePath: './assets/font-awesome',
}
