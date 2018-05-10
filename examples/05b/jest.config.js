const defaults = require('../../jest.config')

module.exports = {
  ...defaults,
  snapshotSerializers: ['snapshot-diff/serializer'],
}
