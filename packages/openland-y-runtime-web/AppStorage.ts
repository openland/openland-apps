import { AppStorageApi } from "openland-y-runtime-api/AppStorageApi";
import { canUseDOM } from 'openland-x-utils/canUseDOM';

class AppStorageImpl implements AppStorageApi {
    async readKey(key: string) {
        if (!canUseDOM) {
            throw Error('');
        }
        let res = localStorage.getItem(key);
        if (res) {
            return JSON.parse(res);
        } else {
            return undefined;
        }
    }
    async writeKey(key: string, value: any) {
        if (!canUseDOM) {
            throw Error('');
        }
        if (value) {
            await localStorage.setItem(key, JSON.stringify(value));
        } else {
            await localStorage.removeItem(key);
        }
    };
}

export const AppStorage = new AppStorageImpl();