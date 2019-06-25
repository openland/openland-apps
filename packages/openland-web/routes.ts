import * as NRoutes from 'next-routes';

let routes = NRoutes();

//
// Landing
//

routes.add('/about', '/landing/about');
routes.add('/about/', '/landing/about');
routes.add('/terms', '/landing/terms');
routes.add('/terms/', '/landing/terms');
routes.add('/privacy', '/landing/privacy');
routes.add('/privacy/', '/landing/privacy');

//
// App Root
//

routes.add('/', '/init/root');
routes.add('/signup', '/init/signin');
routes.add('/signup/', '/init/signin');
routes.add('/signin', '/init/signin');
routes.add('/signin/', '/init/signin');
routes.add('/signin/invite', '/init/signin');
routes.add('/signin/invite/', '/init/signin');
routes.add('/activation', '/init/activation');
routes.add('/activation/', '/init/activation');
routes.add('/need_info', '/init/need_info');
routes.add('/need_info/', '/init/need_info');
routes.add('/waitlist', '/init/waitlist');
routes.add('/waitlist/', '/init/waitlist');
routes.add('/suspended', '/init/suspended');
routes.add('/suspended/', '/init/suspended');
routes.add('/createProfile', '/init/createProfile');
routes.add('/createProfile/', '/init/createProfile');
routes.add('/createOrganization', '/init/createOrganization');
routes.add('/createOrganization/', '/init/createOrganization');
routes.add('/404', '/404');

//
// Settings
//

routes.add('/settings/profile', '/main/settings/profile');
routes.add('/settings/profile/', '/main/settings/profile');
routes.add('/settings/notifications', '/main/settings/notifications');
routes.add('/settings/notifications/', '/main/settings/notifications');
routes.add('/settings/appearance', '/main/settings/appearance');
routes.add('/settings/appearance/', '/main/settings/appearance');
routes.add('/settings/apps', '/main/settings/apps');
routes.add('/settings/apps/', '/main/settings/apps');
routes.add('/settings/dev', '/main/settings/developer');
routes.add('/settings/dev/', '/main/settings/developer');
routes.add('/settings/organization/:organizationId', '/main/settings/organization');
routes.add('/settings/organization/:organizationId/', '/main/settings/organization');

//
// Experimental
//

routes.add('/feed', '/main/feed/root');
routes.add('/apps', '/main/apps/apps');
routes.add('/apps/', '/main/apps/apps');
routes.add('/apps/:appId', '/main/apps/apps');
routes.add('/apps/:appId/', '/main/apps/apps');
routes.add('/apps/:appId/*', '/main/apps/apps');

//
// Discover
//

routes.add('/directory', '/main/discover/root');
routes.add('/directory/', '/main/discover/root');
routes.add('/discover', '/main/discover/root');
routes.add('/discover/', '/main/discover/root');
routes.add('/discover/people', '/main/discover/people');
routes.add('/discover/people/', '/main/discover/people');
routes.add('/discover/organizations', '/main/discover/organizations');
routes.add('/discover/organizations/', '/main/discover/organizations');
routes.add('/discover/communities', '/main/discover/communities');
routes.add('/discover/communities/', '/main/discover/communities');
routes.add('/discover/recommended', '/main/discover/discover');
routes.add('/discover/recommended/', '/main/discover/discover');
routes.add('/discover/explore', '/main/discover/explore');
routes.add('/discover/expslore/', '/main/discover/explore');
routes.add('/directory/r/:conversationId', '/main/discover/root');
routes.add('/directory/r/:conversationId/', '/main/discover/root');
routes.add('/directory/p/:conversationId', '/main/discover/root');
routes.add('/directory/p/:conversationId/', '/main/discover/root');
routes.add('/directory/u/:userId', '/main/discover/people');
routes.add('/directory/u/:userId/', '/main/discover/people');
routes.add('/directory/o/:organizationId', '/main/discover/organizations');
routes.add('/directory/o/:organizationId/', '/main/discover/organizations');
routes.add('/directory/c/:organizationId', '/main/discover/communities');
routes.add('/directory/c/:organizationId/', '/main/discover/communities');

//
// Onboardinng
//

