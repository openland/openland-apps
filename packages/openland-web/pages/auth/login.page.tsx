import * as React from 'react';
import * as qs from 'query-string';
import { createAuth0Client } from 'openland-x-graphql/Auth0Client';

export default class LoginStarter extends React.Component<{}, { error: boolean }> {
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
        createAuth0Client().authorize({});
    }

    render() {
        return <div />;
    }
}
