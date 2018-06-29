import '../init';
import '../../globals';
import * as React from 'react';
import * as Cookie from 'js-cookie';
import { withData } from '../../components/withData';

class LogoutHandler extends React.Component<{}, {}> {

    constructor(props: {}) {
        super(props);
    }

    componentDidMount() {
        Cookie.remove('x-openland-org');
        Cookie.remove('x-openland-token');
        Cookie.remove('x-openland-user-photo');
        window.location.href = '/';
    }

    render() {
        return <div />;
    }
}

export default withData('LogOut', LogoutHandler);