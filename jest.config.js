const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  displayName: 'dockhub-server-tests',
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: false,
  collectCoverage: false,
  silent: false,
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  detectOpenHandles: true,
  forceExit: true,
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};
