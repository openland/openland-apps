import '../../globals';
import * as React from 'react';
import * as Cookie from 'js-cookie';
import Error from 'next/error';
import * as auth0 from 'auth0-js';
import createHistory from 'history/createBrowserHistory';
import { API_AUTH_ENDPOINT } from '../../utils/endpoint';
import { withData } from '../../utils/withData';

interface AuthResult {
    expiresIn: number;
    accessToken: string;
    idToken: string;
}

class AuthenticationHandler extends React.Component<{}, { error: boolean }> {

    constructor(props: {}) {
        super(props);
        this.state = { error: false };
    }

    componentDidMount() {
        this.completeAuth().then((v) => {
            // Do nothing
        }).catch((e) => {
            this.setState({ error: true });
        });
    }

    async completeAuth() {
        let auth = await this.retreiveAuthentication();
        var uploaded = await fetch(API_AUTH_ENDPOINT, {
            method: 'POST',
            headers: [
                ['authorization', 'Bearer ' + auth.idToken],
                ['x-openland-access-token', auth.accessToken]
            ]
        });
        if (uploaded.ok) {
            let body = (await uploaded.json()) as { ok: boolean, token: string }
            console.warn(auth.expiresIn);
            Cookie.remove('statecraft-key');
            Cookie.set('x-openland-token', body.token);
            let path = localStorage.getItem('redirect_path') || '/';
            console.warn(path);
            createHistory({
                forceRefresh: true
            }).replace(path);
        } else {
            throw 'Error';
        }
    }

    render() {
        if (this.state.error) {
            return <Error statusCode={500} />;
        } else {
            return <div />;
        }
    }

    private async retreiveAuthentication() {
        let auth = new auth0.WebAuth({
            domain: 'auth.openland.com',
            clientID: 'v3R2Rr6D4LzzcWKHf91jwKJyDnEm4L96',
            redirectUri: window.location.origin + '/auth/complete',
            audience: 'https://statecraft.auth0.com/userinfo',
            responseType: 'token id_token',
            scope: 'openid profile email'
        });
        return new Promise<AuthResult>((resolve, reject) => {
            auth.parseHash((err, authResult: AuthResult) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(authResult);
                }
            });
        });
    }
}

export default withData(AuthenticationHandler)