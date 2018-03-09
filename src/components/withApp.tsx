import * as React from 'react';
import { XWithRole } from './X/XWithRole';
import { withAppBase } from './withAppBase';
import { withUserInfo } from './UserInfo';
import { RedirectComponent } from './routing/RedirectComponent';

export function withApp(role: string, WrappedComponent: React.ComponentType<{}>) {
    return withAppBase(withUserInfo((props) => {
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
                    <XWithRole role={role}>
                        <WrappedComponent />
                    </XWithRole>
                );
            }
        } else {
            return (<RedirectComponent path="/signin" />);
        }
    }));
}