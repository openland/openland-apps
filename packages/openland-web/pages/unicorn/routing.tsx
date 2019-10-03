import * as React from 'react';
import { URouting } from 'openland-unicorn/URouting';
import { ShortnameFragment } from 'openland-web/fragments/shortname/ShortnameFragment';
import { MessengerFragment } from 'openland-web/fragments/chat/MessengerFragment';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { SettingsProfileFragment } from 'openland-web/fragments/account/SettingsProfileFragment';
import { SettingsAppearanceFragment } from 'openland-web/fragments/account/SettingsAppearanceFragment';
import { RecommendationsFragment } from 'openland-web/fragments/discover/RecommendationsFragment';
import { DiscoverGroupsFragment } from 'openland-web/fragments/discover/DiscoverGroupsFragment';
import { SettingsNotificationsFragment } from 'openland-web/fragments/account/SettingsNotificationsFragment';
import { SettingsEmailFragment } from 'openland-web/fragments/account/SettingsEmailFragment';
import { NotificationsFragment } from 'openland-web/fragments/notifications/NofiticationsFragment';
import { DownloadAppsFragment } from 'openland-web/fragments/account/SettingsDownloadAppsFragment';
import { InviteFriendsFragment } from 'openland-web/fragments/account/SettingsInviteFriendsFragment';
import { InviteLandingComponent } from 'openland-web/fragments/invite/InviteLandingComponent';
import { GroupProfileFragment } from 'openland-web/fragments/group/GroupProfileFragment';
import { MessageFragment } from 'openland-web/fragments/message/MessageFragment';
import { FeedFragment } from 'openland-web/fragments/feed/FeedFragment';
import { SettingsFinanceFragment } from 'openland-web/fragments/finance/SettingsFinanceFragment';
import { MatchmakingFragment } from 'openland-web/fragments/matchmaking/MatchmakingFragment';
import { MatchmakingStartFragment } from 'openland-web/fragments/matchmaking/MatchmakingStartFragment';
import { MatchmakingCreatedFragment } from 'openland-web/fragments/matchmaking/MatchmakingCreatedFragment';
import { MatchmakingUsersFragment } from 'openland-web/fragments/matchmaking/MatchmakingUsersFragment';
import { MatchmakingAppFragment } from 'openland-web/fragments/matchmaking/MatchmakingAppFragment';
import { FeedItemFragment } from 'openland-web/fragments/feed/FeedItemFragment';

const routing = new URouting();

// Mail
routing.addRoute('/mail/:conversationId', () =>
    React.memo(() => {
        let ctx = useUnicorn();
        return <MessengerFragment id={ctx.id!} />;
    }),
);

// Message
routing.addRoute('/message/:id', () => MessageFragment);

// Notifications
routing.addRoute('/notifications', () => NotificationsFragment);

// Discover
routing.addRoute('/feed', () => FeedFragment);
routing.addRoute('/feed/:id', () => FeedItemFragment);
routing.addRoute('/discover/recommendations', () => RecommendationsFragment);
routing.addRoute('/discover/groups', () => DiscoverGroupsFragment);

// Settings
routing.addRoute('/settings/profile', () => SettingsProfileFragment);
routing.addRoute('/settings/notifications', () => SettingsNotificationsFragment);
routing.addRoute('/settings/email', () => SettingsEmailFragment);
routing.addRoute('/settings/appearance', () => SettingsAppearanceFragment);
routing.addRoute('/settings/download', () => DownloadAppsFragment);
routing.addRoute('/settings/invites', () => InviteFriendsFragment);
routing.addRoute('/settings/finance', () => SettingsFinanceFragment);

// Profile
routing.addRoute('/group/:id', () => GroupProfileFragment);
routing.addRoute('/:shortname', () => ShortnameFragment);

// Invites
routing.addRoute('/invite/:invite', () => InviteLandingComponent);
routing.addRoute('/join/:invite', () => InviteLandingComponent);

//
// Backward compatibility
//

// Profile
routing.addRoute('/mail/u/:id', () => ShortnameFragment);
routing.addRoute('/mail/o/:id', () => ShortnameFragment);
routing.addRoute('/mail/c/:id', () => ShortnameFragment);
routing.addRoute('/direcory/u/:id', () => ShortnameFragment);
routing.addRoute('/direcory/o/:id', () => ShortnameFragment);
routing.addRoute('/direcory/c/:id', () => ShortnameFragment);

// Matchmaking
routing.addRoute('/matchmaking/:roomId/start', () => MatchmakingStartFragment);
routing.addRoute('/matchmaking/:roomId/ask/:res', () => MatchmakingFragment);
routing.addRoute('/matchmaking/:roomId/created', () => MatchmakingCreatedFragment);
routing.addRoute('/matchmaking/:roomId/users', () => MatchmakingUsersFragment);
routing.addRoute('/matchmaking/:roomId/install', () => MatchmakingAppFragment);

export const Routing = routing;
