import * as React from 'react';
import { UserInfoContext } from '../../components/UserInfo';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { GetUser_user } from 'openland-api/spacex.types';
import { extractRedirect } from './router/extractRedirect';
import { isRootPath } from './router/isRootPath';
import { redirectSuffix } from './router/redirectSuffix';
import { isPublicPath } from './router/isPublicPath';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { useClient } from 'openland-web/utils/useClient';
import { AuthProfileFragment } from './AuthProfileFragment';

export const AuthRouter = React.memo((props: { children: any }) => {
    const router = React.useContext(XRouterContext)!;
    const userInfo = React.useContext(UserInfoContext)!;
    let redirectPath: string = extractRedirect(router);
    const client = useClient();

    const { hostName, path, routeQuery } = router;

    const shortName = routeQuery && routeQuery.shortname ? routeQuery.shortname : null;
    let user: GetUser_user | null = null;

    if (!userInfo.isLoggedIn && shortName) {
        const item = client.useGetUser({ shortname: shortName }).user;

        if (item && item.__typename === 'User') {
            user = item;
        }
    }

    if (hostName === 'app.openland.com') {
        if (canUseDOM) {
            window.location.replace(`https://openland.com${path}`);
        }

        return null;
    }

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

    ////////////////////////////////////////////////
    //               Public Pages
    ////////////////////////////////////////////////

    // Do not redirect for public paths
    if (!userInfo.isLoggedIn && isPublicPath(router.path)) {
        return defaultRoute;
    }

    ////////////////////////////////////////////////
    //                Sign In/Up
    ////////////////////////////////////////////////

    // Redirect to Join prview before Signup/Signin if there are was redirect to join
    if (router.path.startsWith('/join/') || router.path.startsWith('/invite/')) {
        if (!userInfo.isCompleted) {
            return redirectIfNeeded('/signin/invite');
        } else {
            return defaultRoute;
        }
    }

    if (!userInfo.isLoggedIn && user) {
        return <AuthProfileFragment user={user} />;
    }

    // Redirect to Signup/Signin pages
    if (!userInfo.isLoggedIn) {
        return redirectIfNeeded('/signin');
    }

    ////////////////////////////////////////////////
    //                Suspend check
    ////////////////////////////////////////////////

    // Redirect suspended accounts
    if (userInfo.isBlocked) {
        return redirectIfNeeded('/suspended');
    }

    ////////////////////////////////////////////////
    //              Profile creation
    ////////////////////////////////////////////////

    // Redirect to profile and organization creation
    if (!userInfo.isProfileCreated) {
        return redirectIfNeeded('/createProfile');
    }

    ////////////////////////////////////////////////
    //            Organization handling
    ////////////////////////////////////////////////

    // Trying to ask to join organization
    if (router.path.startsWith('/join/') || redirectPath.startsWith('/join/')) {
        return redirectJoin('/join');
    }

    // Redirect to organization add
    if (!userInfo.isAccountExists) {
        return redirectIfNeeded('/createOrganization');
    }

    ////////////////////////////////////////////////
    //                Room Join
    ////////////////////////////////////////////////

    // Handle channel joins
    if (router.path.includes('joinChannel') || router.path.includes('acceptChannelInvite')) {
        return defaultRoute;
    }

    ////////////////////////////////////////////////
    //          Final activation steps
    ////////////////////////////////////////////////

    // Activate user if needed and possible
    if (
        (!userInfo.isCompleted && router.path.startsWith('/invite/')) ||
        redirectPath.startsWith('/invite/')
    ) {
        return redirectJoin('/invite');
    }

    // Redirect to generic 'need more info' page if signup is not completed
    if (!userInfo.isCompleted) {
        return redirectIfNeeded('/waitlist');
    }

    ////////////////////////////////////////////////
    //               Launch App
    ////////////////////////////////////////////////

    // Redirect from service pages to the app root
    if (userInfo.isCompleted) {
        if (isRootPath(router) || router.path.startsWith('/invite/')) {
            if (router.path.startsWith('/invite/')) {
                redirectPath = '/';
            }
            return <XPageRedirect path={redirectPath} />;
        }
    }

    // Everything is ok! Display content
    return <>{props.children}</>;
});
