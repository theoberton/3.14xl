/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export const preset = 'ts-jest';
export const testEnvironment = 'node';
export const testPathIgnorePatterns = ['/node_modules/', '/dist/'];
export const maxWorkers = 1;
