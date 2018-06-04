import * as NRoutes from 'next-routes';

let routes = NRoutes();

//
// App Root
//

routes.add('/', '/root');
routes.add('/signup', '/signup');
routes.add('/signin', '/signin');
routes.add('/activation', '/activation');
routes.add('/need_info', '/need_info');
routes.add('/deactivated', '/deactivated');
routes.add('/404', '/404');

//
// Map
//

routes.add('/map', '/main/explore/root');
routes.add('/map/', '/main/explore/root');

//
// Profile
//
routes.add('/settings', '/main/settings/profile');

//
// Home
//

routes.add('/home', '/main/home/main');
routes.add('/home/', '/main/home/main');

//
// Marketplace
//

routes.add('/marketplace', '/main/marketplace/main');
routes.add('/marketplace/', '/main/marketplace/main');

//
// Parcels
//

routes.add('/parcels', '/main/parcels/list');
routes.add('/parcels/', '/main/parcels/list');
routes.add('/parcels/:parcelId', '/main/parcels/item');
routes.add('/parcels/:parcelId/', '/main/parcels/item');
routes.add('/parcels/:parcelId/links', '/main/parcels/item');
routes.add('/parcels/:parcelId/links/', '/main/parcels/item');
routes.add('/parcels/:parcelId/permits', '/main/parcels/item');
routes.add('/parcels/:parcelId/permits/', '/main/parcels/item');
routes.add('/parcels/:parcelId/nearby_transit', '/main/parcels/item');
routes.add('/parcels/:parcelId/nearby_transit/', '/main/parcels/item');
routes.add('/parcels/:parcelId/notes', '/main/parcels/item');
routes.add('/parcels/:parcelId/notes/', '/main/parcels/item');
routes.add('/parcels/:parcelId/zoning', '/main/parcels/item');
routes.add('/parcels/:parcelId/zoning/', '/main/parcels/item');
routes.add('/parcels/:parcelId/edit', '/main/parcels/edit');
routes.add('/parcels/:parcelId/edit/', '/main/parcels/edit');

//
// Deals
//

routes.add('/deals', '/main/deals/root');
routes.add('/deals/', '/main/deals/root');
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

routes.add('/prospecting', '/main/prospecting/root');
routes.add('/prospecting/', '/main/prospecting/root');
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
// Folders
//
routes.add('/folders', '/main/folders/all');
routes.add('/folders/', '/main/folders/all');
routes.add('/folders/:folderId', '/main/folders/all');
routes.add('/folders/:folderId/', '/main/folders/all');

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

routes.add('/favorites', '/main/favorites/root');
routes.add('/favorites/', '/main/favorites/root');
routes.add('/inquiries', '/main/inquiries/root');
routes.add('/inquiries/', '/main/inquiries/root');

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
routes.add('/ui/links', '/dev/ui/links');
routes.add('/ui/links/', '/dev/ui/links');
routes.add('/ui/tasks', '/dev/ui/tasks');
routes.add('/ui/tasks/', '/dev/ui/tasks');

//
// Dev Tools
//

routes.add('/super/debug', '/dev/debug');
routes.add('/super/debug/', '/dev/debug');
routes.add('/super/features', '/dev/features');
routes.add('/super/features/', '/dev/features');
routes.add('/super/readers', '/dev/readers');
routes.add('/super/readers/', '/dev/readers');
routes.add('/super/cities', '/dev/cities');
routes.add('/super/cities/', '/dev/cities');

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