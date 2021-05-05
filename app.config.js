const build = parseInt(process.env.BUILD_COUNTER || '1', 10);
const runtimeVersion = require('./packages/openland-mobile/version.json').runtimeVersion;
const internalVersion = packageVersion + '.' + build;
const runtimeVersion = packageVersion;

export default {
    name: 'Openland',
    displayName: 'Openland',
    expo: {
        name: 'Openland',
        owner: 'openland',
        slug: 'Openland',
        sdkVersion: '40.0.0',
        runtimeVersion,
        assetBundlePatterns: [
            "**/*"
        ],
        ios: {
            bundleIdentifier: 'com.openland.app'
        },
        android: {
            package: 'com.openland.app'
        },
        extra: {
            internalVersion,
            runtimeVersion,
            build
        }
    },
}