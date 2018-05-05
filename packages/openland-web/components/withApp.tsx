import * as React from 'react';
import { XWithRole } from './X/XWithRole';
import { withAppBase } from './withAppBase';
import { withUserInfo } from './UserInfo';
import { XTrack } from './X/XTrack';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { withRouter } from 'openland-x-routing/withRouter';

export function withApp(name: string, role: string | string[], WrappedComponent: React.ComponentType<{}>) {
    return withAppBase(withUserInfo(withRouter((props) => {
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