/* eslint-disable @typescript-eslint/no-var-requires */
require('@testing-library/jest-dom');

global.fetch = require('cross-fetch').default;

const { toHaveNoViolations } = require('jest-axe');
expect.extend(toHaveNoViolations);
