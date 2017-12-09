import * as React from 'react';
import * as auth0 from 'auth0-js';
import { withPage } from '../../components/withPage';

class LoginStarter extends React.Component<{}, { error: boolean }> {

    constructor(props: {}) {
        super(props);
        this.state = { error: false };
    }

    componentDidMount() {
        let auth = new auth0.WebAuth({
            domain: 'statecraft.auth0.com',
            clientID: 'na0Pvis7KTzZWtzcIFT8MzIxtdpiLZc3',
            redirectUri: window.location.origin + '/auth/complete',
            audience: 'https://statecraft.auth0.com/userinfo',
            responseType: 'token id_token',
            scope: 'openid profile email'
        });
        auth.authorize({});
    }

    render() {
        return <div />;
    }
}

export default withPage(LoginStarter);