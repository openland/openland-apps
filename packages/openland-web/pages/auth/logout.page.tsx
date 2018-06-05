import '../../globals';
import * as React from 'react';
import createHistory from 'history/createBrowserHistory';
import * as Cookie from 'js-cookie';
import { withData } from '../../components/withData';

class LogoutHandler extends React.Component<{}, {}> {

    constructor(props: {}) {
        super(props);
    }

    componentDidMount() {
        Cookie.remove('x-openland-org');
        Cookie.remove('x-openland-token');
        createHistory({
            forceRefresh: true
        }).replace('/');
    }

    render() {
        return <div />;
    }
}

export default withData(LogoutHandler);