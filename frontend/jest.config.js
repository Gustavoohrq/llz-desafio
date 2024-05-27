export default {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js|jsx)', '**/?(*.)+(spec|test).+(ts|tsx|js|jsx)'], 
  testEnvironment: "jsdom",
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest', 
  },
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/utils/fileMock.ts",
    '\\.(css|scss)$': 'identity-obj-proxy', 
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], 
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/index.tsx', 
    '<rootDir>/src/setupTests.ts', 
  ],
};
