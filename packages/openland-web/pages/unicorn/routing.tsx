import * as React from 'react';
import { URouting } from 'openland-unicorn/URouting';
import { ShortnameFragment } from 'openland-web/fragments/shortname/ShortnameFragment';
import { MessengerFragment } from 'openland-web/fragments/chat/MessengerFragment';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { SettingsProfileFragment } from 'openland-web/fragments/account/SettingsProfileFragment';
import { SettingsAppearanceFragment } from 'openland-web/fragments/account/SettingsAppearanceFragment';
import { RecommendedFragment } from 'openland-web/fragments/discover/RecommendedFragment';
import { DiscoverGroupsFragment } from 'openland-web/fragments/discover/DiscoverGroupsFragment';
import { SettingsNotificationsFragment } from 'openland-web/fragments/account/SettingsNotificationsFragment';
import { NotificationsFragment } from 'openland-web/fragments/notifications/NofiticationsFragment';
import { DownloadAppsFragment } from 'openland-web/fragments/account/SettingsDownloadAppsFragment';
import { InviteFriendsFragment } from 'openland-web/fragments/account/SettingsInviteFriendsFragment';
import { InviteLandingComponent } from 'openland-web/fragments/invite/InviteLandingComponent';
import { GroupProfileFragment } from 'openland-web/fragments/group/GroupProfileFragment';
import { MessageFragment } from 'openland-web/fragments/message/MessageFragment';

const routing = new URouting();

// Mail
routing.addRoute('/mail/:conversationId', () =>
    React.memo(() => {
        let ctx = useUnicorn();
        return (<MessengerFragment id={ctx.id!} />);
    })
);

// Message
routing.addRoute('/message/:id', () => MessageFragment);

// Notifications
routing.addRoute('/notifications', () => NotificationsFragment);

// Discover
routing.addRoute('/discover/recommended', () => RecommendedFragment);
routing.addRoute('/discover/groups', () => DiscoverGroupsFragment);

// Settings
routing.addRoute('/settings/profile', () => SettingsProfileFragment);
routing.addRoute('/settings/notifications', () => SettingsNotificationsFragment);
routing.addRoute('/settings/appearance', () => SettingsAppearanceFragment);
routing.addRoute('/settings/download', () => DownloadAppsFragment);
routing.addRoute('/settings/invites', () => InviteFriendsFragment);

// Profile
routing.addRoute('/group/:id', () => GroupProfileFragment);
routing.addRoute('/:shortname', () => ShortnameFragment);

// Invites
routing.addRoute('/invite/:invite', () => InviteLandingComponent);
routing.addRoute('/join/:invite', () => InviteLandingComponent);

export const Routing = routing;