/* eslint-disable no-undef */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	maxWorkers: 1,
};
