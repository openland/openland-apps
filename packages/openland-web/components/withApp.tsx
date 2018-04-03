import * as React from 'react';
import { XWithRole } from './X/XWithRole';
import { withAppBase } from './withAppBase';
import { withUserInfo } from './UserInfo';
import { RedirectComponent } from './routing/RedirectComponent';
import { XTrack } from './X/XTrack';
import { withRouter } from './withRouter';

export function withApp(name: string, role: string | string[], WrappedComponent: React.ComponentType<{}>) {
    return withAppBase(withUserInfo(withRouter((props) => {
        if (props.isLoggedIn) {
            if (props.isBlocked) {
                return (<RedirectComponent path="/suspended" />);
            } else if (!props.isCompleted) {
                if (props.isActivated) {
                    return (<RedirectComponent path="/need_info" />);
                } else {
                    return (<RedirectComponent path="/activation" />);
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
            return (<RedirectComponent path="/signin" />);
        }
    })));
}