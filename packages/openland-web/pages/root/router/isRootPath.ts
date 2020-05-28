import { XRouter } from 'openland-x-routing/XRouter';

const rootPaths = [
    '/activation',
    '/waitlist',
    '/suspended',
    '/createProfile',
    '/signin',
];

export function isRootPath(router: XRouter) {
    return rootPaths.indexOf(router.path) >= 0;
}
