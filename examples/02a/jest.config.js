const defaults = require('../../jest.config')

module.exports = {
  ...defaults,
  setupFiles: ['<rootDir>/jest.setup.js'],
}
