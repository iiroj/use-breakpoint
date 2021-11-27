module.exports = {
  collectCoverage: true,
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc-node/jest'],
  },
}
