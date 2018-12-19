import * as React from 'react';
import { UserInfoContext } from './UserInfo';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XRouterContext } from 'openland-x-routing/XRouterContext';

export const AuthRouter = React.memo<{ children?: any }>((props) => {

    let router = React.useContext(XRouterContext)!;
    let userInfo = React.useContext(UserInfoContext)!;

    // Compute Redirect Value
    let redirect = router.query && router.query.redirect;
    let redirectPath: string = '/';

    let isJoinRedirect = false;
    if (redirect) {
        isJoinRedirect = redirect.startsWith('/join/');
        redirect = '?redirect=' + encodeURIComponent(redirect);
        redirectPath = redirect;
    } else {
        // For non-init pages - set redirect path
        if (
            [
                '/activation',
                '/waitlist',
                '/suspended',
                '/createProfile',
                '/signin',
                '/signup',
            ].indexOf(router.path) < 0
        ) {
            // ].indexOf(props.router.path) < 0 && !props.router.path.startsWith('/join/') && !props.router.path.startsWith('/invite/')) {
            if (router.path !== '/') {
                redirect = '?redirect=' + encodeURIComponent(router.path);
                redirectPath = router.path;
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

    // Redirect to Join prview before Signup/Signin if there are was redirect to join
    if (
        !handled &&
        !userInfo.isLoggedIn &&
        (redirectPath.startsWith('/join/') || redirectPath.startsWith('/invite/'))
    ) {
        handled = true;
        return <XPageRedirect path={'/signin/invite' + redirect} />;
    }

    // Redirect to Signup/Signin pages
    if (!userInfo.isLoggedIn) {
        handled = true;
        if (['/signin', '/signup'].indexOf(router.path) < 0) {
            console.warn('NotLoggedIn');
            return <XPageRedirect path={'/signin' + redirect} />;
        }
    }

    // Redirect suspended accounts
    if (!handled && userInfo.isBlocked) {
        handled = true;
        if (['/suspended'].indexOf(router.path) < 0) {
            console.warn('Suspended');
            return <XPageRedirect path="/suspended" />;
        }
    }

    // Redirect to profile creation if join
    console.warn(redirectPath);
    if (
        (isJoinRedirect || router.path.startsWith('/join/')) &&
        !handled &&
        !userInfo.isProfileCreated
    ) {
        handled = true;
        if (['/createProfile'].indexOf(router.path) < 0) {
            console.warn('NoProfile');
            return <XPageRedirect path={'/createProfile' + redirect} />;
        }
    }

    // Redirect to Join before account creation/picking if there are was redirect to join
    if (!handled && redirectPath.startsWith('/join/')) {
        handled = true;
        if (!router.path.startsWith('/join/')) {
            return <XPageRedirect path={redirectPath} />;
        }
    }

    // Bypass Next steps for join
    if (!handled && router.path.startsWith('/join/')) {
        handled = true;
    }

    // Redirect to activate user
    if (!handled && !userInfo.isCompleted && redirectPath.startsWith('/invite/')) {
        handled = true;
        if (!router.path.startsWith('/invite/')) {
            return <XPageRedirect path={redirectPath} />;
        }
    }

    // Bypass Next steps for invite
    if (!handled && !userInfo.isCompleted && router.path.startsWith('/invite/')) {
        handled = true;
    }

    // Redirect to profile and organization creation
    if (!handled && !userInfo.isProfileCreated) {
        handled = true;
        if (['/createProfile'].indexOf(router.path) < 0) {
            console.warn('NoProfile');
            return <XPageRedirect path={'/createProfile' + redirect} />;
        }
    }

    if (
        (!handled && router.path.includes('joinChannel')) ||
        router.path.includes('acceptChannelInvite')
    ) {
        handled = true;
    }

    // Bypass create organization
    if (!handled && router.path.startsWith('/createOrganization')) {
        handled = true;
    }

    // Redirect to organization add
    if (!handled && !userInfo.isAccountExists) {
        handled = true;
        if (['/createOrganization'].indexOf(router.path) < 0) {
            console.warn('NoOrganization');
            return <XPageRedirect path={'/createOrganization' + redirect} />;
        }
    }

    // Redirect to generic 'need more info' page if signup is not completed
    if (!handled && !userInfo.isCompleted) {
        handled = true;
        if (['/waitlist'].indexOf(router.path) < 0) {
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
    if (!handled && userInfo.isCompleted) {
        handled = true;
        if (
            [
                '/activation',
                '/waitlist',
                '/suspended',
                '/createProfile',
                '/signin',
                '/signup',
            ].indexOf(router.path) >= 0 ||
            router.path.startsWith('/invite')
        ) {
            console.warn('Completed');
            console.warn(redirectPath);
            if (router.path.startsWith('/invite')) {
                redirectPath = '/';
            }
            return <XPageRedirect path={redirectPath} />;
        }
    }

    // Everything is ok! Display content
    return <>{props.children}</>;
});
