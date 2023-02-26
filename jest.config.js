/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require('path');
const { register } = require('ts-node');
register(require('./tsconfig.json'));

module.exports = {
  globals: {
    context: {},
  },
  transform: {
    '^.+\\.(ts|js)x?$': ['@swc/jest'],
  },
  testMatch: ['**/?(*.)spec.[jt]s', '**/?(*.)spec.[jt]sx'],
  testTimeout: 10000,
  testPathIgnorePatterns: ['dist', 'node_modules', 'public'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node', 'jsx', 'tsx'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(png|svg|pdf|jpg|jpeg)$': '<rootDir>/file-mock.js',
  },
  verbose: true,
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  setupFilesAfterEnv: [join(__dirname, './jest.extensions.ts')],
};
