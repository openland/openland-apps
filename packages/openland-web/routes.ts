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
// Authentication
//

routes.add('auth/login');
routes.add('auth/logout');
routes.add('auth/complete');

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
routes.add('/waitlist/', '/unicorn/index');
routes.add('/suspended', '/init/suspended');
routes.add('/suspended/', '/init/suspended');
routes.add('/createProfile', '/auth/root');
routes.add('/createProfile/', '/auth/root');
routes.add('/createOrganization', '/auth/root');
routes.add('/createOrganization/', '/auth/root');
routes.add('/404', '/404');
// Joins?
routes.add('/authorization', '/auth/root');
routes.add('/authorization/:step', '/auth/root');

//
// Discover
//

routes.add('/feed', '/unicorn/index');
routes.add('/feed/', '/unicorn/index');
routes.add('/feed/:id', '/unicorn/index');
routes.add('/feed/:id/', '/unicorn/index');
routes.add('/discover/recommendations', '/unicorn/index');
routes.add('/discover/groups', '/unicorn/index');
routes.add('/discover/communities', '/unicorn/index');
routes.add('/discover/people', '/unicorn/index');
routes.add('/discover/organizations', '/unicorn/index');

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

routes.add('/join/:inviteKey', '/unicorn/index');
routes.add('/join/:inviteKey/', '/unicorn/index');
routes.add('/invite/:inviteKey', '/unicorn/index');
routes.add('/invite/:inviteKey/', '/unicorn/index');
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
// Mail?
routes.add('/mail/joinChannel/:inviteKey', '/main/mail/root');
routes.add('/mail/joinChannel/:inviteKey/', '/main/mail/root');
routes.add('/mail/join/:inviteKey', '/main/mail/root');
routes.add('/mail/join/:inviteKey/', '/main/mail/root');
routes.add('/mail/invite/:inviteKey', '/main/mail/root');
routes.add('/mail/invite/:inviteKey/', '/main/mail/root');

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

routes.add('/mail', '/unicorn/index');
routes.add('/mail/', '/unicorn/index');
routes.add('/mail/:conversationId', '/unicorn/index');
routes.add('/mail/:conversationId/', '/unicorn/index');
routes.add('/notifications', '/unicorn/index');
routes.add('/notifications/', '/unicorn/index');

//
// UI
//

routes.add('/ui', '/dev/ui/typo');
routes.add('/ui/', '/dev/ui/typo');

routes.add('/ui/list', '/dev/ui/list');
routes.add('/ui/list/', '/dev/ui/list');

routes.add('/ui/buttons', '/dev/ui/buttons');
routes.add('/ui/buttons/', '/dev/ui/buttons');

routes.add('/ui/inputs', '/dev/ui/inputs');
routes.add('/ui/inputs/', '/dev/ui/inputs');

routes.add('/ui/modals', '/dev/ui/modals');
routes.add('/ui/modals/', '/dev/ui/modals');

routes.add('/ui/rick', '/dev/ui/rick');
routes.add('/ui/rick/', '/dev/ui/rick');

routes.add('/ui/shortcuts', '/dev/ui/shortcuts');
routes.add('/ui/shortcuts/', '/dev/ui/shortcuts');

routes.add('/ui/video', '/dev/ui/video');
routes.add('/ui/video/', '/dev/ui/video');

routes.add('/ui/avatars', '/dev/ui/avatars');
routes.add('/ui/avatars/', '/dev/ui/avatars');

routes.add('/ui/checkbox', '/dev/ui/checkbox');
routes.add('/ui/checkbox/', '/dev/ui/checkbox');

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

//
// Account
//

routes.add('/settings', '/unicorn/index');
routes.add('/settings/profile', '/unicorn/index');
routes.add('/settings/appearance', '/unicorn/index');
routes.add('/settings/download', '/unicorn/index');
routes.add('/settings/invites', '/unicorn/index');
routes.add('/settings/notifications', '/unicorn/index');
routes.add('/settings/email', '/unicorn/index');
routes.add('/settings/apps', '/unicorn/index');
routes.add('/settings/apps/', '/unicorn/index');
routes.add('/settings/finance', '/unicorn/index');

//
// Group
//

routes.add('/group/:id', '/unicorn/index');
routes.add('/group/:id/', '/unicorn/index');

//
// Message
//

routes.add('/message/:id', '/unicorn/index');
routes.add('/message/:id/', '/unicorn/index');

//
// Matchmaking
//
routes.add('/matchmaking/:roomId/start', '/unicorn/index');
routes.add('/matchmaking/:roomId/start/', '/unicorn/index');
routes.add('/matchmaking/:roomId/ask/:res', '/unicorn/index');
routes.add('/matchmaking/:roomId/ask/:res/', '/unicorn/index');
routes.add('/matchmaking/:roomId/created', '/unicorn/index');
routes.add('/matchmaking/:roomId/created/', '/unicorn/index');
routes.add('/matchmaking/:roomId/users', '/unicorn/index');
routes.add('/matchmaking/:roomId/users/', '/unicorn/index');
routes.add('/matchmaking/:roomId/install', '/unicorn/index');
routes.add('/matchmaking/:roomId/install/', '/unicorn/index');

//
// Shortnames
//

routes.add('/:shortname', '/unicorn/index');
routes.add('/:shortname/', '/unicorn/index');

//
// Backward compatibility
//

// Profile
routes.add('/mail/u/:id', '/unicorn/index');
routes.add('/mail/u/:id/', '/unicorn/index');
routes.add('/mail/o/:id', '/unicorn/index');
routes.add('/mail/o/:id/', '/unicorn/index');
routes.add('/mail/c/:id', '/unicorn/index');
routes.add('/mail/c/:id/', '/unicorn/index');
routes.add('/direcory/u/:id', '/unicorn/index');
routes.add('/direcory/u/:id/', '/unicorn/index');
routes.add('/direcory/o/:id', '/unicorn/index');
routes.add('/direcory/o/:id/', '/unicorn/index');
routes.add('/direcory/c/:id', '/unicorn/index');
routes.add('/direcory/c/:id/', '/unicorn/index');

export function getRequestHandler(src: any): any {
    return routes.getRequestHandler(src);
}

export const Link = routes.Link;
export const Router = routes.Router;
export const Routes = routes;
