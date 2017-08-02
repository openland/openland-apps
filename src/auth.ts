import auth0 from 'auth0-js';
import history from './history';

var auth = new auth0.WebAuth({
    domain: 'statecraft.auth0.com',
    clientID: 'na0Pvis7KTzZWtzcIFT8MzIxtdpiLZc3',
    redirectUri: window.location.origin + '/auth_complete',
    audience: 'https://statecraft.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
});

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

function setSession(authResult: { expiresIn: number, accessToken: string, idToken: string }) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/');
}

export function handleAuthentication() {
    auth.parseHash((err, authResult: { expiresIn: number, accessToken: string, idToken: string }) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
            setSession(authResult);
            history.replace('/');
        } else if (err) {
            history.replace('/');
        }
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