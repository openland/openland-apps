import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as Types from '../../api/Types';
import { withRouter, RouterState } from '../../utils/withRouter';

export class UserInfoProvider extends React.Component<{
    user?: Types.UserShortFragment | null,
    area?: Types.AreaShortFragment | null,
    roles: string[],
    router: RouterState
}> implements React.ChildContextProvider<{}> {
    static childContextTypes = {
        user: PropTypes.object,
        area: PropTypes.object,
        roles: PropTypes.arrayOf(PropTypes.string),
        isLoggedIn: PropTypes.bool.isRequired,
        doLogin: PropTypes.func.isRequired,
        doLogout: PropTypes.func.isRequired
    };

    render() {
        return <>{this.props.children}</>;
    }

    getChildContext() {
        return {
            user: this.props.user !== null && this.props.user !== undefined ? this.props.user : null,
            area: this.props.area !== null && this.props.area !== undefined ? this.props.area : null,
            roles: this.props.roles,
            isLoggedIn: this.props.user !== undefined && this.props.user !== null,
            doLogin: () => {
                this.props.router.push('/auth/login?r=' + encodeURIComponent(this.props.router.pathname));
            },
            doLogout: () => {
                this.props.router.push('/auth/logout');
            }
        };
    }
}

export interface UserInfoComponentProps {
    user: Types.UserShortFragment | null;
    area: Types.AreaShortFragment | null;
    roles: string[];
    isLoggedIn: boolean;
    doLogin: () => void;
    doLogout: () => void;
}

class UserInfoReceiver extends React.Component<{ render: React.ComponentType<UserInfoComponentProps> }> {
    static contextTypes = {
        user: PropTypes.object,
        area: PropTypes.object,
        roles: PropTypes.arrayOf(PropTypes.string),
        isLoggedIn: PropTypes.bool.isRequired,
        doLogin: PropTypes.func.isRequired,
        doLogout: PropTypes.func.isRequired
    };

    render() {
        var user = this.context.user as Types.UserShortFragment | null;
        var area = this.context.area as Types.AreaShortFragment | null;
        var roles = this.context.roles as string[];
        var isLoggedIn = this.context.isLoggedIn as boolean;
        var doLogin = this.context.doLogin as () => void;
        var doLogout = this.context.doLogout as () => void;
        var Wrapped = this.props.render;
        return (
            <Wrapped
                user={user}
                area={area}
                roles={roles}
                isLoggedIn={isLoggedIn}
                doLogin={doLogin}
                doLogout={doLogout}
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