import * as React from 'react';
import { URouting } from 'openland-unicorn/URouting';
import { ShortnameFragment } from 'openland-web/fragments/shortname/ShortnameFragment';
import { MessengerFragment } from 'openland-web/fragments/chat/MessengerFragment';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { SettingsProfileFragment } from 'openland-web/fragments/account/SettingsProfileFragment';
import { SettingsAppearanceFragment } from 'openland-web/fragments/account/SettingsAppearanceFragment';
import { RecommendationsFragment } from 'openland-web/fragments/discover/RecommendationsFragment';
import { DiscoverHomeFragment } from 'openland-web/fragments/discover/DiscoverHomeFragment';
import { DiscoverGroupsFragment } from 'openland-web/fragments/discover/DiscoverGroupsFragment';
import { SettingsNotificationsFragment } from 'openland-web/fragments/account/SettingsNotificationsFragment';
import { SettingsEmailFragment } from 'openland-web/fragments/account/SettingsEmailFragment';
import { NotificationsFragment } from 'openland-web/fragments/notifications/NofiticationsFragment';
import { DownloadAppsFragment } from 'openland-web/fragments/account/SettingsDownloadAppsFragment';
import { InviteFriendsFragment } from 'openland-web/fragments/account/SettingsInviteFriendsFragment';
import { GroupProfileFragment } from 'openland-web/fragments/group/GroupProfileFragment';
import { MemberProfileFragment } from 'openland-web/fragments/group/MemberProfileFragment';
import { MemberProfileEditFragment } from 'openland-web/fragments/group/MemberProfileEditFragment';
import { MessageFragment } from 'openland-web/fragments/message/MessageFragment';
import { FeedFragment } from 'openland-web/fragments/feed/FeedFragment';
import { WalletFragment } from 'openland-web/fragments/wallet/WalletFragment';
import { SubscriptionsFragment } from 'openland-web/fragments/wallet/SubscriptionsFragment';
import { AdvancedSettingsFragment } from 'openland-web/fragments/chat/AdvancedSettingsFragment';
import { MatchmakingFragment } from 'openland-web/fragments/matchmaking/MatchmakingFragment';
import { MatchmakingStartFragment } from 'openland-web/fragments/matchmaking/MatchmakingStartFragment';
import { MatchmakingCreatedFragment } from 'openland-web/fragments/matchmaking/MatchmakingCreatedFragment';
import { MatchmakingUsersFragment } from 'openland-web/fragments/matchmaking/MatchmakingUsersFragment';
import { MatchmakingAppFragment } from 'openland-web/fragments/matchmaking/MatchmakingAppFragment';
import { FeedItemFragment } from 'openland-web/fragments/feed/FeedItemFragment';
import { useStackRouter } from 'openland-unicorn/components/StackRouter';
import { SharedMediaFragment } from 'openland-web/fragments/chat/sharedMedia/SharedMediaFragment';
import { SettingsAboutFragment } from 'openland-web/fragments/account/SettingsAboutFragment';
import { InviteLandingComponent } from 'openland-web/fragments/invite/InviteLandingComponent';
import { UserProfileFragment } from 'openland-web/fragments/shortname/UserProfileFragment';
// import { useTabRouter } from 'openland-unicorn/components/TabLayout';
import { DiscoverPopularNowFragment } from 'openland-web/fragments/discover/DiscoverPopularNowFragment';
import { DiscoverNewAndGrowingFragment } from 'openland-web/fragments/discover/DiscoverNewAndGrowingFragment';
import { DiscoverCollectionsFragment } from 'openland-web/fragments/discover/DiscoverCollectionsFragment';
import { DiscoverTopPremiumFragment } from 'openland-web/fragments/discover/DiscoverTopPremiumFragment';
import { DiscoverTopFreeFragment } from 'openland-web/fragments/discover/DiscoverTopFreeFragment';
import { DiscoverCollectionFragment } from 'openland-web/fragments/discover/DiscoverCollectionFragment';

// temporary stub for /mail/ -> not found bug
const TemporaryStubMail = React.memo(() => {
    const stackRouter = useStackRouter();

    React.useEffect(() => {
        stackRouter.reset();
    }, []);

    return null;
});

// const RedirectStubDiscover = React.memo(() => {
//     const router = useTabRouter();
//     React.useEffect(() => {
//         let timer: any;
//         if (router) {
//             router.router.switchTab(0);
//             timer = setTimeout(() => {
//                 if (router) {
//                     router.router.navigate('/discover');
//                 }
//             }, 20);
//         }
//
//         return () => clearTimeout(timer);
//     }, []);
//
//     return null;
// });

const routing = new URouting();

// Mail
routing.addRoute('/mail', () => TemporaryStubMail);
routing.addRoute('/mail/', () => TemporaryStubMail);
routing.addRoute('/mail/:conversationId', () =>
    React.memo(() => {
        let ctx = useUnicorn();
        return <MessengerFragment id={ctx.id!} />;
    }),
);
routing.addRoute('/mail/:id/shared', () => SharedMediaFragment);

// Message
routing.addRoute('/message/:messageId', () => MessageFragment);
routing.addRoute('/message/:messageId/comment/:commentId', () => MessageFragment);

// Notifications
routing.addRoute('/notifications', () => NotificationsFragment);

// Discover
routing.addRoute('/feed', () => FeedFragment);
routing.addRoute('/feed/:postId', () => FeedItemFragment);
routing.addRoute('/feed/:postId/comment/:commentId', () => FeedItemFragment);
routing.addRoute('/discover', () => DiscoverHomeFragment);
routing.addRoute('/discover/', () => DiscoverHomeFragment);
routing.addRoute('/discover/home', () => DiscoverHomeFragment);
routing.addRoute('/discover/recommendations', () => RecommendationsFragment);
routing.addRoute('/discover/groups', () => DiscoverGroupsFragment);
routing.addRoute('/discover/popular', () => DiscoverPopularNowFragment);
routing.addRoute('/discover/new', () => DiscoverNewAndGrowingFragment);
routing.addRoute('/discover/collections', () => DiscoverCollectionsFragment);
routing.addRoute('/discover/collections/:collectionId', () => DiscoverCollectionFragment);
routing.addRoute('/discover/premium', () => DiscoverTopPremiumFragment);
routing.addRoute('/discover/free', () => DiscoverTopFreeFragment);

// Account
routing.addRoute('/account', () => UserProfileFragment);
routing.addRoute('/account/me', () => UserProfileFragment);
routing.addRoute('/account/profile', () => SettingsProfileFragment);
routing.addRoute('/account/notifications', () => SettingsNotificationsFragment);
routing.addRoute('/account/email', () => SettingsEmailFragment);
routing.addRoute('/account/appearance', () => SettingsAppearanceFragment);
routing.addRoute('/account/download', () => DownloadAppsFragment);
routing.addRoute('/account/invites', () => InviteFriendsFragment);
routing.addRoute('/account/about', () => SettingsAboutFragment);

// Wallet
routing.addRoute('/wallet', () => WalletFragment);
routing.addRoute('/subscriptions', () => SubscriptionsFragment);

// Profile
routing.addRoute('/group/:id', () => GroupProfileFragment);
routing.addRoute('/group/:id/user/:uid', () => MemberProfileFragment);
routing.addRoute('/group/:id/myprofile/edit', () => MemberProfileEditFragment);
routing.addRoute('/group/:id/users', () => MatchmakingUsersFragment);
routing.addRoute('/:shortname', () => ShortnameFragment);

// Advanced settings
routing.addRoute('/advanced/:id', () => AdvancedSettingsFragment);

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
