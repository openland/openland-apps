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
// Authentication
//

routes.add('auth/login');
routes.add('auth/logout');
routes.add('auth/complete');

//
// App Root
//

routes.add('/', '/init/root');
routes.add('/signin', '/auth/root');
routes.add('/signin/', '/auth/root');
routes.add('/signin/invite', '/auth/root');
routes.add('/signin/invite/', '/auth/root');
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
routes.add('/authorization/magic/:code', '/auth/root');

//
// Discover
//

routes.add('/discover', '/unicorn/index');
routes.add('/discover/', '/unicorn/index');
routes.add('/discover/home', '/unicorn/index');
routes.add('/discover/home/', '/unicorn/index');
routes.add('/discover/recommendations', '/unicorn/index');
routes.add('/discover/recommendations/', '/unicorn/index');
routes.add('/discover/communities', '/unicorn/index');
routes.add('/discover/communities/', '/unicorn/index');
routes.add('/discover/people', '/unicorn/index');
routes.add('/discover/people/', '/unicorn/index');
routes.add('/discover/organizations', '/unicorn/index');
routes.add('/discover/organizations/', '/unicorn/index');
routes.add('/discover/popular', '/unicorn/index');
routes.add('/discover/popular/', '/unicorn/index');
routes.add('/discover/new', '/unicorn/index');
routes.add('/discover/new/', '/unicorn/index');
routes.add('/discover/collections', '/unicorn/index');
routes.add('/discover/collections/', '/unicorn/index');
routes.add('/discover/collections/:collectionId', '/unicorn/index');
routes.add('/discover/collections/:collectionId/', '/unicorn/index');
routes.add('/discover/premium', '/unicorn/index');
routes.add('/discover/premium/', '/unicorn/index');
routes.add('/discover/free', '/unicorn/index');
routes.add('/discover/free/', '/unicorn/index');
routes.add('/discover/top-communities', '/unicorn/index');
routes.add('/discover/top-communities/', '/unicorn/index');
routes.add('/discover/new-communities', '/unicorn/index');
routes.add('/discover/new-communities/', '/unicorn/index');

//
// Discussions
//
routes.add('/channels', '/unicorn/index');
routes.add('/channels/', '/unicorn/index');
routes.add('/channels/drafts', '/unicorn/index');
routes.add('/channels/drafts/', '/unicorn/index');
routes.add('/channels/edit/:id', '/unicorn/index');
routes.add('/channels/edit/:id/', '/unicorn/index');

//
// Invites
//

routes.add('/join/:inviteKey', '/unicorn/index');
routes.add('/join/:inviteKey/', '/unicorn/index');
routes.add('/invite/:inviteKey', '/unicorn/index');
routes.add('/invite/:inviteKey/', '/unicorn/index');

//
// Mail
//

routes.add('/mail', '/unicorn/index');
routes.add('/mail/', '/unicorn/index');
routes.add('/mail/:conversationId', '/unicorn/index');
routes.add('/mail/:conversationId/', '/unicorn/index');
routes.add('/mail/:id/shared', '/unicorn/index');
routes.add('/mail/:id/shared/', '/unicorn/index');
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
routes.add('/ui/scroll', '/dev/ui/scroll');
routes.add('/ui/scroll/', '/dev/ui/scroll');
routes.add('/ui/pegasus', '/dev/ui/pegasus');
routes.add('/ui/pegasus/', '/dev/ui/pegasus');

//
// Dev Tools
//

routes.add('/super/collections', '/dev/collections');
routes.add('/super/collections/', '/dev/collections');
routes.add('/super/choice', '/dev/choice');
routes.add('/super/choice/', '/dev/choice');
routes.add('/super/mails', '/dev/mails');
routes.add('/super/mails/', '/dev/mails');
routes.add('/super/users', '/dev/users');
routes.add('/super/users/', '/dev/users');
routes.add('/super/admins', '/dev/admins');
routes.add('/super/admins/', '/dev/admins');
routes.add('/super/stickers', '/dev/stickers');
routes.add('/super/stickers/', '/dev/stickers');
routes.add('/super/release', '/dev/release');
routes.add('/super/release/', '/dev/release');
routes.add('/performance', '/perf/perf');

