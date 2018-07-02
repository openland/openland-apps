import { Config } from './Config';

export function saveConfig(config: Config) {
    let res = `window.__APP_CONFIG=${JSON.stringify(config)};`;
    if (config.uploadcareKey) {
        res += 'UPLOADCARE_PUBLIC_KEY = \'' + config.uploadcareKey + '\';';
    }
    return res;
}

export function loadConfig() {
    return (window as any).__APP_CONFIG as Config;
}