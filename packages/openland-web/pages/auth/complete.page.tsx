import * as React from 'react';
import * as Cookie from 'js-cookie';
import createHistory from 'history/createBrowserHistory';
import { API_AUTH_ENDPOINT } from 'openland-x-graphql/endpoint';
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

class AuthenticationHandler extends React.Component<{}, { error: boolean }> {
    constructor(props: {}) {
        super(props);
        this.state = { error: false };
    }

    componentDidMount() {
        console.log('1');
        this.completeAuth()
            .then(v => {
                console.log('2');
                console.warn('complete:v');
                // Do nothing
            })
            .catch(e => {
                console.log('3');
                console.warn(e);
                trackError(e);
                this.setState({ error: true });
            });
    }

    async completeAuth() {
        console.log('4');
        let auth = await this.retreiveAuthentication();
        console.log('5');
        var uploaded = await fetch(API_AUTH_ENDPOINT, {
            method: 'POST',
            headers: {
                authorization: 'Bearer ' + auth.idToken,
                'x-openland-access-token': auth.accessToken,
            },
        });
        console.log('6');
        if (uploaded.ok) {
            console.log('7');
            let body = (await uploaded.json()) as {
                ok: boolean;
                token: string;
            };
            console.log('8');
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
            console.log('9');
            createHistory({
                forceRefresh: true,
            }).replace(path);
            console.log('10');
        } else {
            console.log('11');
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
            console.log('12');
            createAuth0Client().parseHash((err, authResult: AuthResult) => {
                console.log('13');
                if (err != null) {
                    console.log('14');
                    reject(err);
                } else {
                    console.log('15');
                    resolve(authResult);
                }
            });
        });
    }
}

export default AuthenticationHandler;
