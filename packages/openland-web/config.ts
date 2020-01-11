import { Config } from 'openland-x-config/Config';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { loadConfig } from 'openland-x-config';

let cachedConfig: Config | undefined;

export function buildConfig() {
    if (!cachedConfig) {
        let config: Config = {
            env: process.env.APP_ENVIRONMENT === 'prod' ? 'production' : (process.env.APP_ENVIRONMENT || 'dev')
        };
        config.uploadcareKey = 'b70227616b5eac21ba88';
        config.release = process.env.RELEASE_ID || 'development';
        config.webSocketEndpoint = process.env.API_WS_ENDPOINT;
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
