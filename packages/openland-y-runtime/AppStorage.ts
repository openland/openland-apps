import { AppStorageApi } from "openland-y-runtime-api/AppStorageApi";

class AppStorageImpl implements AppStorageApi {
    async readKey<T>(key: string) {
        throw Error('');
        return null; // WTF, TS?
    }
    async writeKey<T>(key: string, value: T | null | undefined) {
        throw Error('');
    };
}

export const AppStorage = new AppStorageImpl();