routes.add('/onboarding/start', '/onboarding/start');
routes.add('/onboarding/start/', '/onboarding/start/');
routes.add('/onboarding/areas-of-work', '/onboarding/areas-of-work');
routes.add('/onboarding/areas-of-work/', '/onboarding/areas-of-work/');
routes.add('/onboarding/choose-role', '/onboarding/choose-role');
routes.add('/onboarding/choose-role/', '/onboarding/choose-role/');
routes.add('/onboarding/priorities', '/onboarding/priorities');
routes.add('/onboarding/priorities/', '/onboarding/priorities/');
routes.add('/onboarding/discover', '/onboarding/discover');
routes.add('/onboarding/discover/', '/onboarding/discover/');

//
// Profiles
//

routes.add('/o/:organizationId', '/main/profile/organization');
routes.add('/o/:organizationId/', '/main/profile/organization');
routes.add('/o/:organizationId/listings', '/main/profile/organization');
routes.add('/o/:organizationId/listings/', '/main/profile/organization');
routes.add('/o/:organizationId/listings', '/main/profile/organization');
routes.add('/o/:organizationId/listings/all', '/main/profile/organization');
routes.add('/o/:organizationId/listings/all/', '/main/profile/organization');

///
/// Invites
///

routes.add('/join/:inviteKey', '/init/resolveInvite');
routes.add('/join/:inviteKey/', '/init/resolveInvite');
routes.add('/invite/:inviteKey', '/init/resolveInvite');
routes.add('/invite/:inviteKey/', '/init/resolveInvite');
routes.add('/resolveInvite/:inviteKey', '/init/resolveInvite');
routes.add('/resolveInvite/:inviteKey/', '/init/resolveInvite');
routes.add('/joinChannel/:inviteKey', '/init/resolveInvite');
routes.add('/joinChannel/:inviteKey/', '/init/resolveInvite');
routes.add('/resolveInvite/:inviteKey', '/init/resolveInvite');
routes.add('/resolveInvite/:inviteKey/', '/init/resolveInvite');
routes.add('/acceptChannelInvite/:invite', '/init/acceptChannelInvite');
routes.add('/acceptChannelInvite/:invite/', '/init/acceptChannelInvite');
routes.add('/invitePeople', '/main/mail/invitePeople');
routes.add('/invitePeople/', '/main/mail/invitePeople');
routes.add('/inviteFriends', '/main/mail/inviteFriends');
routes.add('/inviteFriends/', '/main/mail/inviteFriends');

//
// Mail
//

routes.add('/mail', '/main/mail/root');
routes.add('/mail/', '/main/mail/root');
routes.add('/mail/create', '/main/mail/createGroup');
routes.add('/mail/create/', '/main/mail/createGroup');
routes.add('/mail/createCommunity', '/main/mail/createCommunity');
routes.add('/mail/createCommunity/', '/main/mail/createCommunity');
routes.add('/mail/createOrganization', '/main/mail/createOrganization');
routes.add('/mail/createOrganization/', '/main/mail/createOrganization');
routes.add('/mail/:conversationId', '/main/mail/root');
routes.add('/mail/:conversationId/', '/main/mail/root');
routes.add('/mail/joinChannel/:inviteKey', '/main/mail/root');
routes.add('/mail/joinChannel/:inviteKey/', '/main/mail/root');
routes.add('/mail/join/:inviteKey', '/main/mail/root');
routes.add('/mail/join/:inviteKey/', '/main/mail/root');
routes.add('/mail/invite/:inviteKey', '/main/mail/root');
routes.add('/mail/invite/:inviteKey/', '/main/mail/root');
routes.add('/mail/o/:organizationId', '/main/mail/root');
routes.add('/mail/o/:organizationId/', '/main/mail/root');
routes.add('/mail/p/:conversationId', '/main/mail/root');
routes.add('/mail/p/:conversationId/', '/main/mail/root');
routes.add('/mail/u/:userId', '/main/mail/root');
routes.add('/mail/u/:userId/', '/main/mail/root');
routes.add('/notifications/comments', '/main/mail/root');
routes.add('/notifications/comments/', '/main/mail/root');

//
// UI
//

