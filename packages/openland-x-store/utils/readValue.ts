export function readValue(data: any, name: string): any {
    if (name.indexOf('.') >= 0) {
        let parts = name.split('.');
        let first = parts[0];
        let last = parts.slice(1).join('.');
        if (!data[first]) {
            return null;
        }
        return readValue(data[first], last);
    } else {
        if (Array.isArray(data) && name === 'count') {
            return data.length;
        }
        return data[name] || null;
    }
}