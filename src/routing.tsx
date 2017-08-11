import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { ApolloProvider } from 'react-apollo';
import * as api from './api';

import * as Auth from './auth';

import City from './App/City';
import { Ask } from './App/Ask';

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
                <Loader size="big" active={true} />
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
                    <Redirect exact={true} from="/" to="/city/sf/housing" />
                    <Route path="/city/:city/:segment" component={City} />
                    <Route exact={true} path="/ask" component={Ask} />
                    <Route
                        path="/auth_complete"
                        component={AuthPage}
                    />
                </Switch>
            </BrowserRouter>
        </ApolloProvider>
    );
}