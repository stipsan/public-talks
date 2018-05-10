const withTranspilation = require('@weco/next-plugin-transpile-modules')
const withoutJest = require('next-without-jest')()
module.exports = withoutJest(
  withTranspilation({
    transpileModules: ['shared'],
  })
)
