export function keyFromObject(src: any): string {
    if (src === undefined) {
        return '';
    }
    if (typeof src === 'string' || typeof src === 'number' || typeof src === 'boolean') {
        return src + '';
    }
    const sortedObj = Object.keys(src)
        .sort()
        .reduce((result: Record<string, any>, key) => {
            result[key] = keyFromObject(src[key]);
            return result;
        }, {});
    return JSON.stringify(sortedObj);
}