routes.add('/ui', '/dev/ui/buttons');
routes.add('/ui/', '/dev/ui/buttons');
routes.add('/ui/inputs', '/dev/ui/inputs');
routes.add('/ui/inputs/', '/dev/ui/inputs');
routes.add('/ui/typography', '/dev/ui/typography');
routes.add('/ui/typography/', '/dev/ui/typography');
routes.add('/ui/grid', '/dev/ui/grid');
routes.add('/ui/grid/', '/dev/ui/grid');
routes.add('/ui/map', '/dev/ui/map');
routes.add('/ui/map/', '/dev/ui/map');
routes.add('/ui/bullets', '/dev/ui/bullet');
routes.add('/ui/bullets/', '/dev/ui/bullet');
routes.add('/ui/tabs', '/dev/ui/tabs');
routes.add('/ui/tabs/', '/dev/ui/tabs');
routes.add('/ui/switchers', '/dev/ui/switcher');
routes.add('/ui/switchers/', '/dev/ui/switcher');
routes.add('/ui/sliders', '/dev/ui/slider');
routes.add('/ui/sliders/', '/dev/ui/sliders');
routes.add('/ui/tables', '/dev/ui/tables');
routes.add('/ui/tables/', '/dev/ui/tables');
routes.add('/ui/properties', '/dev/ui/property');
routes.add('/ui/properties/', '/dev/ui/property');
routes.add('/ui/animations', '/dev/ui/animations');
routes.add('/ui/animations/', '/dev/ui/animations');
routes.add('/ui/radios', '/dev/ui/radio');
routes.add('/ui/radios/', '/dev/ui/radios');
routes.add('/ui/checkbox', '/dev/ui/checkbox');
routes.add('/ui/checkbox/', '/dev/ui/checkbox');
routes.add('/ui/select', '/dev/ui/select');
routes.add('/ui/select/', '/dev/ui/select');
routes.add('/ui/modals', '/dev/ui/modals');
routes.add('/ui/modals/', '/dev/ui/modals');
routes.add('/ui/popper', '/dev/ui/popper');
routes.add('/ui/popper/', '/dev/ui/popper');
routes.add('/ui/userpopper', '/dev/ui/userpopper');
routes.add('/ui/userpopper/', '/dev/ui/userpopper');
routes.add('/ui/messenger/MessageFileComponent', '/dev/ui/messenger/MessageFileComponent');
routes.add('/ui/messenger/MessageFileComponent/', '/dev/ui/messenger/MessageFileComponent');
routes.add('/ui/messenger/MessageImageComponent', '/dev/ui/messenger/MessageImageComponent');
routes.add('/ui/messenger/MessageImageComponent/', '/dev/ui/messenger/MessageImageComponent');
routes.add('/ui/messenger/MessageIntroComponent', '/dev/ui/messenger/MessageIntroComponent');
routes.add('/ui/messenger/MessageIntroComponent/', '/dev/ui/messenger/MessageIntroComponent');
routes.add('/ui/messenger/MessageComponent', '/dev/ui/messenger/MessageComponent');
routes.add('/ui/messenger/MessageComponent/', '/dev/ui/messenger/MessageComponent');
routes.add('/ui/messenger/MessageReplyComponent', '/dev/ui/messenger/MessageReplyComponent');
routes.add('/ui/messenger/MessageReplyComponent/', '/dev/ui/messenger/MessageReplyComponent');
routes.add(
    '/ui/messenger/MessageWithMentionsTextComponent',
    '/dev/ui/messenger/MessageWithMentionsTextComponent',
);
routes.add(
    '/ui/messenger/MessageWithMentionsTextComponent/',
    '/dev/ui/messenger/MessageWithMentionsTextComponent',
);
routes.add('/ui/avatar', '/dev/ui/avatar');
routes.add('/ui/avatar/', '/dev/ui/avatar');
routes.add('/ui/links', '/dev/ui/links');
routes.add('/ui/links/', '/dev/ui/links');
routes.add('/ui/tasks', '/dev/ui/tasks');
routes.add('/ui/tasks/', '/dev/ui/tasks');
routes.add('/ui/files', '/dev/ui/files');
routes.add('/ui/files/', '/dev/ui/files');
routes.add('/ui/store', '/dev/ui/store');
routes.add('/ui/store/', '/dev/ui/store');
routes.add('/ui/loaders', '/dev/ui/loaders');
routes.add('/ui/loaders/', '/dev/ui/loaders');
routes.add('/ui/forms', '/dev/ui/forms');
routes.add('/ui/forms/', '/dev/ui/forms');
routes.add('/ui/tags', '/dev/ui/tags');
routes.add('/ui/tags/', '/dev/ui/tags');
routes.add('/ui/linear', '/dev/ui/linear');
routes.add('/ui/linear/', '/dev/ui/linear');
routes.add('/ui/mapPicker', '/dev/ui/mapPicker');
routes.add('/ui/mapPicker/', '/dev/ui/mapPicker');
routes.add('/ui/scroll', '/dev/ui/scroll');
routes.add('/ui/scroll/', '/dev/ui/scroll');
routes.add('/ui/subscriptions', '/dev/ui/subscriptions');
routes.add('/ui/subscriptions/', '/dev/ui/subscriptions');
routes.add('/ui/menu-items', '/dev/ui/menu-items');
routes.add('/ui/menu-items/', '/dev/ui/menu-items');
routes.add('/ui/profile', '/dev/ui/profile');
routes.add('/ui/profile/', '/dev/ui/profile');
routes.add('/ui/userprofile', '/dev/ui/userprofile');
routes.add('/ui/userprofile/', '/dev/ui/userprofile');
routes.add('/ui/userprofile-my', '/dev/ui/userprofile-my');
routes.add('/ui/userprofile-my/', '/dev/ui/userprofile-my');
routes.add('/ui/lists', '/dev/ui/lists');
routes.add('/ui/lists/', '/dev/ui/lists');
routes.add('/ui/emoji', '/dev/ui/emoji');
routes.add('/ui/emoji/', '/dev/ui/emoji');
routes.add('/ui/rich', '/dev/ui/rich/rich');
routes.add('/ui/rich/', '/dev/ui/rich/rich');

