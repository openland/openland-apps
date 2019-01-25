export function redirectSuffix(to: string) {
    if (to !== '/') {
        return '?redirect=' + encodeURIComponent(to);
    } else {
        return '';
    }
}
