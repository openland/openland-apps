import * as auth0 from 'auth0-js';

export function createAuth0Client() {
    return new auth0.WebAuth({
        domain: 'auth.openland.com',
        clientID: 'v3R2Rr6D4LzzcWKHf91jwKJyDnEm4L96',
        redirectUri: window.location.origin + '/auth/complete',
        audience: 'https://auth.openland.com/userinfo',
        responseType: 'token id_token',
        scope: 'openid profile email'
    });
}

// export function createAuth0Passwordless() {
//     return new auth0.Auth0LockPasswordless()
// }

export function startAuthGoogle(redirect?: string | null) {
    if (redirect) {
        localStorage.setItem('redirect_path', redirect);
    } else {
        localStorage.removeItem('redirect_path');
    }
    createAuth0Client().authorize({ connection: 'google-oauth2' });
}

export function startEmailAuth(redirect?: string | null) {
    if (redirect) {
        localStorage.setItem('redirect_path', redirect);
    } else {
        localStorage.removeItem('redirect_path');
    }
    createAuth0Client().authorize({ connection: 'email' });
}