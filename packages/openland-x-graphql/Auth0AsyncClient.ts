import { backoff } from 'openland-y-utils/timer';

export async function createAuth0AsyncClient() {
    let auth0 = await backoff(async () => await import('auth0-js'));
    return new auth0.WebAuth({
        domain: 'auth.openland.com',
        clientID: 'v3R2Rr6D4LzzcWKHf91jwKJyDnEm4L96',
        redirectUri: window.location.origin + '/auth/complete',
        audience: 'https://auth.openland.com/userinfo',
        responseType: 'token id_token',
        scope: 'openid profile email'
    });
}
