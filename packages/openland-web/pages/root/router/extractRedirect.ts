import { XRouter } from 'openland-x-routing/XRouter';
import { isRootPath } from './isRootPath';

export function extractRedirect(router: XRouter) {
    let redirectPath: string = '/'; // Default value

    // Try to extract existing redirect
    let redirect = router.query && router.query.redirect;
    if (redirect) {
        redirectPath = redirect;
    }

    // Try to set redirect path for current page
    if (redirectPath === '/' && !isRootPath(router)) {
        redirectPath = router.path;
    }

    return redirectPath;
}
