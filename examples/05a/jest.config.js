const defaults = require('../../jest.config')

module.exports = {
  ...defaults,
  setupFiles: ['<rootDir>/jest.setup.js'],
  snapshotSerializers: [
    'snapshot-diff/serializer',
    'enzyme-to-json/serializer',
  ],
}
