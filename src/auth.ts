import auth0 from 'auth0-js';
import createHistory from 'history/createBrowserHistory';

export interface AuthResult {
    expiresIn: number;
    accessToken: string;
    idToken: string;
}

const auth = new auth0.WebAuth({
    domain: 'statecraft.auth0.com',
    clientID: 'na0Pvis7KTzZWtzcIFT8MzIxtdpiLZc3',
    redirectUri: window.location.origin + '/auth_complete',
    audience: 'https://statecraft.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile email'
});

const history = createHistory({
    forceRefresh: true
});

export function authorizationHeader() {
    if (isAuthenticated()) {
        var res = localStorage.getItem('id_token');
        return 'Bearer ' + res;
    } else {
        return null;
    }
}

export function headers(): { authorization?: string } {
    if (isAuthenticated()) {
        var res = localStorage.getItem('id_token');
        return { authorization: 'Bearer ' + res };
    } else {
        return {};
    }
}

export function token(): string {
    var res = localStorage.getItem('id_token');
    if (res == null) {
        return '';
    } else {
        return res;
    }
}

export function completeAuthentication(authResult: AuthResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/');
}

export async function parseAuth() {
    return new Promise<AuthResult>((resolver, errorres) => {
        auth.parseHash((err, authResult: { expiresIn: number, accessToken: string, idToken: string }) => {
            if (err != null) {
                errorres(err);
            } else {
                resolver({
                    expiresIn: authResult.expiresIn,
                    accessToken: authResult.accessToken,
                    idToken: authResult.idToken
                });
            }
        });
    });
}

export function login() {
    auth.authorize({});
}

export function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    history.replace('/');
}

export function isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at')!);
    return new Date().getTime() < expiresAt;
}