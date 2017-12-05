import * as React from 'react';
import { RouteComponentProps, RouteProps, withRouter } from 'react-router-dom';

class ScrollToTopRoute extends React.Component<RouteComponentProps<any>> {
    componentDidUpdate(prevProps: RouteProps) {
        if (this.props.location!!.pathname !== prevProps.location!!.pathname) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return React.Children.only(this.props.children);
    }
}

export default withRouter<{}>(ScrollToTopRoute);