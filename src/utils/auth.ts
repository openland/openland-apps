import { canUseDOM } from './environment';
import * as Cookie from 'js-cookie';

//
// Token Loading
//

export function getClientToken() {
    return Cookie.get('statecraft-key');
}

export function getServerToken(context: any) {
    if (context.headers.cookie) {
        let cookie = context.headers.cookie as string;
        let rk = cookie.split(';').find((c: string) => c.trim().startsWith('statecraft-key='));
        if (rk) {
            return rk.split('=')[1];
        } else {
            return undefined;
        }
    } else {
        return undefined;
    }
}

export function getToken(context: any) {
    if (canUseDOM) {
        return getClientToken();
    } else {
        return getServerToken(context);
    }
}