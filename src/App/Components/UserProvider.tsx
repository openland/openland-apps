import * as React from 'react';
import { User } from '../../api/';
export class UserProvider extends React.Component<{ user?: User }> implements React.ChildContextProvider<{}> {
    static childContextTypes = {
        user: React.PropTypes.object
    };

    render() {
        return React.Children.only(this.props.children);
    }

    getChildContext() {
        return {
            user: this.props.user
        };
    }
}

class UserReceiver extends React.Component<{ render: React.ComponentType<{ user?: User }> }> {
    static contextTypes = {
        user: React.PropTypes.object
    };

    render() {
        var res = this.context.user as User;
        var Wrapped = this.props.render;
        return <Wrapped user={res} {...this.props} />;
    }
}

export function withUser<P>(WrappedComponent: React.ComponentType<P & { user?: User }>): React.ComponentType<P> {
    return function (props: P) {
        return <UserReceiver render={WrappedComponent} {...props} />;
    };
}