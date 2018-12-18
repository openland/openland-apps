import { Config } from 'openland-x-config/Config';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { loadConfig } from 'openland-x-config';

let cachedConfig: Config | undefined;

export function buildConfig() {
    if (!cachedConfig) {
        let config: Config = {};
        config.uploadcareKey = 'b70227616b5eac21ba88';
        config.release = process.env.RELEASE_ID || 'development';
        config.webSocketEndpoint = process.env.API_WS_ENDPOINT;
        if (process.env.APP_ENVIRONMENT === 'prod') {
            config.sentryEndpoint = 'https://901e16cbc9cb4167953709af468b3306@sentry.io/1236211';
            config.mixpanelKey = '1cd91d607bef005d48954609f7ddd9a0';
        } else if (process.env.APP_ENVIRONMENT === 'next') {
            config.sentryEndpoint = 'https://d128574cb17d4a909130cc707b37c57b@sentry.io/1236309';
            config.mixpanelKey = 'db58e425bc16c166431859e7a8bb758a';
        }
        cachedConfig = config;
    }
    return cachedConfig!;
}

export function getConfig() {
    if (canUseDOM) {
        return loadConfig();
    } else {
        return buildConfig();
    }
}
