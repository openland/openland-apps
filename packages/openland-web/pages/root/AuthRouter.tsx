import * as React from 'react';
import { UserInfoContext } from '../../components/UserInfo';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { normalizeUrl } from 'openland-x-utils/normalizeUrl';
import { extractRedirect } from './router/extractRedirect';
import { isRootPath } from './router/isRootPath';
import { redirectSuffix } from './router/redirectSuffix';
import { isPublicPath } from './router/isPublicPath';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { useClient } from 'openland-api/useClient';
import { AuthProfileFragment } from './AuthProfileFragment';
import { UButton } from 'openland-web/components/unicorn/UButton';
import {
    InviteLandingComponent,
    InviteLandingComponentLayout,
} from 'openland-web/fragments/invite/InviteLandingComponent';
import { AuthDiscoverFragment } from './discover/AuthDiscoverFragment';
import { AuthDiscoverPopularNowFragment } from './discover/AuthDiscoverPopularNowFragment';
import { AuthDiscoverNewAndGrowingFragment } from './discover/AuthDiscoverNewAndGrowingFragment';
import { AuthDiscoverCollectionsFragment } from './discover/AuthDiscoverCollectionsFragment';
import { AuthDiscoverTopFreeFragment } from './discover/AuthDiscoverTopFreeFragment';
import { AuthDiscoverTopPremiumFragment } from './discover/AuthDiscoverTopPremiumFragment';
import { AuthDiscoverCollectionFragment } from './discover/AuthDiscoverCollectionFragment';
import { AuthDiscoverPopularOrgsFragment } from './discover/AuthDiscoverPopularOrgsFragment';
import { AuthDiscoverNewOrgsFragment } from './discover/AuthDiscoverNewOrgsFragment';

const ShortnameResolver = React.memo(
    (props: {
        shortname: string;
        defaultRedirect: (to: string, args?: { pages?: string[] }) => JSX.Element;
    }) => {
        const client = useClient();
        const shortnameItem = client.useAuthResolveShortName(
            { shortname: props.shortname },
            { fetchPolicy: 'network-only' },
        ).item;

        if (shortnameItem?.__typename === 'User') {
            return <AuthProfileFragment user={shortnameItem} />;
        }
        if (shortnameItem?.__typename === 'SharedRoom') {
            return (
                <InviteLandingComponent
                    signupRedirect={'/signin?redirect=' + encodeURIComponent('/' + props.shortname)}
                />
            );
        }
        if (shortnameItem?.__typename === 'Organization') {
            return (
                <InviteLandingComponentLayout
                    whereToInvite={shortnameItem.isCommunity ? 'community' : 'organization'}
                    title={shortnameItem.name}
                    id={shortnameItem.id}
                    photo={shortnameItem.photo}
                    entityTitle={shortnameItem.name}
                    description={shortnameItem.about}
                    hideFakeDescription={true}
                    featured={shortnameItem.featured}
                    noLogin={true}
                    button={
                        shortnameItem.applyLinkEnabled && shortnameItem.applyLink ? (
                            <UButton
                                style="primary"
                                size="large"
                                text="Apply to join"
                                as="a"
                                target="_blank"
                                href={normalizeUrl(shortnameItem.applyLink)}
                            />
                        ) : (
                                <UButton
                                    style="primary"
                                    size="large"
                                    text="Message admin"
                                    path={
                                        '/signin?redirect=' +
                                        encodeURIComponent('/mail/' + shortnameItem.owner.id)
                                    }
                                />
                            )
                    }
                />
            );
        }
        if (shortnameItem?.__typename === 'DiscoverChatsCollection') {
            return <AuthDiscoverCollectionFragment id={shortnameItem.id} />;
        }

        return props.defaultRedirect('/signin');
    },
);

export const AuthRouter = React.memo((props: { children: any }) => {
    const router = React.useContext(XRouterContext)!;
    const userInfo = React.useContext(UserInfoContext)!;
    let redirectPath: string = extractRedirect(router);

    const { hostName, path, routeQuery } = router;

    const shortname = routeQuery && routeQuery.shortname ? routeQuery.shortname : null;
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
    //               Discover
    ////////////////////////////////////////////////

    if (!userInfo.isLoggedIn && router.path.startsWith('/discover')) {
        if (router.path.startsWith('/discover/top-communities')) {
            return <AuthDiscoverPopularOrgsFragment />;
        }
        if (router.path.startsWith('/discover/new-communities')) {
            return <AuthDiscoverNewOrgsFragment />;
        } else if (router.path.startsWith('/discover/popular')) {
            return <AuthDiscoverPopularNowFragment />;
        } else if (router.path.startsWith('/discover/new')) {
            return <AuthDiscoverNewAndGrowingFragment />;
        } else if (router.path.startsWith('/discover/premium')) {
            return <AuthDiscoverTopPremiumFragment />;
        } else if (router.path.startsWith('/discover/free')) {
            return <AuthDiscoverTopFreeFragment />;
        } else if (router.path.startsWith('/discover/collections')) {
            const splitPath = router.path.split('/');

            if (splitPath.length === 4 && typeof splitPath[3] === 'string') {
                return <AuthDiscoverCollectionFragment id={splitPath[3]} />;
            }

            return <AuthDiscoverCollectionsFragment />;
        } else {
            return <AuthDiscoverFragment />;
        }
    }

    ////////////////////////////////////////////////
    //                Sign In/Up
    ////////////////////////////////////////////////

    // Redirect to Join prview before Signup/Signin if there are was redirect to join
    // if (router.path.startsWith('/join/') || router.path.startsWith('/invite/')) {
    //     if (!userInfo.isCompleted) {
    //         return redirectIfNeeded('/signin/invite');
    //     } else {
    //         return defaultRoute;
    //     }
    // }
    if (
        !userInfo.isLoggedIn &&
        (router.path.startsWith('/join/') || router.path.startsWith('/invite/'))
    ) {
        return redirectIfNeeded('/signin/invite');
    }

    if (!userInfo.isLoggedIn && shortname) {
        return <ShortnameResolver shortname={shortname} defaultRedirect={redirectIfNeeded} />;
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

    // TODO: Remove account organization
    // Redirect to organization add
    if (!userInfo.isAccountExists) {
        return redirectIfNeeded('/createProfile');
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

    // TODO: remove waitList
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
