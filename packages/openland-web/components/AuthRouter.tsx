import * as React from 'react';
import { withUserInfo } from './UserInfo';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';

export const AuthRouter = withUserInfo((props) => {

    console.warn(props);

    let handled = false;
    // Redirect to Signup/Signin pages
    if (!props.isLoggedIn) {
        handled = true;
        if (['/signin', '/signup'].indexOf(props.router.path) < 0) {
            return <XPageRedirect path="/signup" />;
        }
    }

    // Redirect suspended accounts
    if (!handled && props.isBlocked) {
        handled = true;
        if ([
            '/suspended',
        ].indexOf(props.router.path) < 0) {
            return <XPageRedirect path="/suspended" />;
        }
    }

    // Redirect to profile creation
    if (!handled && !props.isProfileCreated) {
        handled = true;
        if ([
            '/createProfile',
        ].indexOf(props.router.path) < 0) {
            return <XPageRedirect path="/createProfile" />;
        }
    }

    // Redirect to generic 'need more info' page if signup is not completed
    if (!handled && !props.isCompleted) {
        handled = true;
        if ([
            '/need_info',
        ].indexOf(props.router.path) < 0) {
            return <XPageRedirect path="/need_info" />;
        }
    }

    // Redirect to activation page if activation pending
    if (!handled && !props.isActivated) {
        handled = true;
        if ([
            '/activation',
        ].indexOf(props.router.path) < 0) {
            return <XPageRedirect path="/activation" />;
        }
    }

    // Redirect from service pages to the app root
    if (!handled && props.isCompleted) {
        handled = true;
        if ([
            '/activation',
            '/need_info',
            '/suspended',
            '/createProfile',
            '/signin',
            '/signup'
        ].indexOf(props.router.path) >= 0) {
            return <XPageRedirect path="/" />;
        }
    }

    // Everything is ok! Display content
    return <>{props.children}</>;
});