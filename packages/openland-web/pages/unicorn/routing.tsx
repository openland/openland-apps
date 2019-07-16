import * as React from 'react';
import { URouting } from 'openland-unicorn/URouting';
import { ShortnameFragment } from 'openland-web/fragments/shortname/ShortnameFragment';
import { MessengerFragment } from 'openland-web/fragments/chat/MessengerFragment';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { ProfileFragment } from 'openland-web/fragments/account/ProfileFragment';
import { NotificationFragment } from 'openland-api/queries/MyNotificationsCenter';
import { AppearanceFragment } from 'openland-web/fragments/account/AppearanceFragment';

const routing = new URouting();

// Mail
routing.addRoute('/mail/:conversationId', () =>
    React.memo(() => {
        let ctx = useUnicorn();
        return (<MessengerFragment id={ctx.id!} />);
    })
);

// Discover
routing.addRoute('/discover/recommended', () => ProfileFragment);
routing.addRoute('/discover/groups', () => ProfileFragment);
routing.addRoute('/discover/communities', () => ProfileFragment);
routing.addRoute('/discover/people', () => ProfileFragment);
routing.addRoute('/discover/organizations', () => ProfileFragment);
routing.addRoute('/discover/explore', () => ProfileFragment);

// Settings
routing.addRoute('/settings/profile', () => ProfileFragment);
routing.addRoute('/settings/notifications', () => NotificationFragment);
routing.addRoute('/settings/appearance', () => AppearanceFragment);

// Profile
routing.addRoute('/:shortname', () => ShortnameFragment);

export const Routing = routing;