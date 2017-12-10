import * as Routes from 'next-routes';

let routes = Routes();

routes.add('index', '/');
routes.add('/db/permits', '/db/permits');
routes.add('/db/permits/', '/db/permits');
routes.add('/db/permits/:id', '/db/permits/item');
routes.add('pipeline');
routes.add('auth/login');
routes.add('auth/logout');
routes.add('auth/complete');

export function getRequestHandler(src: any): any {
    return routes.getRequestHandler(src);
}

export const Link = routes.Link;