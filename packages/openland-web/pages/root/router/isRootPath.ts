import { XRouter } from 'openland-x-routing/XRouter';

const rootPaths = [
    '/activation',
    '/waitlist',
    '/suspended',
    '/createProfile',
    '/createOrganization',
    '/signin',
    '/signup'
];

export function isRootPath(router: XRouter) {
    return rootPaths.indexOf(router.path) >= 0;
}