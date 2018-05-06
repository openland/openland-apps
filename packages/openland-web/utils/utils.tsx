
export function prepareParams(fields: ({ key: string, default?: string } | string)[], source: any): { [key: string]: any } {
    fields = ['areaId', ...fields];
    var res = {};
    for (let field of fields) {
        if (typeof (field) === 'string') {
            if (source[field]) {
                res[field] = source[field];
            } else {
                res[field] = null;
            }
        } else {
            if (source[field.key]) {
                res[field.key] = source[field.key];
            } else {
                res[field.key] = field.default;
            }
        }
    }
    return res;
}