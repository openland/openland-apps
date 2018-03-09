import * as React from 'react';
import { withUserInfo } from './UserInfo';
import { withRouter } from './../utils/withRouter';
import { RedirectComponent } from './routing/RedirectComponent';

export const AuthenticationRequired = withRouter<{}>(withUserInfo((props) => {
    if (props.isLoggedIn && props.account) {
        return (
            <>
                {props.children}
            </>
        );
    } else if (!props.isLoggedIn) {
        return (<RedirectComponent path="/signin" />)
    } else {
        return (<RedirectComponent path="/activation" />)
    }
}));