import { publicPaths } from 'openland-y-utils/publicPaths';

export function isPublicPath(path: string) {
    return publicPaths.indexOf(path) >= 0;
}
