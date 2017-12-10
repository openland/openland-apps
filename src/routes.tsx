import * as Routes from 'next-routes';

let routes = Routes();

routes.add('index', '/');
routes.add('/permits/:id', '/db/permits/item');
routes.add('pipeline');
routes.add('auth/login');
routes.add('auth/logout');
routes.add('auth/complete');

export function getRequestHandler(src: any): any {
    return routes.getRequestHandler(src);
}