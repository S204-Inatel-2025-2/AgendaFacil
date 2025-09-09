// usando ES Modules
export default {
  testEnvironment: "jest-environment-jsdom",
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // transpila TSX/JSX
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};


