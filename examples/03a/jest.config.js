const defaults = require('../../jest.config')

module.exports = {
  ...defaults,
  setupFiles: ['<rootDir>/jest.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
}
