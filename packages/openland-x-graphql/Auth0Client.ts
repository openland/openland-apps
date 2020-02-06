import * as auth0 from 'auth0-js';

export function createAuth0Client() {
    return new auth0.WebAuth({
        domain: 'auth.openland.com',
        clientID: 'v3R2Rr6D4LzzcWKHf91jwKJyDnEm4L96',
        redirectUri: window.location.origin + '/auth/complete',
        audience: 'https://statecraft.auth0.com/userinfo',
        responseType: 'token id_token',
        scope: 'openid profile email'
    });
}