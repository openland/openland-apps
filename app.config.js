const build = parseInt(process.env.BUILD_COUNTER || '1', 10);
let runtimeVersion = require('./packages/openland-mobile/version.json').runtimeVersion;
let internalVersion = runtimeVersion + '.' + build;
if (process.env.RELEASE_CHANNEL === 'staging') {
    internalVersion = '999.' + build;
}

export default {
    name: 'Openland',
    displayName: 'Openland',
    expo: {
        name: 'Openland',
        owner: 'openland',
        slug: 'Openland',
        sdkVersion: '40.0.0',
        runtimeVersion,
        version: internalVersion,
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