routes.add('/ui/signin/signin-invite', '/dev/ui/signin/signin-invite');
routes.add('/ui/signin/accept-invitation', '/dev/ui/signin/accept-invitation');
routes.add('/ui/signin/auth-mechanism', '/dev/ui/signin/auth-mechanism');
routes.add('/ui/signin/create-with-email', '/dev/ui/signin/create-with-email');
routes.add('/ui/signin/activation-code', '/dev/ui/signin/activation-code');
routes.add('/ui/signin/create-profile', '/dev/ui/signin/create-profile');
routes.add('/ui/signin/create-organization', '/dev/ui/signin/create-organization');
routes.add('/ui/shortcuts', '/dev/ui/shortcuts');
routes.add('/ui/shortcuts/', '/dev/ui/shortcuts');
routes.add('/ui/spans', '/dev/ui/spans');
routes.add('/ui/spans/', '/dev/ui/spans');

//
// Dev Tools
//

routes.add('/super/mails', '/dev/mails');
routes.add('/super/mails/', '/dev/mails');

routes.add('/super/debug', '/dev/debug');
routes.add('/super/debug/', '/dev/debug');

routes.add('/super', '/dev/orgs');
routes.add('/super/', '/dev/orgs');
routes.add('/super/users', '/dev/users');
routes.add('/super/users/', '/dev/users');
routes.add('/super/orgs/:accountId', '/dev/orgView');
routes.add('/super/orgs/:accountId/', '/dev/orgView');

routes.add('/super/admins', '/dev/admins');
routes.add('/super/admins/', '/dev/admins');

routes.add('/compatibility', '/perf/compat');
routes.add('/performance', '/perf/perf');

routes.add('/test', '/dev/test');

//
// Authentication
//

routes.add('auth/login');
routes.add('auth/logout');
routes.add('auth/complete');

//
// Shortnames
//

routes.add('/:shortname', '/main/profile/shortname');
routes.add('/:shortname/', '/main/profile/shortname');

export function getRequestHandler(src: any): any {
    return routes.getRequestHandler(src);
}

export const Link = routes.Link;
export const Router = routes.Router;
export const Routes = routes;
