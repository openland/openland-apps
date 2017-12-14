import * as Routes from 'next-routes';

let routes = Routes();

routes.add('index', '/');
routes.add('pipeline');

routes.add('/db/permits', '/db/permits');
routes.add('/db/permits/', '/db/permits');
routes.add('/db/permits/:permitId', '/db/permits/item');

routes.add('/developers', '/db/developers');
routes.add('/developers/', '/db/developers');
routes.add('/developers/:developerId', '/db/developers/item');
routes.add('/developers/:developerId/edit', '/db/developers/edit');

routes.add('/projects', '/db/projects');
routes.add('/projects/', '/db/projects');
routes.add('/projects/:projectId', '/db/projects/item');

routes.add('auth/login');
routes.add('auth/logout');
routes.add('auth/complete');

export function getRequestHandler(src: any): any {
    return routes.getRequestHandler(src);
}

export const Link = routes.Link;
export const Router = routes.Router;