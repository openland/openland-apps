import * as React from 'react';
import * as Cookie from 'js-cookie';
import { UserInfoContext } from '../../components/UserInfo';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { extractRedirect } from './router/extractRedirect';
import { redirectSuffix } from './router/redirectSuffix';
import { isPublicPath } from './router/isPublicPath';
import { useClient } from 'openland-api/useClient';
import {
    InviteLandingComponent,
    InviteLandingComponentLayout,
} from 'openland-web/fragments/invite/InviteLandingComponent';
import { AuthDiscoverFragment } from './discover/AuthDiscoverFragment';
import { AuthProfileFragment } from './profile/AuthProfileFragment';
import { AuthPageContainer } from './components/AuthPageContainer';
import { AuthDiscoverContainer } from './components/AuthDiscoverContainer';
import { DiscoverPopularOrgsFragment } from 'openland-web/fragments/discover/DiscoverPopularOrgsFragment';
import { DiscoverNewOrgsFragment } from 'openland-web/fragments/discover/DiscoverNewOrgsFragment';
import { DiscoverPopularNowFragment } from 'openland-web/fragments/discover/DiscoverPopularNowFragment';
import { DiscoverNewAndGrowingFragment } from 'openland-web/fragments/discover/DiscoverNewAndGrowingFragment';
import { DiscoverTopPremiumFragment } from 'openland-web/fragments/discover/DiscoverTopPremiumFragment';
import { DiscoverTopFreeFragment } from 'openland-web/fragments/discover/DiscoverTopFreeFragment';
import { DiscoverCollectionsFragment } from 'openland-web/fragments/discover/DiscoverCollectionsFragment';
import { DiscoverCollectionFragment } from 'openland-web/fragments/discover/DiscoverCollectionFragment';

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
                <AuthPageContainer>
                    <InviteLandingComponent noLogin={true} />
                </AuthPageContainer>
            );
        }
        if (shortnameItem?.__typename === 'Organization') {
            return (
                <AuthPageContainer>
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
                    />
                </AuthPageContainer>
            );
        }
        if (shortnameItem?.__typename === 'DiscoverChatsCollection') {
            return (
                <AuthDiscoverContainer title="Collection">
                    <DiscoverCollectionFragment noLogin={true} id={shortnameItem.id} />
                </AuthDiscoverContainer>
            );
        }

        return props.defaultRedirect('/signin');
    },
);

const DiscoverResolver = React.memo((props: { path: string }) => {
    if (props.path.startsWith('/discover/top-communities')) {
        return (
            <AuthDiscoverContainer title="Top communities">
                <DiscoverPopularOrgsFragment noLogin={true} />
            </AuthDiscoverContainer>
        );
    } else if (props.path.startsWith('/discover/new-communities')) {
        return (
            <AuthDiscoverContainer title="New communities">
                <DiscoverNewOrgsFragment noLogin={true} />
            </AuthDiscoverContainer>
        );
    } else if (props.path.startsWith('/discover/popular')) {
        return (
            <AuthDiscoverContainer title="Popular now">
                <DiscoverPopularNowFragment noLogin={true} />
            </AuthDiscoverContainer>
        );
    } else if (props.path.startsWith('/discover/new')) {
        return (
            <AuthDiscoverContainer title="New groups">
                <DiscoverNewAndGrowingFragment noLogin={true} />
            </AuthDiscoverContainer>
        );
    } else if (props.path.startsWith('/discover/premium')) {
        return (
            <AuthDiscoverContainer title="Top premium">
                <DiscoverTopPremiumFragment noLogin={true} />
            </AuthDiscoverContainer>
        );
    } else if (props.path.startsWith('/discover/free')) {
        return (
            <AuthDiscoverContainer title="Top groups">
                <DiscoverTopFreeFragment noLogin={true} />
            </AuthDiscoverContainer>
        );
    } else if (props.path.startsWith('/discover/collections')) {
        const splitPath = props.path.split('/');

        if (splitPath.length === 4 && typeof splitPath[3] === 'string') {
            return (
                <AuthDiscoverContainer title="Collection">
                    <DiscoverCollectionFragment noLogin={true} id={splitPath[3]} />
                </AuthDiscoverContainer>
            );
        }

        return (
            <AuthDiscoverContainer title="Collections">
                <DiscoverCollectionsFragment noLogin={true} />
            </AuthDiscoverContainer>
        );
    } else {
        return <AuthDiscoverFragment />;
    }
});

export const AuthRouter = React.memo((props: { children: any }) => {
    const router = React.useContext(XRouterContext)!;
    const userInfo = React.useContext(UserInfoContext)!;

    let redirectPath: string = extractRedirect(router);

    const { routeQuery } = router;

    const shortname = routeQuery && routeQuery.shortname ? routeQuery.shortname : null;

    const defaultRoute = <>{props.children}</>;

    function redirectIfNeeded(to: string, args?: { pages?: string[] }) {
        const redirect = redirectPath.startsWith('/') ? redirectPath.substring(1) : redirectPath;
        Cookie.set('x-signin-redirect', redirect, { path: '/' });
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

    ////////////////////////////////////////////////
    //               Public Pages
    ////////////////////////////////////////////////

    // Do not redirect for public paths
    // '/', /download, /start, /about, /terms, /privacy
    if (!userInfo.isLoggedIn && isPublicPath(router.path)) {
        return defaultRoute;
    }

    ////////////////////////////////////////////////
    //               Discover
    ////////////////////////////////////////////////

    if (!userInfo.isLoggedIn && router.path.startsWith('/discover')) {
        return <DiscoverResolver path={router.path} />;
    }

    ////////////////////////////////////////////////
    //                Sign In/Up
    ////////////////////////////////////////////////
    if (
        !userInfo.isLoggedIn &&
        (router.path.startsWith('/join/') || router.path.startsWith('/invite/'))
    ) {
        return (
            <AuthPageContainer>
                <InviteLandingComponent noLogin={true} />
            </AuthPageContainer>
        );
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

    // TODO: Remove account organization
    // Redirect to organization add
    if (!userInfo.isAccountExists) {
        return redirectIfNeeded('/createProfile');
    }

    if (userInfo.isAccountExists && router.path.startsWith('/createProfile')) {
        return <XPageRedirect path="/mail"/>;
    }

    // Everything is ok! Display content
    return <>{props.children}</>;
});
