import '../../globals';
import * as React from 'react';
import * as auth0 from 'auth0-js';
import * as qs from 'query-string';
import { withData } from '../../utils/withData';

class LoginStarter extends React.Component<{}, { error: boolean }> {

    constructor(props: {}) {
        super(props);
        this.state = { error: false };
    }

    componentDidMount() {
        let redirect = qs.parse(window.location.search).r;
        if (redirect) {
            localStorage.setItem('redirect_path', redirect);
        } else {
            localStorage.removeItem('redirect_path');
        }
        let auth = new auth0.WebAuth({
            domain: 'statecraft.auth0.com',
            clientID: 'v3R2Rr6D4LzzcWKHf91jwKJyDnEm4L96',
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

export default withData(LoginStarter);