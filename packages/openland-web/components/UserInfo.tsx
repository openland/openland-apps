import * as React from 'react';
import * as PropTypes from 'prop-types';
import Types from 'openland-api';
import { XWithRouter, withRouter } from 'openland-x-routing/withRouter';
import { XRoleContext } from 'openland-x-permissions/XRoleContext';
import { trackProfile } from 'openland-x-analytics';

export class UserInfoProvider extends React.Component<{
    user?: Types.UserShortFragment | null,
    area?: Types.AreaShortFragment | null,
    account?: Types.AccountShortFragment | null,
    profile: Types.MyProfileFullFragment,
    roles: string[]
} & XWithRouter> implements React.ChildContextProvider<{}> {
    static childContextTypes = {
        user: PropTypes.object,
        area: PropTypes.object,
        account: PropTypes.object,
        isLoggedIn: PropTypes.bool.isRequired,
        isActivated: PropTypes.bool.isRequired,
        isProfileCreated: PropTypes.bool.isRequired,
        isCompleted: PropTypes.bool.isRequired,
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
            area: this.props.area !== null && this.props.area !== undefined ? this.props.area : null,
            account: hasAccount ? this.props.account : null,
            isLoggedIn: this.props.profile.isLoggedIn && hasUser,
            isProfileCreated: this.props.profile.isProfileCreated && hasUser,
            isActivated: this.props.profile.isAccountActivated && hasAccount && hasUser,
            isCompleted: this.props.profile.isCompleted && hasAccount && hasUser,
            isBlocked: this.props.profile.isBlocked,
        };
    }
}

export interface UserInfoComponentProps {
    user: Types.UserShortFragment | null;
    area: Types.AreaShortFragment | null;
    account: Types.AccountShortFragment | null;
    roles: string[];
    isLoggedIn: boolean;
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
        isCompleted: PropTypes.bool.isRequired,
        isBlocked: PropTypes.bool.isRequired,
    };

    render() {
        var user = this.context.user as Types.UserShortFragment | null;
        var area = this.context.area as Types.AreaShortFragment | null;
        var account = this.context.account as Types.AccountShortFragment | null;
        var roles = this.context.roles as string[];
        var isLoggedIn = this.context.isLoggedIn as boolean;
        var isActivated = this.context.isActivated as boolean;
        var isProfileCreated = this.context.isProfileCreated as boolean;
        var isCompleted = this.context.isCompleted as boolean;
        var isBlocked = this.context.isBlocked as boolean;
        var Wrapped = this.props.render;
        return (
            <Wrapped
                user={user}
                area={area}
                roles={roles}
                account={account}
                isLoggedIn={isLoggedIn}
                isActivated={isActivated}
                isProfileCreated={isProfileCreated}
                isCompleted={isCompleted}
                isBlocked={isBlocked}
                {...this.props}
            />
        );
    }
}

export function withUserInfo<P>(WrappedComponent: React.ComponentType<P & UserInfoComponentProps>): React.ComponentType<P> {
    return withRouter<P>((props) => {
        return <UserInfoReceiver render={WrappedComponent} {...props} />;
    });
}