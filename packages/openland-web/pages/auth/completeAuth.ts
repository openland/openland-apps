import * as Cookie from 'js-cookie';
import { advanceGeneration } from '../../storage/generation';
import createHistory from 'history/createBrowserHistory';
import { redirectSuffix } from '../root/router/redirectSuffix';

export const completeAuth = (token: string, profileExist: boolean) => {
    let path = '/';
    if (Cookie.get('x-signin-redirect')) {
        path = '/' + Cookie.get('x-signin-redirect');
    }
    if (Cookie.get('x-openland-org-invite')) {
        path = '/join/' + Cookie.get('x-openland-org-invite');
    }
    if (Cookie.get('x-openland-invite')) {
        path = '/invite/' + Cookie.get('x-openland-invite');
    }
    if (!profileExist) {
        const oldPath = path;
        path = '/createProfile' + redirectSuffix(oldPath);
    }
    Cookie.remove('x-openland-org', { path: '/' });
    Cookie.remove('x-openland-invite', { path: '/' });
    Cookie.remove('x-openland-org-invite', { path: '/' });
    Cookie.remove('x-openland-app-invite', { path: '/' });
    Cookie.remove('x-signin-redirect', { path: '/' });
    Cookie.set('x-openland-token', token, {
        path: '/',
        expires: 180,
    });
    localStorage.removeItem('authSession');
    advanceGeneration();

    createHistory({
        forceRefresh: true,
    }).replace(path);
};
