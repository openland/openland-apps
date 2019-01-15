import * as React from 'react';
import { UserInfoContext } from '../../components/UserInfo';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { extractRedirect } from './router/extractRedirect';
import { isRootPath } from './router/isRootPath';
import { redirectSuffix } from './router/redirectSuffix';
import { isPublicPath } from './router/isPublicPath';

export const AuthRouter = React.memo<{ children?: any }>(props => {

    let router = React.useContext(XRouterContext)!;
    let userInfo = React.useContext(UserInfoContext)!;
    let redirectPath: string = extractRedirect(router);

    const defaultRoute = <>{props.children}</>;

    function redirectIfNeeded(to: string, args?: { pages?: string[] }) {
        if (args && args.pages) {
            if (args.pages.indexOf(router.path) < 0) {
                return <XPageRedirect path={to + redirectSuffix(redirectPath)} />;
            } else {
                return defaultRoute;
            }
        } else {
            if (to !== router.path) {
                return <XPageRedirect path={to + redirectSuffix(redirectPath)} />;
            } else {
                return defaultRoute;
            }
        }
    }

    function redirectJoin(to: string) {
        if (!router.path.startsWith(to + '/')) {
            return <XPageRedirect path={redirectPath} />;
        } else {
            return defaultRoute;
        }
    }

    // Do not redirect for public paths
    if (!userInfo.isLoggedIn && isPublicPath(router.path)) {
        return defaultRoute;
    }

    // Redirect to Join prview before Signup/Signin if there are was redirect to join
    if (!userInfo.isLoggedIn && (router.path.startsWith('/join/') || router.path.startsWith('/invite/'))) {
        return redirectIfNeeded('/signin/invite');
    }

    // Redirect to Signup/Signin pages
    if (!userInfo.isLoggedIn) {
        return redirectIfNeeded('/signin', { pages: ['/signin', '/signup'] });
    }

    // Redirect suspended accounts
    if (userInfo.isBlocked) {
        return redirectIfNeeded('/suspended');
    }

    // Redirect to profile and organization creation
    if (!userInfo.isProfileCreated) {
        return redirectIfNeeded('/createProfile');
    }

    // Trying to ask to join organization
    if (router.path.startsWith('/join/') || redirectPath.startsWith('/join/')) {
        return redirectJoin('/join');
    }

    // Activate user before organization creation
    if (!userInfo.isCompleted && router.path.startsWith('/invite/') || redirectPath.startsWith('/invite/')) {
        return redirectJoin('/invite');
    }

    // Redirect to organization add
    if (!userInfo.isAccountExists) {
        return redirectIfNeeded('/createOrganization');
    }

    // Handle channel joins
    if ((router.path.includes('joinChannel')) || router.path.includes('acceptChannelInvite')) {
        return defaultRoute;
    }

    // Redirect to generic 'need more info' page if signup is not completed
    if (!userInfo.isCompleted) {
        return redirectIfNeeded('/waitlist');
    }

    // Redirect from service pages to the app root
    if (userInfo.isCompleted) {
        if (isRootPath(router) || router.path.startsWith('/invite')) {
            if (router.path.startsWith('/invite')) {
                redirectPath = '/';
            }
            return <XPageRedirect path={redirectPath} />;
        }
    }

    // Everything is ok! Display content
    return <>{props.children}</>;
});
