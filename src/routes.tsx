import * as Routes from 'next-routes';

let routes = Routes();

routes.add('/:areaId', 'index');
routes.add('/:areaId/', 'index');

routes.add('/:areaId/permits', '/db/permits/list');
routes.add('/:areaId/permits/', '/db/permits/list');
routes.add('/:areaId/permits/:permitId', '/db/permits/item');

routes.add('/:areaId/organizations', '/db/organizations/list');
routes.add('/:areaId/organizations/', '/db/organizations/list');
routes.add('/:areaId/organizations/:orgId', '/db/organizations/item');
routes.add('/:areaId/organizations/:orgId/edit', '/db/organizations/edit');

routes.add('/:areaId/projects', '/db/projects/list');
routes.add('/:areaId/projects/', '/db/projects/list');
routes.add('/:areaId/projects/:projectId', '/db/projects/item');

routes.add('/:areaId/zoning', '/db/zoning/map');
routes.add('/:areaId/zoning/', '/db/zoning/map');

routes.add('/:areaId/stats', '/db/stats/stats');
routes.add('/:areaId/stats/', '/db/stats/stats');

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