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

export class UserInfoProvider extends React.Component<UserInfoProps> {
    ctx: UserInfo;
    rolesCtx: { roles: string[]; currentOrganizatonId?: string };

    constructor(props: UserInfoProps) {
        super(props);

        let hasUser = this.props.user !== null && this.props.user !== undefined;
        let hasAccount = this.props.organization !== null && this.props.organization !== undefined;
        // Where to put this?
        if (this.props.user) {
            trackProfile(
                this.props.user.id!!,
                this.props.user.firstName,
                this.props.user.lastName,
                this.props.user.email,
            );
        }

        this.ctx = {
            user: hasUser ? this.props.user! : null,
            organization: hasAccount ? this.props.organization! : null,
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
            currentOrganizatonId: this.props.organization ? this.props.organization.id : undefined,
        };
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
