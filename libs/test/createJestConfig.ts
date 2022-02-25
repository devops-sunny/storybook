import * as path from 'path';

export function createJestConfig(clientDir: string) {
  const rootDir = path.resolve(__dirname, '..', '..');
  const clientRelativeDir = path.relative(rootDir, clientDir);

  return {
    rootDir,
    setupFilesAfterEnv: [`<rootDir>/${clientRelativeDir}/jest.setup.ts`],
    transform: {
      '.(ts|tsx)': 'ts-jest',
    },
    testMatch: [
      `<rootDir>/${clientRelativeDir}/src/**/__tests__/**/*.{js,jsx,ts,tsx}`,
      `<rootDir>/${clientRelativeDir}/src/**/*.{spec,test}.{js,jsx,ts,tsx}`,
    ],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
      '@bb/common(.*)$': ['<rootDir>/libs/common/$1'],
      '@bb/marquee(.*)$': ['<rootDir>/clients/marquee/src/$1'],
      '@bb/order(.*)$': ['<rootDir>/clients/order/src/$1'],
      '@bb/pickup(.*)$': ['<rootDir>/clients/pickup/src/$1'],
    },
  };
}
