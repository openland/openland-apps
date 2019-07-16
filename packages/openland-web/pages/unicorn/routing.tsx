import * as React from 'react';
import { URouting } from 'openland-unicorn/URouting';
import { ProfileTab } from 'openland-web/fragments/account/ProfileTab';
import { Notifications } from 'openland-web/fragments/account/Notifications';
import { AppearanceTab } from 'openland-web/fragments/account/AppearanceTab';
import { ShortnameFragment } from 'openland-web/fragments/profile/ShortnameFragment';
import { MessengerFragment } from 'openland-web/fragments/MessengerFragment';
import { useUnicorn } from 'openland-unicorn/useUnicorn';

const routing = new URouting();

// Mail
routing.addRoute('/mail/:conversationId', () =>
    React.memo(() => {
        let ctx = useUnicorn();
        return (<MessengerFragment id={ctx.id!} />);
    })
);

// Discover
routing.addRoute('/discover/recommended', () => ProfileTab);
routing.addRoute('/discover/groups', () => ProfileTab);
routing.addRoute('/discover/communities', () => ProfileTab);
routing.addRoute('/discover/people', () => ProfileTab);
routing.addRoute('/discover/organizations', () => ProfileTab);
routing.addRoute('/discover/explore', () => ProfileTab);

// Settings
routing.addRoute('/settings/profile', () => ProfileTab);
routing.addRoute('/settings/notifications', () => Notifications);
routing.addRoute('/settings/appearance', () => AppearanceTab);

// Profile
routing.addRoute('/:shortname', () => ShortnameFragment);

export const Routing = routing;