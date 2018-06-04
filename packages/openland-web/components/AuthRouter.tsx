import * as React from 'react';
import { withUserInfo } from './UserInfo';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';

export const AuthRouter = withUserInfo((props) => {

    // Redirect to Signup/Signin pages
    if (!props.isLoggedIn) {
        if (['/signin', '/signup'].indexOf(props.router.path) >= 0) {
            return <XPageRedirect path="/signup" />;
        }
    }

    // Redirect suspended accounts
    if (props.isBlocked) {
        if ([
            '/suspended',
        ].indexOf(props.router.path) >= 0) {
            return <XPageRedirect path="/suspended" />;
        }
    }

    // Redirect to profile creation
    if (!props.isProfileCreated) {
        if ([
            '/need_info',
        ].indexOf(props.router.path) >= 0) {
            return <XPageRedirect path="/need_info" />;
        }
    }

    // Redirect to generic 'need more info' page if signup is not completed
    if (!props.isCompleted) {
        if ([
            '/need_info',
        ].indexOf(props.router.path) >= 0) {
            return <XPageRedirect path="/need_info" />;
        }
    }

    // Redirect to activation page if activation pending
    if (!props.isActivated) {
        if ([
            '/activation',
        ].indexOf(props.router.path) >= 0) {
            return <XPageRedirect path="/activation" />;
        }
    }

    // Redirect from service pages to the app root
    if (props.isCompleted) {
        if ([
            '/activation',
            '/need_info',
            '/suspended',
            '/signin',
            '/signup'
        ].indexOf(props.router.path) >= 0) {
            return <XPageRedirect path="/" />;
        }
    }

    // Everything is ok! Display content
    return <>{props.children}</>;
});