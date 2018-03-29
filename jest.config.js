module.exports = {
  setupFiles: [
    'raf/polyfill',
    'jest-context/setup',
    '<rootDir>/conf/jest.setup.js',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/conf/__mocks__/styleMock.js', // 'identity-obj-proxy', // for CSS Modules
    '\\.(jpe?g|png|gif|woff2?|[ot]tf|eot|svg)$':
      '<rootDir>/conf/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  collectCoverageFrom: ['src/**/*.js', '!**/node_modules/**'],
}
