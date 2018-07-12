import * as React from 'react';
import { withUserInfo } from './UserInfo';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';

export const AuthRouter = withUserInfo((props) => {

    // Compute Redirect Value
    let redirect = props.router.query && props.router.query.redirect;
    let redirectPath: string = '/';
    if (redirect) {
        redirect = '?redirect=' + encodeURIComponent(redirect);
        redirectPath = redirect;
    } else {
        // For non-init pages - set redirect path
        if ([
            '/activation',
            '/waitlist',
            '/suspended',
            '/createProfile',
            '/pickOrganization',
            '/signin',
            '/signup'
        ].indexOf(props.router.path) < 0) {
            // ].indexOf(props.router.path) < 0 && !props.router.path.startsWith('/join/') && !props.router.path.startsWith('/invite/')) {
            if (props.router.path !== '/') {
                redirect = '?redirect=' + encodeURIComponent(props.router.path);
                redirectPath = props.router.path;
            } else {
                redirect = '';
                redirectPath = '/';
            }
        } else {
            redirect = '';
            redirectPath = '/';
        }
    }

    let handled = false;
    // Redirect to Signup/Signin pages
    if (!props.isLoggedIn) {
        handled = true;
        if (['/signin', '/signup'].indexOf(props.router.path) < 0) {
            console.warn('NotLoggedIn');
            return <XPageRedirect path={'/signin' + redirect} />;
        }
    }

    // Redirect suspended accounts
    if (!handled && props.isBlocked) {
        handled = true;
        if ([
            '/suspended',
        ].indexOf(props.router.path) < 0) {
            console.warn('Suspended');
            return <XPageRedirect path="/suspended" />;
        }
    }

    // Redirect to profile creation
    if (!handled && !props.isProfileCreated) {
        handled = true;
        if ([
            '/createProfile',
        ].indexOf(props.router.path) < 0) {
            console.warn('NoProfile');
            return <XPageRedirect path={'/createProfile' + redirect} />;
        }
    }

    // Redirect to Join before account creation/picking if there are was redirect to join
    if (!handled && redirectPath.startsWith('/join/')) {
        handled = true;
        if (!props.router.path.startsWith('/join/')) {
            return <XPageRedirect path={redirectPath} />;
        }
    }

    // Bypass Next steps for join
    if (!handled && props.router.path.startsWith('/join/')) {
        handled = true;
    }

    // Redirect to activate organization
    if (!handled && !props.isCompleted && redirectPath.startsWith('/invite/')) {
        handled = true;
        if (!props.router.path.startsWith('/invite/')) {
            return <XPageRedirect path={redirectPath} />;
        }
    }

    // Bypass Next steps for invite
    if (!handled && !props.isCompleted && props.router.path.startsWith('/invite/')) {
        handled = true;
    }

    // Bypass create organization
    if (!handled && props.router.path.startsWith('/createOrganization')) {
        handled = true;
    }

    // Redirect to organization picker
    if (!handled && props.isAccountExists && !props.isAccountPicked) {
        handled = true;
        if ([
            '/pickOrganization',
        ].indexOf(props.router.path) < 0) {
            console.warn('NoPickedOrganization');
            return <XPageRedirect path={'/pickOrganization' + redirect} />;
        }
    }

    // Redirect to organization add
    if (!handled && !props.isAccountExists) {
        handled = true;
        if ([
            '/createOrganization',
        ].indexOf(props.router.path) < 0) {
            console.warn('NoOrganization');
            return <XPageRedirect path={'/createOrganization' + redirect} />;
        }
    }


    // Redirect to generic 'need more info' page if signup is not completed
    if (!handled && !props.isCompleted) {
        handled = true;
        if ([
            '/waitlist',
        ].indexOf(props.router.path) < 0) {
            console.warn('NeedInfo');
            return <XPageRedirect path="/waitlist" />;
        }
    }

    // Redirect to activation page if activation pending
    // if (!handled && !props.isActivated) {
    //     handled = true;
    //     if ([
    //         '/activation',
    //     ].indexOf(props.router.path) < 0) {
    //         console.warn('Activation');
    //         return <XPageRedirect path="/activation" />;
    //     }
    // }

    // Redirect from service pages to the app root
    if (!handled && props.isCompleted) {
        handled = true;
        if ([
            '/activation',
            '/waitlist',
            '/suspended',
            '/createProfile',
            '/pickOrganization',
            // '/createOrganization', // Do not redirect to createOrganization
            '/signin',
            '/signup'
        ].indexOf(props.router.path) >= 0 || props.router.path.startsWith('/invite')) {
            console.warn('Completed');
            console.warn(redirectPath);
            if (props.router.path.startsWith('/invite')) {
                redirectPath = '/';
            }
            return <XPageRedirect path={redirectPath} />;
        }
    }

    // Everything is ok! Display content
    return <>{props.children}</>;
});