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
routes.add('/parcels/:parcelId/links', '/main/parcels/item');
routes.add('/parcels/:parcelId/links/', '/main/parcels/item');
routes.add('/parcels/:parcelId/notes', '/main/parcels/item');
routes.add('/parcels/:parcelId/notes/', '/main/parcels/item');
routes.add('/parcels/:parcelId/zoning', '/main/parcels/item');
routes.add('/parcels/:parcelId/zoning/', '/main/parcels/item');
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
// Reports
//
routes.add('/reports/urbyn_mho_nyc', '/main/reports/urbynmho');
routes.add('/reports/urbyn_mho_nyc/', '/main/reports/urbynmho');

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
routes.add('/prospecting/map', '/main/prospecting/map');
routes.add('/prospecting/map/', '/main/prospecting/map');

routes.add('/prospecting/review/links', '/main/prospecting/review');
routes.add('/prospecting/review/links/', '/main/prospecting/review');
routes.add('/prospecting/review/notes', '/main/prospecting/review');
routes.add('/prospecting/review/notes/', '/main/prospecting/review');
routes.add('/prospecting/review/zoning', '/main/prospecting/review');
routes.add('/prospecting/review/zoning/', '/main/prospecting/review');

// Hack
routes.add('/prospecting/nyc', '/main/prospecting/snoozed');
routes.add('/prospecting/nyc/', '/main/prospecting/snoozed');

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

routes.add('/ui', '/dev/ui/index');
routes.add('/ui/', '/dev/ui/index');
routes.add('/ui/buttons', '/dev/ui/buttons');
routes.add('/ui/buttons/', '/dev/ui/buttons');
routes.add('/ui/inputs', '/dev/ui/inputs');
routes.add('/ui/inputs/', '/dev/ui/inputs');
routes.add('/ui/typography', '/dev/ui/typography');
routes.add('/ui/typography/', '/dev/ui/typography');
routes.add('/ui/grid', '/dev/ui/grid');
routes.add('/ui/grid/', '/dev/ui/grid');
routes.add('/ui/map', '/dev/ui/map');
routes.add('/ui/map/', '/dev/ui/map');

//
// Dev Tools
//

routes.add('/super/debug', '/dev/debug');
routes.add('/super/debug/', '/dev/debug');
routes.add('/super/features', '/dev/features');
routes.add('/super/features/', '/dev/features');
routes.add('/super/readers', '/dev/readers');
routes.add('/super/readers/', '/dev/readers');

routes.add('/super', '/dev/orgs');
routes.add('/super/', '/dev/orgs');
routes.add('/super/orgs/:accountId', '/dev/orgView');
routes.add('/super/orgs/:accountId/', '/dev/orgView');

routes.add('/super/admins', '/dev/admins');
routes.add('/super/admins/', '/dev/admins');

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