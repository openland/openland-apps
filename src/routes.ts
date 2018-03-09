import * as Routes from 'next-routes';

let routes = Routes();

//
// App Root
//

routes.add('/', '/main/explore/index');
routes.add('/signup', '/signup');
routes.add('/signin', '/signin');
routes.add('/activation', '/activation');

//
// Parcels
//

routes.add('/parcels', '/main/parcels/list');
routes.add('/parcels/', '/main/parcels/list');
routes.add('/parcels/:parcelId', '/main/parcels/item');
routes.add('/parcels/:parcelId/', '/main/parcels/item');
routes.add('/parcels/:parcelId/edit', '/main/parcels/edit');
routes.add('/parcels/:parcelId/edit/', '/main/parcels/edit');

//
// Projects
//

routes.add('/projects', '/main/projects/list');
routes.add('/projects/', '/main/projects/list');
routes.add('/projects/:projectId', '/main/projects/view');
routes.add('/projects/:projectId/', '/main/projects/view');

//
// Extras
//

routes.add('/favorites', '/main/favorites/index');
routes.add('/favorites/', '/main/favorites/index');
routes.add('/inquiries', '/main/inquiries/index');
routes.add('/inquiries/', '/main/inquiries/index');

//
// UI
//

routes.add('/ui', '/ui/showcase');
routes.add('/ui/', '/ui/showcase');

//
// Settings
//

routes.add('/settings', '/main/settings/index');
routes.add('/settings/', '/main/settings/index');

//
// Team
//

routes.add('/team', '/team/index');
routes.add('/team/', '/team/index');

//
// Super
//

routes.add('/super/debug', '/super/debug');
routes.add('/super/debug/', '/super/debug');
routes.add('/super/admins', '/super/admins');
routes.add('/super/admins/', '/super/admins');

//
// Authentication
//

routes.add('auth/login');
routes.add('auth/logout');
routes.add('auth/complete');

export function getRequestHandler(src: any): any {
    return routes.getRequestHandler(src);
}

export const Link = routes.Link;
export const Router = routes.Router;