/* eslint-disable @typescript-eslint/no-var-requires */
import 'whatwg-fetch';
import { mockServer } from './src/mocks';

require('@testing-library/jest-dom');

const { toHaveNoViolations } = require('jest-axe');
expect.extend(toHaveNoViolations);

// Establish API mocking before all tests.
beforeAll(() => {
  jest.resetModules();
  mockServer.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => mockServer.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => mockServer.close());
