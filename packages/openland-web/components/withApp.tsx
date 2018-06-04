import * as React from 'react';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { withAppBase } from './withAppBase';
import { withUserInfo } from './UserInfo';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { withRouter } from 'openland-x-routing/withRouter';
import { XTrack } from 'openland-x-analytics/XTrack';

export function withApp(name: string, role: string | string[], WrappedComponent: React.ComponentType<{}>) {
    return withAppBase(withUserInfo(withRouter((props) => {
        console.warn(props);
        if (props.isLoggedIn) {
            if (props.isBlocked) {
                return (<XPageRedirect path="/suspended" />);
            } else if (!props.isCompleted) {
                if (props.isActivated) {
                    return (<XPageRedirect path="/need_info" />);
                } else {
                    return (<XPageRedirect path="/activation" />);
                }
            } else {
                return (
                    <XTrack event={'View ' + name} params={props.router.routeQuery}>
                        <XWithRole role={role}>
                            <WrappedComponent />
                        </XWithRole>
                    </XTrack>
                );
            }
        } else {
            return (<XPageRedirect path="/signin" />);
        }
    })));
}