//
// Account
//
routes.add('/account', '/unicorn/index');
routes.add('/account/me', '/unicorn/index');
routes.add('/account/me/', '/unicorn/index');
routes.add('/account/profile', '/unicorn/index');
routes.add('/account/profile/', '/unicorn/index');
routes.add('/account/privacy', '/unicorn/index');
routes.add('/account/privacy/', '/unicorn/index');
routes.add('/account/appearance', '/unicorn/index');
routes.add('/account/appearance/', '/unicorn/index');
routes.add('/account/download', '/unicorn/index');
routes.add('/account/download/', '/unicorn/index');
routes.add('/account/invites', '/unicorn/index');
routes.add('/account/invites/', '/unicorn/index');
routes.add('/account/notifications', '/unicorn/index');
routes.add('/account/notifications/', '/unicorn/index');
routes.add('/account/email', '/unicorn/index');
routes.add('/account/email/', '/unicorn/index');
routes.add('/account/apps', '/unicorn/index');
routes.add('/account/apps/', '/unicorn/index');
routes.add('/account/about', '/unicorn/index');
routes.add('/account/about/', '/unicorn/index');
routes.add('/account/licenses', '/unicorn/index');
routes.add('/account/licenses/', '/unicorn/index');

routes.add('/settings', '/unicorn/index');
routes.add('/settings/me', '/unicorn/index');
routes.add('/settings/me/', '/unicorn/index');
routes.add('/settings/profile', '/unicorn/index');
routes.add('/settings/profile/', '/unicorn/index');
routes.add('/settings/privacy', '/unicorn/index');
routes.add('/settings/privacy/', '/unicorn/index');
routes.add('/settings/appearance', '/unicorn/index');
routes.add('/settings/appearance/', '/unicorn/index');
routes.add('/settings/download', '/unicorn/index');
routes.add('/settings/download/', '/unicorn/index');
routes.add('/settings/invites', '/unicorn/index');
routes.add('/settings/invites/', '/unicorn/index');
routes.add('/settings/notifications', '/unicorn/index');
routes.add('/settings/notifications/', '/unicorn/index');
routes.add('/settings/email', '/unicorn/index');
routes.add('/settings/email/', '/unicorn/index');
routes.add('/settings/apps', '/unicorn/index');
routes.add('/settings/apps/', '/unicorn/index');
routes.add('/settings/about', '/unicorn/index');
routes.add('/settings/about/', '/unicorn/index');
routes.add('/settings/licenses', '/unicorn/index');
routes.add('/settings/licenses/', '/unicorn/index');
routes.add('/settings/communities', '/unicorn/index');
routes.add('/settings/communities/', '/unicorn/index');

//
// Wallet
//

routes.add('/wallet', '/unicorn/index');
routes.add('/wallet/', '/unicorn/index');

//
// Group
//

routes.add('/group/:id', '/unicorn/index');
routes.add('/group/:id/', '/unicorn/index');

//
// Message
//

routes.add('/message/:messageId', '/unicorn/index');
routes.add('/message/:messageId/', '/unicorn/index');
routes.add('/message/:messageId/comment/:commentId', '/unicorn/index');
routes.add('/message/:messageId/comment/:commentId/', '/unicorn/index');

//
// Rooms
//

routes.add('/rooms', '/unicorn/index');
routes.add('/rooms/', '/unicorn/index');
routes.add('/room/:id', '/unicorn/index');
routes.add('/room/:id/', '/unicorn/index');

//
// Oauth
//
routes.add('/oauth/:code', '/oauth/oauth');
routes.add('/oauth/:code/', '/oauth/oauth');

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

//
// Shortnames
//

routes.add('/:shortname', '/unicorn/index');
routes.add('/:shortname/', '/unicorn/index');
routes.add('/:shortname/:id', '/unicorn/index');
routes.add('/:shortname/:id/', '/unicorn/index');

export function getRequestHandler(src: any): any {
    return routes.getRequestHandler(src);
}

export const Link = routes.Link;
export const Router = routes.Router;
export const Routes = routes;
