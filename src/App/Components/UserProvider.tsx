import * as React from 'react';
import { User, Account } from '../../api/';
export class UserProvider extends React.Component<{ user?: User, account: Account }> implements React.ChildContextProvider<{}> {
    static childContextTypes = {
        user: React.PropTypes.object,
        account: React.PropTypes.object
    };

    render() {
        return React.Children.only(this.props.children);
    }

    getChildContext() {
        return {
            user: this.props.user,
            account: this.props.account
        };
    }
}

class UserReceiver extends React.Component<{ render: React.ComponentType<{ user?: User, account: Account }> }> {
    static contextTypes = {
        user: React.PropTypes.object,
        account: React.PropTypes.object
    };

    render() {
        var user = this.context.user as User;
        var account = this.context.account as Account;
        var Wrapped = this.props.render;
        return <Wrapped user={user} account={account} {...this.props} />;
    }
}

export function withUser<P>(WrappedComponent: React.ComponentType<P & { user?: User, account: Account }>): React.ComponentType<P> {
    return function (props: P) {
        return <UserReceiver render={WrappedComponent} {...props} />;
    };
}