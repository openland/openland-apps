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
routes.add('/download', '/landing/download');
routes.add('/download/', '/landing/download');

//
// App Root
//

routes.add('/', '/init/root');
routes.add('/signup', '/auth/root');
routes.add('/signup/', '/auth/root');
routes.add('/signin', '/auth/root');
routes.add('/signin/', '/auth/root');
routes.add('/signin/invite', '/auth/root');
routes.add('/signin/invite/', '/auth/root');
routes.add('/activation', '/init/activation');
routes.add('/activation/', '/init/activation');
routes.add('/need_info', '/init/need_info');
routes.add('/need_info/', '/init/need_info');
routes.add('/waitlist', '/init/waitlist');
routes.add('/waitlist/', '/init/waitlist');
routes.add('/suspended', '/init/suspended');
routes.add('/suspended/', '/init/suspended');
routes.add('/createProfile', '/auth/root');
routes.add('/createProfile/', '/auth/root');
routes.add('/createOrganization', '/auth/root');
routes.add('/createOrganization/', '/auth/root');
routes.add('/404', '/404');

//
// Settings
//

routes.add('/settings/apps', '/main/settings/apps');
routes.add('/settings/apps/', '/main/settings/apps');

//
// Discover
//

routes.add('/discover/recommended', '/unicorn/index');
routes.add('/discover/groups', '/unicorn/index');
routes.add('/discover/communities', '/unicorn/index');
routes.add('/discover/people', '/unicorn/index');
routes.add('/discover/organizations', '/unicorn/index');
routes.add('/discover/explore', '/unicorn/index');

//
// Onboardinng
//

routes.add('/onboarding/start', '/onboarding/start');
routes.add('/onboarding/start/', '/onboarding/start/');
routes.add('/onboarding/chats-for-you', '/onboarding/chats-for-you');
routes.add('/onboarding/chats-for-you/', '/onboarding/chats-for-you/');
routes.add('/onboarding/discover', '/onboarding/discover');
routes.add('/onboarding/discover/', '/onboarding/discover/');

//
// Invites
//

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
routes.add('/inviteFriends', '/main/mail/inviteFriends');
routes.add('/inviteFriends/', '/main/mail/inviteFriends');

//
// Mail
//

// Old Modals
routes.add('/mail/create', '/main/mail/createGroup');
routes.add('/mail/create/', '/main/mail/createGroup');
routes.add('/mail/createCommunity', '/main/mail/createCommunity');
routes.add('/mail/createCommunity/', '/main/mail/createCommunity');
routes.add('/mail/createOrganization', '/main/mail/createOrganization');
routes.add('/mail/createOrganization/', '/main/mail/createOrganization');

// Joins
routes.add('/mail/joinChannel/:inviteKey', '/main/mail/root');
routes.add('/mail/joinChannel/:inviteKey/', '/main/mail/root');
routes.add('/mail/join/:inviteKey', '/main/mail/root');
routes.add('/mail/join/:inviteKey/', '/main/mail/root');
routes.add('/mail/invite/:inviteKey', '/main/mail/root');
routes.add('/mail/invite/:inviteKey/', '/main/mail/root');

// Profiles
// routes.add('/mail/o/:organizationId', '/main/mail/root');
// routes.add('/mail/o/:organizationId/', '/main/mail/root');
// routes.add('/mail/p/:conversationId', '/main/mail/root');
// routes.add('/mail/p/:conversationId/', '/main/mail/root');
// routes.add('/mail/u/:userId', '/main/mail/root');
// routes.add('/mail/u/:userId/', '/main/mail/root');

routes.add('/mail', '/unicorn/index');
routes.add('/mail/', '/unicorn/index');
routes.add('/mail/:conversationId', '/unicorn/index');
routes.add('/mail/:conversationId/', '/unicorn/index');
routes.add('/notifications', '/unicorn/index');
routes.add('/notifications/', '/unicorn/index');

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

routes.add('/unicorn', '/unicorn/index');
routes.add('/unicorn/', '/unicorn/index');

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
// Account
//

// routes.add('/settings', '/account/root');
// routes.add('/settings/profile', '/account/root');
// routes.add('/settings/appearance', '/account/root');
// routes.add('/settings/notifications', '/account/root');

routes.add('/settings', '/unicorn/index');
routes.add('/settings/profile', '/unicorn/index');
routes.add('/settings/appearance', '/unicorn/index');
routes.add('/settings/notifications', '/unicorn/index');

//
// Authentication
//

routes.add('auth/login');
routes.add('auth/logout');
routes.add('auth/complete');

//
routes.add('/authorization', '/auth/root');
routes.add('/authorization/:step', '/auth/root');

//
// Shortnames
//

routes.add('/:shortname', '/unicorn/index');
routes.add('/:shortname/', '/unicorn/index');

export function getRequestHandler(src: any): any {
    return routes.getRequestHandler(src);
}

export const Link = routes.Link;
export const Router = routes.Router;
export const Routes = routes;
