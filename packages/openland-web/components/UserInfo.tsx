import * as React from 'react';
import * as Types from 'openland-api/Types';
import { XRoleContext } from 'openland-x-permissions/XRoleContext';
import { trackProfile } from 'openland-x-analytics';

export interface UserInfo {
    user: Types.UserShort | null;
    organization: Types.OrganizationShort | null;
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
    user?: Types.UserShort | null;
    organization?: Types.OrganizationShort | null;
    sessionState: Types.SessionStateFull;
    roles: string[];
}

type RolesT = {
    roles: any;
    currentOrganizatonId: any;
};

type CtxT = {
    user: Types.UserShort | null;
    organization: Types.OrganizationShort | null;
    isLoggedIn: boolean;
    isProfileCreated: boolean;
    isAccountExists: boolean;
    isAccountPicked: boolean;
    isActivated: boolean;
    isCompleted: boolean;
    isBlocked: boolean;
};

type StateT = {
    rolesCtx: RolesT;
    ctx: CtxT;
};

export class UserInfoProvider extends React.Component<UserInfoProps, StateT> {
    static getDerivedStateFromProps(props: UserInfoProps) {
        let hasUser = props.user !== null && props.user !== undefined;
        let hasAccount = props.organization !== null && props.organization !== undefined;

        const { user, organization, sessionState, roles } = props;

        if (user) {
            trackProfile(user.id!!, user.firstName, user.lastName, user.email);
        }

        const ctx = {
            user: hasUser ? user! : null,
            organization: hasAccount ? organization! : null,
            isLoggedIn: sessionState.isLoggedIn,
            isProfileCreated: sessionState.isProfileCreated && hasUser,
            isAccountExists: sessionState.isAccountExists,
            isAccountPicked: sessionState.isAccountPicked,
            isActivated: sessionState.isAccountActivated && hasUser,
            isCompleted: sessionState.isCompleted && hasUser,
            isBlocked: sessionState.isBlocked,
        };

        const rolesCtx = {
            roles,
            currentOrganizatonId: organization ? organization.id : undefined,
        };
        const state = { ctx, rolesCtx };

        return state;
    }

    render() {
        return (
            <XRoleContext.Provider value={this.state.rolesCtx}>
                <UserInfoContext.Provider value={this.state.ctx}>
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
