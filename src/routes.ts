import * as Routes from 'next-routes';

let routes = Routes();

//
// App Root
//

routes.add('/app', '/app/explore/index');
routes.add('/app/', '/app/explore/index');

//
// Blocks
//

routes.add('/app/blocks', '/app/blocks/list');
routes.add('/app/blocks/', '/app/blocks/list');
routes.add('/app/blocks/:blockId', '/app/blocks/item');
routes.add('/app/blocks/:blockId/', '/app/blocks/item');

//
// Parcels
//

routes.add('/app/parcels', '/app/parcels/list');
routes.add('/app/parcels/', '/app/parcels/list');
routes.add('/app/parcels/:parcelId', '/app/parcels/item');
routes.add('/app/parcels/:parcelId/', '/app/parcels/item');

//
// Projects
//

routes.add('/app/projects/', '/app/projects/list');
routes.add('/app/projects', '/app/projects/list');
routes.add('/app/projects/:projectId', '/app/projects/view');
routes.add('/app/projects/:projectId/', '/app/projects/view');

//
// Zoning
//

// routes.add('/app/zoning/', '/app/zoning/index');
// routes.add('/app/zoning', '/app/zoning/index');

// Old

routes.add('/:areaId', '/area/index');
routes.add('/:areaId/', '/area/index');

routes.add('/:areaId/permits', '/area/permits/list');
routes.add('/:areaId/permits/', '/area/permits/list');
routes.add('/:areaId/permits/:permitId', '/area/permits/item');

routes.add('/:areaId/organizations', '/area/organizations/list');
routes.add('/:areaId/organizations/', '/area/organizations/list');
routes.add('/:areaId/organizations/:orgId', '/area/organizations/item');
routes.add('/:areaId/organizations/:orgId/edit', '/area/organizations/edit');

routes.add('/:areaId/projects', '/area/projects/list');
routes.add('/:areaId/projects/', '/area/projects/list');
routes.add('/:areaId/projects/:projectId', '/area/projects/item');

routes.add('/:areaId/zoning', '/area/zoning/map');
routes.add('/:areaId/zoning/', '/area/zoning/map');

routes.add('/:areaId/stats', '/area/stats/stats');
routes.add('/:areaId/stats/', '/area/stats/stats');

routes.add('/:areaId/ui', '/area/ui/index');
routes.add('/:areaId/ui/', '/area/ui/index');

// Compatibility
routes.add('/', '/compat/root');
routes.add('index', '/compat/root');
routes.add('/pipeline', '/compat/pipeline');

// Technical pages
routes.add('auth/login');
routes.add('auth/logout');
routes.add('auth/complete');

export function getRequestHandler(src: any): any {
    return routes.getRequestHandler(src);
}

export const Link = routes.Link;
export const Router = routes.Router;