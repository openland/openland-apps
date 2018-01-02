import * as Routes from 'next-routes';

let routes = Routes();

routes.add('index', '/');

routes.add('/permits', '/db/permits/list');
routes.add('/permits/', '/db/permits/list');
routes.add('/permits/:permitId', '/db/permits/item');

routes.add('/organizations', '/db/organizations/list');
routes.add('/organizations/', '/db/organizations/list');
routes.add('/organizations/:orgId', '/db/organizations/item');
routes.add('/organizations/:orgId/edit', '/db/organizations/edit');

routes.add('/projects', '/db/projects/list');
routes.add('/projects/', '/db/projects/list');
routes.add('/projects/:projectId', '/db/projects/item');

// Compatibility
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