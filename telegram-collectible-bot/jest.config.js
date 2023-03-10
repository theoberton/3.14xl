process.env.NODE_ENV = "UNITTEST";

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["./src/**/*.ts"],
  moduleDirectories: ["node_modules", "src"],
  coverageDirectory: "<rootDir>/test/coverage",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  preset: "ts-jest",
};

