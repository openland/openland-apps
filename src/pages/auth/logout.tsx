import * as React from 'react';
import createHistory from 'history/createBrowserHistory';
import * as Cookie from 'js-cookie';
import { withPage } from '../../components/withPage';

class LogoutHandler extends React.Component<{}, {}> {

    constructor(props: {}) {
        super(props);
    }

    componentDidMount() {
        Cookie.remove('statecraft-key');
        createHistory({
            forceRefresh: true
        }).replace('/');
    }

    render() {
        return <div />;
    }
}

export default withPage(LogoutHandler);