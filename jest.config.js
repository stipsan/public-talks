const path = require('path')

module.exports = {
  // trick just to make the watcher rerun tests if we edit files in /shared
  roots: ['<rootDir>', path.join(__dirname, 'shared')],
  setupTestFrameworkScriptFile: 'jest-styled-components',
  testPathIgnorePatterns: [
    // default setting in jest
    '/node_modules/',
    // our own setting, avoid next build output from being checked for tests
    '/.next/',
  ],
  collectCoverageFrom: [
    '**/*.js',
    // exclude things that shouldn't affect coverage reports
    '!**/*.config.js',
    '!jest.setup.js',
  ],
  coveragePathIgnorePatterns: [
    // default setting in jest
    '/node_modules/',
    // exclude istanbul html reports
    '/coverage/',
  ],
}
