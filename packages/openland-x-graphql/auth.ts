import * as Cookie from 'js-cookie';
import { canUseDOM } from 'openland-x-utils/canUseDOM';

//
// Token Loading
//

export function getClientToken() {
    return Cookie.get('x-openland-token');
}

export function getServerToken(context: any) {
    if (context.headers.cookie) {
        let cookie = context.headers.cookie as string;
        let rk = cookie.split(';').find((c: string) => c.trim().startsWith('x-openland-token='));
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