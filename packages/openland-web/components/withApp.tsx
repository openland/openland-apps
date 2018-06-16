import * as React from 'react';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { withAppBase } from './withAppBase';
import { withUserInfo } from './UserInfo';
import { withRouter } from 'openland-x-routing/withRouter';
import { XTrack } from 'openland-x-analytics/XTrack';
import { AuthRouter } from './AuthRouter';

export function withApp(name: string, role: string | string[], WrappedComponent: React.ComponentType<{}>) {
    return withAppBase(name, withUserInfo(withRouter((props) => {
        return (
            <AuthRouter>
                <XTrack event={'View ' + name} params={props.router.routeQuery}>
                    <XWithRole role={role}>
                        <WrappedComponent />
                    </XWithRole>
                </XTrack>
            </AuthRouter>
        );
    })));
}