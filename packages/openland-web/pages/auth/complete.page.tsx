import * as React from 'react';
import * as Cookie from 'js-cookie';
import createHistory from 'history/createBrowserHistory';
import { AUTH_ENDPOINT } from 'openland-api/endpoint';
import { ErrorPage } from '../root/ErrorPage';
import { trackError } from 'openland-x-analytics';
import { createAuth0Client } from 'openland-x-graphql/Auth0Client';
interface AuthResult {
    expiresIn: number;
    accessToken: string;
    idToken: string;
    state: string;
    appState: string | null;
    idTokenPayload?: { sub: string };
}

export const completeAuth = (token: string) => {
    Cookie.remove('statecraft-key');
    Cookie.remove('x-openland-org', { path: '/' });
    Cookie.set('x-openland-token', token, {
        path: '/',
        expires: 180,
    });
    let path = Cookie.get('sign-redirect') || '/';
    Cookie.remove('sign-redirect', { path: '/' });
    localStorage.removeItem('authSession');
    createHistory({
        forceRefresh: true,
    }).replace(path);
};

export default class AuthenticationHandler extends React.Component<{}, { error: boolean }> {
    constructor(props: {}) {
        super(props);
        this.state = { error: false };
    }

    componentDidMount() {
        this.completeAuth()
            .then(v => {
                console.warn('complete:v');
                // Do nothing
            })
            .catch(e => {
                console.warn(e);
                trackError(e);
                this.setState({ error: true });
            });
    }

    async completeAuth() {
        let auth = await this.retreiveAuthentication();
        var uploaded = await fetch(AUTH_ENDPOINT, {
            method: 'POST',
            headers: {
                authorization: 'Bearer ' + auth.idToken,
                'x-openland-access-token': auth.accessToken,
            },
        });

        if (uploaded.ok) {
            let body = (await uploaded.json()) as {
                ok: boolean;
                token: string;
            };
            Cookie.remove('statecraft-key');
            Cookie.remove('x-openland-org', { path: '/' });
            Cookie.set('x-openland-token', body.token, {
                path: '/',
                expires: 180,
            });
            let path = auth.state !== 'none' ? auth.state : '/';
            if (
                auth.idTokenPayload &&
                auth.idTokenPayload.sub &&
                auth.idTokenPayload.sub.startsWith('email|')
            ) {
                path = '/';
            }
            path = Cookie.get('sign-redirect') || path;
            Cookie.remove('sign-redirect', { path: '/' });

            createHistory({
                forceRefresh: true,
            }).replace(path);
        } else {
            trackError(JSON.stringify(uploaded));
            console.warn(uploaded);
            throw 'Error';
        }
    }

    render() {
        if (this.state.error) {
            return <ErrorPage statusCode={500} />;
        } else {
            return <div />;
        }
    }

    private async retreiveAuthentication() {
        return new Promise<AuthResult>(async (resolve, reject) => {
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
