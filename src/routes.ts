import * as Routes from 'next-routes';

let routes = Routes();

//
// App Root
//

routes.add('/', '/app/explore/index');

//
// Parcels
//

routes.add('/parcels', '/app/parcels/list');
routes.add('/parcels/', '/app/parcels/list');
routes.add('/parcels/:parcelId', '/app/parcels/item');
routes.add('/parcels/:parcelId/', '/app/parcels/item');
routes.add('/parcels/:parcelId/edit', '/app/parcels/edit');
routes.add('/parcels/:parcelId/edit/', '/app/parcels/edit');

//
// Projects
//

routes.add('/projects', '/app/projects/list');
routes.add('/projects/', '/app/projects/list');
routes.add('/projects/:projectId', '/app/projects/view');
routes.add('/projects/:projectId/', '/app/projects/view');

//
// Extras
//

routes.add('/favorites', '/app/favorites/index')
routes.add('/favorites/', '/app/favorites/index')
routes.add('/inquiries', '/app/inquiries/index')
routes.add('/inquiries/', '/app/inquiries/index')

//
// UI
//

routes.add('/ui', '/app/ui/showcase');
routes.add('/ui/', '/app/ui/showcase');

//
// Settings
//

routes.add('/settings', '/app/settings/index');
routes.add('/settings/', '/app/settings/index');

// Technical pages
routes.add('auth/login');
routes.add('auth/logout');
routes.add('auth/complete');

export function getRequestHandler(src: any): any {
    return routes.getRequestHandler(src);
}

export const Link = routes.Link;
export const Router = routes.Router;