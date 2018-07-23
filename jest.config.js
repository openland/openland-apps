module.exports = {
    testEnvironment: 'jsdom',
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
    testRegex: '.*\\.spec\\.tsx?$',
    testPathIgnorePatterns: ['/node_modules/'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'packages/**/*.{ts,tsx,js,jsx}',
        '!packages/**/*.d.ts',
    ],
    moduleDirectories: [
        '.',
        'packages',
        'packages/openland-x-utils',
        'packages/openland-x',
        'node_modules'
    ],
    snapshotSerializers: [
        "jest-glamor-react"
    ],
    moduleNameMapper: {

        //
        // WARNING: ORDER MATTERS
        //
        'openland-y-utils/(.*)': '<rootDir>/packages/y-utils/$1',
        'openland-y-utils': '<rootDir>/packages/y-utils',
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
        'openland-x-config/(.*)': '<rootDir>/packages/openland-x-config/$1',
        'openland-x-config': '<rootDir>/packages/openland-x-config',
        'openland-x/(.*)': '<rootDir>/packages/openland-x/$1',
        'openland-x': '<rootDir>/packages/openland-x',
    },
};