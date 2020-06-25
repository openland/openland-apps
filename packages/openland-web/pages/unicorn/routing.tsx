import * as React from 'react';
import { URouting } from 'openland-unicorn/URouting';
import { ShortnameFragment } from 'openland-web/fragments/shortname/ShortnameFragment';
import { MessengerFragment } from 'openland-web/fragments/chat/MessengerFragment';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { SettingsProfileFragment } from 'openland-web/fragments/settings/SettingsProfileFragment';
import { SettingsPrivacyFragment } from 'openland-web/fragments/settings/SettingsPrivacyFragment';
import { SettingsAppearanceFragment } from 'openland-web/fragments/settings/SettingsAppearanceFragment';
import { RecommendationsFragment } from 'openland-web/fragments/discover/RecommendationsFragment';
import { DiscoverHomeFragment } from 'openland-web/fragments/discover/DiscoverHomeFragment';
import { DiscoverGroupsFragment } from 'openland-web/fragments/discover/DiscoverGroupsFragment';
import { SettingsNotificationsFragment } from 'openland-web/fragments/settings/SettingsNotificationsFragment';
import { SettingsEmailFragment } from 'openland-web/fragments/settings/SettingsEmailFragment';
import { NotificationsFragment } from 'openland-web/fragments/notifications/NofiticationsFragment';
import { DownloadAppsFragment } from 'openland-web/fragments/settings/SettingsDownloadAppsFragment';
import { InviteFriendsFragment } from 'openland-web/fragments/settings/SettingsInviteFriendsFragment';
import { GroupProfileFragment } from 'openland-web/fragments/group/GroupProfileFragment';
import { MessageFragment } from 'openland-web/fragments/message/MessageFragment';
import { WalletFragment } from 'openland-web/fragments/wallet/WalletFragment';
import { SubscriptionsFragment } from 'openland-web/fragments/wallet/SubscriptionsFragment';
import { useStackRouter } from 'openland-unicorn/components/StackRouter';
import { SharedMediaFragment } from 'openland-web/fragments/chat/sharedMedia/SharedMediaFragment';
import { SettingsAboutFragment } from 'openland-web/fragments/settings/SettingsAboutFragment';
import { SettingsLicensesFragment } from 'openland-web/fragments/settings/SettingsLicensesFragment';
import { InviteLandingComponent } from 'openland-web/fragments/invite/InviteLandingComponent';
import { UserProfileFragment } from 'openland-web/fragments/shortname/UserProfileFragment';
import { DiscoverPopularNowFragment } from 'openland-web/fragments/discover/DiscoverPopularNowFragment';
import { DiscoverNewAndGrowingFragment } from 'openland-web/fragments/discover/DiscoverNewAndGrowingFragment';
import { DiscoverCollectionsFragment } from 'openland-web/fragments/discover/DiscoverCollectionsFragment';
import { DiscoverTopPremiumFragment } from 'openland-web/fragments/discover/DiscoverTopPremiumFragment';
import { DiscoverTopFreeFragment } from 'openland-web/fragments/discover/DiscoverTopFreeFragment';
import { DiscoverCollectionFragment } from 'openland-web/fragments/discover/DiscoverCollectionFragment';
import { DiscussionsFragment } from 'openland-web/fragments/discussions/DiscussionsFragment';
import { DraftsFragment } from 'openland-web/fragments/discussions/DraftsFragment';
import { DiscussionEditorFragment } from 'openland-web/fragments/discussions/DiscussionEditorFragment';
// import { useTabRouter } from 'openland-unicorn/components/TabLayout';

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
//             if (!router.router.stacks[0].pages.length) {
//                 timer = setTimeout(() => {
//                     if (router) {
//                         router.router.navigate('/discover/');
//                     }
//                 }, 20);
//             }
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

// Discussions
routing.addRoute('/channels', () => DiscussionsFragment);
routing.addRoute('/channels/', () => DiscussionsFragment);
routing.addRoute('/channels/drafts', () => DraftsFragment);
routing.addRoute('/channels/drafts/', () => DraftsFragment);
routing.addRoute('/channels/edit/:id', () => DiscussionEditorFragment);
routing.addRoute('/channels/edit/:id/', () => DiscussionEditorFragment);

// Account
routing.addRoute('/account', () => UserProfileFragment);
routing.addRoute('/account/me', () => UserProfileFragment);
routing.addRoute('/account/profile', () => SettingsProfileFragment);
routing.addRoute('/account/privacy', () => SettingsPrivacyFragment);
routing.addRoute('/account/notifications', () => SettingsNotificationsFragment);
routing.addRoute('/account/email', () => SettingsEmailFragment);
routing.addRoute('/account/appearance', () => SettingsAppearanceFragment);
routing.addRoute('/account/download', () => DownloadAppsFragment);
routing.addRoute('/account/invites', () => InviteFriendsFragment);
routing.addRoute('/account/about', () => SettingsAboutFragment);
routing.addRoute('/account/licenses', () => SettingsLicensesFragment);

routing.addRoute('/settings', () => UserProfileFragment);
routing.addRoute('/settings/me', () => UserProfileFragment);
routing.addRoute('/settings/profile', () => SettingsProfileFragment);
routing.addRoute('/settings/privacy', () => SettingsPrivacyFragment);
routing.addRoute('/settings/notifications', () => SettingsNotificationsFragment);
routing.addRoute('/settings/email', () => SettingsEmailFragment);
routing.addRoute('/settings/appearance', () => SettingsAppearanceFragment);
routing.addRoute('/settings/download', () => DownloadAppsFragment);
routing.addRoute('/settings/invites', () => InviteFriendsFragment);
routing.addRoute('/settings/about', () => SettingsAboutFragment);
routing.addRoute('/settings/licenses', () => SettingsLicensesFragment);

// Wallet
routing.addRoute('/wallet', () => WalletFragment);
routing.addRoute('/subscriptions', () => SubscriptionsFragment);

// Invites
routing.addRoute('/invite/:invite', () => InviteLandingComponent);
routing.addRoute('/join/:invite', () => InviteLandingComponent);

// Profile
routing.addRoute('/group/:id', () => GroupProfileFragment);
routing.addRoute('/:shortname/:id', () => ShortnameFragment);
routing.addRoute('/:shortname', () => ShortnameFragment);

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

export const Routing = routing;
