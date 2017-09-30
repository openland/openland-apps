import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Loader } from './App/Components/';
import { ApolloProvider } from 'react-apollo';
import * as api from './api';

import * as Auth from './auth';

import App from './App/';
import NotFound from './App/Failures/NotFound';

interface AuthPageProps {
    location: { hash: string };
}

class AuthPage extends React.Component<AuthPageProps, {
    isLoading: boolean,
    isError: Boolean
}> {

    constructor(props: AuthPageProps) {
        super(props);
        this.state = {
            isLoading: true,
            isError: false
        };
    }

    async handleAuth() {
        if (/access_token|id_token|error/.test(this.props.location.hash)) {
            var res = await Auth.parseAuth();
            var uploaded = await fetch(api.server + '/auth', {
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + res.idToken,
                    'access-token': res.accessToken
                }
            });
            if (uploaded.ok) {
                Auth.completeAuthentication(res);
            }
        } else {
            throw Error('Unable to complete authentication');
        }
    }

    componentWillMount() {
        this.handleAuth();
    }

    render() {
        if (this.state.isLoading || !this.state.isError) {
            return (
                <Loader />
            );
        } else {
            return (
                <div>
                    Error
                </div>
            );
        }
    }
}

export default function () {
    return (
        <ApolloProvider client={api.default}>
            <BrowserRouter>
                <Switch>
                    <Route path="/auth_complete" component={AuthPage} />
                    <Route path="/404" component={NotFound} />
                    <Route path="/" component={App} />
                </Switch>
            </BrowserRouter>
        </ApolloProvider>
    );
}