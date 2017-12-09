import * as React from 'react';
import * as Cookie from 'js-cookie';
import Error from 'next/error';
import * as auth0 from 'auth0-js';
import createHistory from 'history/createBrowserHistory';
import { withPage } from '../../components/withPage';

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
        var uploaded = await fetch(process.env.API_ENDPOINT + '/auth', {
            method: 'POST',
            headers: [
                ['authorization', 'Bearer ' + auth.idToken],
                ['access-token', auth.accessToken]
            ]
        });
        if (uploaded.ok) {
            Cookie.set('statecraft-key', auth.idToken, { expires: auth.expiresIn / (24 * 60.0 * 60.0) });
            createHistory({
                forceRefresh: true
            }).replace('/');
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
            domain: 'statecraft.auth0.com',
            clientID: 'na0Pvis7KTzZWtzcIFT8MzIxtdpiLZc3',
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

export default withPage(AuthenticationHandler);