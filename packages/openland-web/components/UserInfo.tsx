import * as React from 'react';
import {
    Account_me,
    Account_myProfile,
    Account_sessionState
} from 'openland-api/spacex.types';
import { XRoleContext } from 'openland-x-permissions/XRoleContext';
import { AppConfig } from 'openland-y-runtime/AppConfig';

export interface UserInfo {
    user: Account_me | null;
    profile: Account_myProfile | null;
    isLoggedIn: boolean;
    isAccountExists: boolean;
    isAccountPicked: boolean;
    isActivated: boolean;
    isProfileCreated: boolean;
    isCompleted: boolean;
    isBlocked: boolean;
}

export const UserInfoContext = React.createContext<UserInfo | undefined>(undefined);

export interface UserInfoProps {
    user: Account_me | null;
    sessionState: Account_sessionState;
    roles: string[];
    profile: Account_myProfile | null;
}

export class UserInfoProvider extends React.Component<UserInfoProps> {
    ctx: UserInfo;
    rolesCtx: { roles: string[] };

    constructor(props: UserInfoProps) {
        super(props);

        const hasUser = !!this.props.user;
        this.ctx = {
            user: hasUser ? this.props.user : null,
            profile: hasUser ? this.props.profile : null,
            isLoggedIn: this.props.sessionState.isLoggedIn,
            isProfileCreated: this.props.sessionState.isProfileCreated && hasUser,
            isAccountExists: this.props.sessionState.isAccountExists,
            isAccountPicked: this.props.sessionState.isAccountPicked,
            isActivated: this.props.sessionState.isAccountActivated && hasUser,
            isCompleted: this.props.sessionState.isCompleted && hasUser,
            isBlocked: this.props.sessionState.isBlocked,
        };
        this.rolesCtx = {
            roles: this.props.roles,
        };
        AppConfig.setNonProduction(this.props.roles.indexOf('feature-non-production') >= 0);
        AppConfig.setSuperAdmin(this.props.roles.indexOf('super-admin') >= 0);
    }

    render() {
        return (
            <XRoleContext.Provider value={this.rolesCtx}>
                <UserInfoContext.Provider value={this.ctx}>
                    {this.props.children}
                </UserInfoContext.Provider>
            </XRoleContext.Provider>
        );
    }
}

export function withUserInfo<P>(
    WrappedComponent: React.ComponentType<P & UserInfo>,
): React.ComponentType<P> {
    return (props: P) => {
        let ctx = React.useContext(UserInfoContext);
        return <WrappedComponent {...props} {...ctx!} />;
    };
}
