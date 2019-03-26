import { AsyncStorage } from 'react-native';
import uuid from 'uuid/v4';

class AppStorageStatic {

    private started: boolean = false;
    private inited = false
    private initPromise!: Promise<void>
    private _token?: string;
    private _storage?: string;

    get token(): string | undefined {
        if (!this.inited) {
            throw Error('AppStorage not inited');
        }
        return this._token;
    }

    get storage(): string {
        if (!this.inited) {
            throw Error('AppStorage not inited');
        }
        return this._storage!;
    }

    prepare = async () => {
        if (!this.started) {
            this.initPromise = this.doPrepare()
        }
        await this.initPromise
    }

    resetToken = async () => {
        if (!this.inited) {
            throw Error('AppStorage not inited');
        }
        await AsyncStorage.multiRemove(['openland-token', 'openland-storage'])
        this._token = undefined;
        this._storage = undefined;
    }

    setToken = async (token: string) => {
        if (!this.inited) {
            throw Error('AppStorage not inited');
        }
        let storage = uuid();
        this._token = token;
        this._storage = storage;
        await AsyncStorage.multiSet([
            ['openland-token', token],
            ['openland-storage', storage]
        ])
    }

    private doPrepare = async () => {
        this._token = await AsyncStorage.getItem('openland-token');
        if (this._token) {
            let storageKey = await AsyncStorage.getItem('openland-storage');
            if (!storageKey) {
                storageKey = uuid();
                await AsyncStorage.setItem('openland-storage', storageKey);
            }
            this._storage = storageKey;
        }
        this.inited = true;
    }
}

export const AppStorage = new AppStorageStatic();