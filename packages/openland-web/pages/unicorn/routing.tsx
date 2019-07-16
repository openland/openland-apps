import * as React from 'react';
import { URouting } from 'openland-unicorn/URouting';
import { ShortnameFragment } from 'openland-web/fragments/shortname/ShortnameFragment';
import { MessengerFragment } from 'openland-web/fragments/chat/MessengerFragment';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { ProfileFragment } from 'openland-web/fragments/account/ProfileFragment';
import { AppearanceFragment } from 'openland-web/fragments/account/AppearanceFragment';
import { RecommendedFragment } from 'openland-web/fragments/discover/RecommendedFragment';
import { DiscoverGroupsFragment } from 'openland-web/fragments/discover/DiscoverGroupsFragment';
import { NotificationsFragment } from 'openland-web/fragments/account/NotificationsFragment';

const routing = new URouting();

// Mail
routing.addRoute('/mail/:conversationId', () =>
    React.memo(() => {
        let ctx = useUnicorn();
        return (<MessengerFragment id={ctx.id!} />);
    })
);

// Discover
routing.addRoute('/discover/recommended', () => RecommendedFragment);
routing.addRoute('/discover/groups', () => DiscoverGroupsFragment);

// Settings
routing.addRoute('/settings/profile', () => ProfileFragment);
routing.addRoute('/settings/notifications', () => NotificationsFragment);
routing.addRoute('/settings/appearance', () => AppearanceFragment);

// Profile
routing.addRoute('/:shortname', () => ShortnameFragment);

export const Routing = routing;