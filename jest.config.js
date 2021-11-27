module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc-node/jest'],
  },
}
