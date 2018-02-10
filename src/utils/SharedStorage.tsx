import * as Cookie from 'js-cookie';
import { canUseDOM } from './environment';

export interface SharedStorage {
    readValue(key: string): string | null;
    writeValue(key: string, value: string | null, expires?: number): void;
}

class SharedClientStorage implements SharedStorage {

    private predefined = new Map<string, string>();

    constructor() {
        this.predefined.set('host', window.location.host);
        this.predefined.set('protocol', window.location.protocol.replace(':', ''));
    }

    readValue(key: string) {
        if (this.predefined.has(key)) {
            return this.predefined.get(key)!!;
        }

        let res = Cookie.get('statecraft-' + key);
        if (res) {
            return res;
        } else {
            return null;
        }
    }

    writeValue(key: string, value: string | null, expires?: number) {
        if (value) {
            if (expires) {
                Cookie.set('statecraft-' + key, value, { expires: expires / (24 * 60.0 * 60.0) });
            } else {
                Cookie.set('statecraft-' + key, value);
            }
        } else {
            Cookie.remove('statecraft-' + key);
        }
    }
}

class SharedServerStorage implements SharedStorage {
    private values = new Map<string, string>();

    constructor(ctx: any) {

        this.values.set('host', ctx.req.get('host'));
        this.values.set('protocol', ctx.req.protocol);

        let cookie = ctx.headers.cookie as string;
        let keys = cookie.split(';').filter((c: string) => c.trim().startsWith('statecraft-'));
        for (let k of keys) {
            k = k.substring('statecraft-'.length);
            let parts = k.split('=', 2);
            this.values.set(parts[0], parts[1]);
        }
    }

    readValue(key: string) {
        if (this.values.has(key)) {
            return this.values.get(key)!!;
        } else {
            return null;
        }
    }

    writeValue(key: string, value: string | null, expires?: number) {
        throw Error('Writing to Shared Storage on server side is not supported yet');
    }
}

export function getClientStorage(): SharedStorage {
    if (canUseDOM) {
        return new SharedClientStorage();
    } else {
        throw Error('You can\'t use Client Storage on the server side')
    }
}

export function getServerStorage(ctx: any): SharedStorage {
    if (canUseDOM) {
        throw Error('You can\'t use Server Storage on the client side')
    } else {
        return new SharedServerStorage(ctx);
    }
}

export function getStorage(ctx: any) {
    if (canUseDOM) {
        return getClientStorage();
    } else {
        return getServerStorage(ctx);
    }
}