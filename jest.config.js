module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/mocks/styleMock.js',
  },
};