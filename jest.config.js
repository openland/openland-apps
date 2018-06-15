module.exports = {
    testEnvironment: 'node',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node'
    ],
    testRegex: '.*\\.spec\\.(ts)x?$',
    testPathIgnorePatterns: ['/node_modules/'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'packages/**/*.{ts,tsx,js,jsx}',
        '!packages/**/*.d.ts',
    ],
    moduleNameMapper: {

        //
        // WARNING: ORDER MATTERS
        //
        'openland-api/(.*)': '<rootDir>/packages/openland-api/$1',
        'openland-api': '<rootDir>/packages/openland-api',
        'openland-text/(.*)': '<rootDir>/packages/openland-text/$1',
        'openland-text': '<rootDir>/packages/openland-text',
        'openland-x/(.*)': '<rootDir>/packages/openland-x/$1',
        'openland-x': '<rootDir>/packages/openland-x',
        'openland-x-routing/(.*)': '<rootDir>/packages/openland-x-routing/$1',
        'openland-x-routing': '<rootDir>/packages/openland-x-routing',
        'openland-x-utils/(.*)': '<rootDir>/packages/openland-x-utils/$1',
        'openland-x-utils': '<rootDir>/packages/openland-x-utils',
        'openland-x-format/(.*)': '<rootDir>/packages/openland-x-format/$1',
        'openland-x-format': '<rootDir>/packages/openland-x-format',
        'openland-x-map/(.*)': '<rootDir>/packages/openland-x-map/$1',
        'openland-x-map': '<rootDir>/packages/openland-x-map',
        'openland-x-charts/(.*)': '<rootDir>/packages/openland-x-charts/$1',
        'openland-x-charts': '<rootDir>/packages/openland-x-charts',
        'openland-x-modal/(.*)': '<rootDir>/packages/openland-x-modal/$1',
        'openland-x-modal': '<rootDir>/packages/openland-x-modal',
        'openland-x-forms/(.*)': '<rootDir>/packages/openland-x-forms/$1',
        'openland-x-forms': '<rootDir>/packages/openland-x-forms',
        'openland-x-layout/(.*)': '<rootDir>/packages/openland-x-layout/$1',
        'openland-x-layout': '<rootDir>/packages/openland-x-layout',
        'openland-x-permissions/(.*)': '<rootDir>/packages/openland-x-permissions/$1',
        'openland-x-permissions': '<rootDir>/packages/openland-x-permissions',
        'openland-x-graphql/(.*)': '<rootDir>/packages/openland-x-graphql/$1',
        'openland-x-graphql': '<rootDir>/packages/openland-x-graphql',
        'openland-x-analytics/(.*)': '<rootDir>/packages/openland-x-analytics/$1',
        'openland-x-analytics': '<rootDir>/packages/openland-x-analytics',
        'openland-x-store/(.*)': '<rootDir>/packages/openland-x-store/$1',
        'openland-x-store': '<rootDir>/packages/openland-x-store',
        'openland-x-graphql-gen/(.*)': '<rootDir>/packages/openland-x-graphql-gen/$1',
        'openland-x-graphql-gen': '<rootDir>/packages/openland-x-graphql-gen',
    },
};