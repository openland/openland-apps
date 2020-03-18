import * as React from 'react';
import * as Cookie from 'js-cookie';

export default class LogoutHandler extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    componentDidMount() {
        Cookie.remove('x-openland-org', { path: '/' });
        Cookie.remove('x-openland-token', { path: '/' });
        Cookie.remove('sign-redirect', { path: '/' });

        Cookie.remove('x-openland-app-invite', { path: '/' });
        Cookie.remove('x-openland-invite', { path: '/' });
        Cookie.remove('x-openland-shortname', { path: '/' });

        let keepDomain = Cookie.defaults.domain;
        let keepPath = Cookie.defaults.path;
        let host = window.location.hostname.split('.').reverse();
        Cookie.defaults.domain = (host[1] ? host[1] + '.' : '') + host[0];
        Cookie.defaults.path = '/';
        Cookie.remove('x-openland-user-photo');
        Cookie.defaults.domain = keepDomain;
        Cookie.defaults.path = keepPath;

        window.location.href = '/';
    }

    render() {
        return <div />;
    }
}
