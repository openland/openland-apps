import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as Types from 'openland-api/Types';
import { XWithRouter, withRouter } from 'openland-x-routing/withRouter';
import { XRoleContext } from 'openland-x-permissions/XRoleContext';
import { trackProfile } from 'openland-x-analytics';

export class UserInfoProvider extends React.Component<{
    user?: Types.UserShortFragment | null,
    account?: Types.AccountShortFragment | null,
    sessionState: Types.SessionStateFullFragment,
    roles: string[]
} & XWithRouter> implements React.ChildContextProvider<{}> {
    static childContextTypes = {
        user: PropTypes.object,
        account: PropTypes.object,
        isLoggedIn: PropTypes.bool.isRequired,
        isActivated: PropTypes.bool.isRequired,
        isProfileCreated: PropTypes.bool.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        isAccountExists: PropTypes.bool.isRequired,
        isAccountPicked: PropTypes.bool.isRequired,
        isBlocked: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <XRoleContext.Provider value={{ roles: this.props.roles }}>
                {this.props.children}
            </XRoleContext.Provider>
        );
    }

    getChildContext() {
        let hasUser = this.props.user !== null && this.props.user !== undefined;
        let hasAccount = this.props.account !== null && this.props.account !== undefined;
        // Where to put this?
        if (this.props.user) {
            trackProfile(this.props.user.id!!, this.props.user.firstName, this.props.user.lastName, this.props.user.email);
        }
        return {
            user: hasUser ? this.props.user : null,
            account: hasAccount ? this.props.account : null,
            isLoggedIn: this.props.sessionState.isLoggedIn,
            isProfileCreated: this.props.sessionState.isProfileCreated && hasUser,
            isAccountExists: this.props.sessionState.isAccountExists,
            isAccountPicked: this.props.sessionState.isAccountPicked,
            isActivated: this.props.sessionState.isAccountActivated && hasUser,
            isCompleted: this.props.sessionState.isCompleted && hasUser,
            isBlocked: this.props.sessionState.isBlocked,
        };
    }
}

export interface UserInfoComponentProps {
    user: Types.UserShortFragment | null;
    account: Types.AccountShortFragment | null;
    isLoggedIn: boolean;
    isAccountExists: boolean;
    isAccountPicked: boolean;
    isActivated: boolean;
    isProfileCreated: boolean;
    isCompleted: boolean;
    isBlocked: boolean;
}

class UserInfoReceiver extends React.Component<{ render: React.ComponentType<UserInfoComponentProps> }> {
    static contextTypes = {
        user: PropTypes.object,
        area: PropTypes.object,
        account: PropTypes.object,
        roles: PropTypes.arrayOf(PropTypes.string),
        isLoggedIn: PropTypes.bool.isRequired,
        isActivated: PropTypes.bool.isRequired,
        isProfileCreated: PropTypes.bool.isRequired,
        isAccountExists: PropTypes.bool.isRequired,
        isAccountPicked: PropTypes.bool.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        isBlocked: PropTypes.bool.isRequired,
    };

    render() {
        var user = this.context.user as Types.UserShortFragment | null;
        var account = this.context.account as Types.AccountShortFragment | null;
        var isLoggedIn = this.context.isLoggedIn as boolean;
        var isActivated = this.context.isActivated as boolean;
        var isProfileCreated = this.context.isProfileCreated as boolean;
        var isAccountExists = this.context.isAccountExists as boolean;
        var isAccountPicked = this.context.isAccountPicked as boolean;
        var isCompleted = this.context.isCompleted as boolean;
        var isBlocked = this.context.isBlocked as boolean;
        var Wrapped = this.props.render;
        return (
            <Wrapped
                user={user}
                account={account}
                isLoggedIn={isLoggedIn}
                isActivated={isActivated}
                isProfileCreated={isProfileCreated}
                isCompleted={isCompleted}
                isBlocked={isBlocked}
                isAccountExists={isAccountExists}
                isAccountPicked={isAccountPicked}
                {...this.props}
            />
        );
    }
}

export function withUserInfo<P>(WrappedComponent: React.ComponentType<P & UserInfoComponentProps & XWithRouter>): React.ComponentType<P> {
    return withRouter<P>((props) => {
        return <UserInfoReceiver render={WrappedComponent} {...props} />;
    });
}