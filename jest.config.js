module.exports = {
    globals: {
        'ts-jest': {
            useBabelrc: true,
            tsConfigFile: './tsconfig.json',
        },
    },
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.svg$': 'jest-svg-transformer',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testResultsProcessor: 'jest-teamcity-reporter',
    testRegex: '.*\\.spec\\.tsx?$',
    testPathIgnorePatterns: ['/node_modules/', '/build/', '/dist/'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['packages/**/*.{ts,tsx,js,jsx}', '!packages/**/*.d.ts'],
    setupTestFrameworkScriptFile: './jestSetup.js',
    moduleDirectories: [
        '.',
        'packages',
        'packages/openland-x-utils',
        'packages/openland-x',
        'node_modules',
    ],
    snapshotSerializers: ['jest-glamor-react'],
    moduleNameMapper: {
        //
        // WARNING: ORDER MATTERS
        //
        'openland-unimoji/(.*)': '<rootDir>/packages/openland-unimoji/$1',
        'openland-unimoji': '<rootDir>/packages/openland-unimoji',
        'openland-unicorn/(.*)': '<rootDir>/packages/openland-unicorn/$1',
        'openland-unicorn': '<rootDir>/packages/openland-unicorn',
        'openland-form/(.*)': '<rootDir>/packages/openland-form/$1',
        'openland-form': '<rootDir>/packages/openland-form',
        'openland-apps/(.*)': '<rootDir>/packages/openland-apps/$1',
        'openland-apps': '<rootDir>/packages/openland-apps',
        'openland-graphql/(.*)': '<rootDir>/packages/openland-graphql/$1',
        'openland-graphql': '<rootDir>/packages/openland-graphql',
        'openland-y-utils/(.*)': '<rootDir>/packages/openland-y-utils/$1',
        'openland-y-utils': '<rootDir>/packages/openland-y-utils',
        'openland-y-runtime-web/(.*)': '<rootDir>/packages/openland-y-runtime-web/$1',
        'openland-y-runtime-web': '<rootDir>/packages/openland-y-runtime-web',
        'openland-y-runtime-api/(.*)': '<rootDir>/packages/openland-y-runtime-api/$1',
        'openland-y-runtime-api': '<rootDir>/packages/openland-y-runtime-api',
        'openland-y-runtime/(.*)': '<rootDir>/packages/openland-y-runtime/$1',
        'openland-y-runtime': '<rootDir>/packages/openland-y-runtime',
        'openland-api/(.*)': '<rootDir>/packages/openland-api/$1',
        'openland-api': '<rootDir>/packages/openland-api',
        'openland-text/(.*)': '<rootDir>/packages/openland-text/$1',
        'openland-text': '<rootDir>/packages/openland-text',
        'openland-x-routing/(.*)': '<rootDir>/packages/openland-x-routing/$1',
        'openland-x-routing': '<rootDir>/packages/openland-x-routing',
        'openland-x-utils/(.*)': '<rootDir>/packages/openland-x-utils/$1',
        'openland-x-utils': '<rootDir>/packages/openland-x-utils',
        'openland-x-forms/(.*)': '<rootDir>/packages/openland-x-forms/$1',
        'openland-x-forms': '<rootDir>/packages/openland-x-forms',
        'openland-x-permissions/(.*)': '<rootDir>/packages/openland-x-permissions/$1',
        'openland-x-permissions': '<rootDir>/packages/openland-x-permissions',
        'openland-x-graphql/(.*)': '<rootDir>/packages/openland-x-graphql/$1',
        'openland-x-graphql': '<rootDir>/packages/openland-x-graphql',
        'openland-x-analytics/(.*)': '<rootDir>/packages/openland-x-analytics/$1',
        'openland-x-analytics': '<rootDir>/packages/openland-x-analytics',
        'openland-y-store/(.*)': '<rootDir>/packages/openland-y-store/$1',
        'openland-y-store': '<rootDir>/packages/openland-y-store',
        'openland-x-graphql-gen/(.*)': '<rootDir>/packages/openland-x-graphql-gen/$1',
        'openland-x-graphql-gen': '<rootDir>/packages/openland-x-graphql-gen',
        'openland-x-config/(.*)': '<rootDir>/packages/openland-x-config/$1',
        'openland-x-config': '<rootDir>/packages/openland-x-config',
        'openland-x/(.*)': '<rootDir>/packages/openland-x/$1',
        'openland-x': '<rootDir>/packages/openland-x',
        'openland-icons/(.*)': '<rootDir>/packages/openland-icons/$1',
        'openland-icons': '<rootDir>/packages/openland-icons',
        'openland-landing/(.*)': '<rootDir>/packages/openland-landing/$1',
        'openland-landing': '<rootDir>/packages/openland-landing',
        'openland-web/(.*)': '<rootDir>/packages/openland-web/$1',
        'openland-web': '<rootDir>/packages/openland-web',
        'openland-video/(.*)': '<rootDir>/packages/openland-video/$1',
        'openland-video': '<rootDir>/packages/openland-video',
    },
};
