const publicPath = [
    '/',
    '/about',
    '/terms',
    '/privacy'
];

export function isPublicPath(path: string) {
    return publicPath.indexOf(path) >= 0;
}