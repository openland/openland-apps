import * as NRoutes from 'next-routes';

let routes = NRoutes();

//
// App Root
//

routes.add('/', '/main/explore/index');
routes.add('/signup', '/signup');
routes.add('/signin', '/signin');
routes.add('/activation', '/activation');
routes.add('/need_info', '/need_info');
routes.add('/deactivated', '/deactivated');

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
// Deals
//

routes.add('/deals', '/main/deals/index');
routes.add('/deals/', '/main/deals/index');
routes.add('/deals/:dealId', '/main/deals/view');
routes.add('/deals/:dealId/', '/main/deals/view');

//
// Sourcing
//

routes.add('/prospecting', '/main/prospecting/index');
routes.add('/prospecting/', '/main/prospecting/index');
routes.add('/prospecting/rejected', '/main/prospecting/rejected');
routes.add('/prospecting/rejected/', '/main/prospecting/rejected');
routes.add('/prospecting/approved', '/main/prospecting/approved');
routes.add('/prospecting/approved/', '/main/prospecting/approved');
routes.add('/prospecting/snoozed', '/main/prospecting/snoozed');
routes.add('/prospecting/snoozed/', '/main/prospecting/snoozed');
routes.add('/prospecting/zoning', '/main/prospecting/zoning');
routes.add('/prospecting/zoning/', '/main/prospecting/zoning');
routes.add('/prospecting/unit', '/main/prospecting/unit');
routes.add('/prospecting/unit/', '/main/prospecting/unit');
routes.add('/prospecting/review', '/main/prospecting/review');
routes.add('/prospecting/review/', '/main/prospecting/review');

//
// People
//

routes.add('/people', '/main/people/index');
routes.add('/people/', '/main/people/index');

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
routes.add('/super/orgs', '/super/orgs');
routes.add('/super/orgs/', '/super/orgs');
routes.add('/super/orgs/:accountId', '/super/orgView');
routes.add('/super/orgs/:accountId/', '/super/orgView');
routes.add('/super/features', '/super/features');
routes.add('/super/features/', '/super/features');

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
export const Routes = routes;