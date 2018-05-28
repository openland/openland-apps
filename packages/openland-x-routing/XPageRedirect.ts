import * as React from 'react';
import { withRouter, XWithRouter } from './withRouter';

class Redirector extends React.Component<{ path: string } & XWithRouter> {
    componentDidMount() {
        console.warn('Redirect to ' + this.props.path);
        this.props.router.push(this.props.path);
    }
    render() {
        return null;
    }
}

export const XPageRedirect = withRouter<{ path: string }>(Redirector);