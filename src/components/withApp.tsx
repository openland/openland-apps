import * as React from 'react';
import { XWithRole } from './X/XWithRole';
import { withAppBase } from './withAppBase';
import { withUserInfo } from './UserInfo';
import { RedirectComponent } from './routing/RedirectComponent';

export function withApp(role: string, WrappedComponent: React.ComponentType<{}>) {
    return withAppBase(withUserInfo((props) => {
        if (props.isLoggedIn && props.isActivated) {
            return (
                <XWithRole role={role}>
                    <WrappedComponent />
                </XWithRole>
            );
        } else if (!props.isLoggedIn) {
            return (<RedirectComponent path="/signin" />)
        } else {
            return (<RedirectComponent path="/activation" />)
        }
    }));
};