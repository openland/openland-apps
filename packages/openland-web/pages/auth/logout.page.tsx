import '../init';
import '../../globals';
import * as React from 'react';
import * as Cookie from 'js-cookie';
import { withData } from '../../components/withData';
import { canUseDOM } from 'openland-x-utils/canUseDOM';

class LogoutHandler extends React.Component<{}, {}> {

    constructor(props: {}) {
        super(props);
    }

    componentDidMount() {
        Cookie.remove('x-openland-org');
        Cookie.remove('x-openland-token');
        if (canUseDOM) {
            let keepDomain = Cookie.defaults.domain;
            let keepPath = Cookie.defaults.path;
            let host = window.location.hostname.split('.').reverse();
            Cookie.defaults.domain = (host[1] ? host[1] + '.' : '') + host[0];
            Cookie.defaults.path = '/';
            Cookie.remove('x-openland-user-photo');
            Cookie.defaults.domain = keepDomain;
            Cookie.defaults.path = keepPath;
        }
        window.location.href = '/';
    }

    render() {
        return <div />;
    }
}

export default withData('LogOut', LogoutHandler);