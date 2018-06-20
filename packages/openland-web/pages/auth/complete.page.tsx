import '../init';
import '../../globals';
import * as React from 'react';
import * as Cookie from 'js-cookie';
import Error from 'next/error';
import createHistory from 'history/createBrowserHistory';
import { API_AUTH_ENDPOINT } from 'openland-x-graphql/endpoint';
import { createAuth0Client } from 'openland-x-graphql/Auth0Client';
import { withData } from '../../components/withData';
import fetch from 'isomorphic-unfetch';
interface AuthResult {
    expiresIn: number;
    accessToken: string;
    idToken: string;
    state: string;
    appState: string | null;
    idTokenPayload?: { sub: string };
}

class AuthenticationHandler extends React.Component<{}, { error: boolean }> {

    constructor(props: {}) {
        super(props);
        this.state = { error: false };
    }

    componentDidMount() {
        this.completeAuth().then((v) => {
            console.warn('complete:v');
            // Do nothing
        }).catch((e) => {
            console.warn(e);
            this.setState({ error: true });
        });
    }

    async completeAuth() {
        let auth = await this.retreiveAuthentication();
        var uploaded = await fetch(API_AUTH_ENDPOINT, {
            method: 'POST',
            headers: {
                'authorization': 'Bearer ' + auth.idToken,
                'x-openland-access-token': auth.accessToken
            }
        });
        if (uploaded.ok) {
            let body = (await uploaded.json()) as { ok: boolean, token: string };
            Cookie.remove('statecraft-key');
            Cookie.remove('x-openland-org');
            Cookie.set('x-openland-token', body.token);
            let path = auth.state !== 'none' ? auth.state : '/';
            if (auth.idTokenPayload && auth.idTokenPayload.sub && auth.idTokenPayload.sub.startsWith('email|')) {
                path = '/';
            }
            createHistory({
                forceRefresh: true
            }).replace(path);
        } else {
            console.warn(uploaded);
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
        return new Promise<AuthResult>((resolve, reject) => {
            createAuth0Client().parseHash((err, authResult: AuthResult) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(authResult);
                }
            });
        });
    }
}

export default withData('Auth Complete', AuthenticationHandler);