import { AppStorageApi } from "openland-y-runtime-api/AppStorageApi";
import { AsyncStorage } from 'react-native';

class AppStorageImpl implements AppStorageApi {
    async readKey<T>(key: string) {
        let res = await AsyncStorage.getItem(key);
        if (res) {
            try {
                return JSON.parse(res) as T;
            } catch (e) {
                console.warn('Could not parse item from AsyncStorage:', e);
                return undefined;
            }
        } else {
            return undefined;
        }
    }
    async writeKey<T>(key: string, value: T) {
        if (value) {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } else {
            await AsyncStorage.removeItem(key);
        }
    }
}

export const AppStorage = new AppStorageImpl();