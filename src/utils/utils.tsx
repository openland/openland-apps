export function prepareParams(fields: string[], source: any): { [key: string]: any } {
    var res = {};
    for (let field of fields) {
        if (source[field]) {
            res[field] = source[field];
        } else {
            res[field] = null;
        }
    }
    return res;
}

export function getComponentDisplayName(Component: any) {
    return Component.displayName || Component.name || 'FunctionalStateless';
}