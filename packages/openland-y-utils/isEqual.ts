
// todo handle sets with diffirent order
export const isEqual = (a: any, b: any) => {
    if (a === b) {
        return true
    }

    // a or b is undefined or null, but not both
    if (!a || !b) {
        return false
    }

    let akeys = Object.keys(a);
    let bkeys = Object.keys(b);
    if (akeys.length !== bkeys.length) {
        console.warn(a, b);
        return false;
    }
    for (let key of akeys) {
        if (!isEqual(a[key], b[key])) {
            console.warn(a[key], b[key]);
            return false
        }
    }

    return true;

}

export const includes = (a: any, b: any) => {
    if (isEqual(a, b)) {
        return true
    }

    // a or b is undefined or null, but not both
    if (!a || !b) {
        return false
    }

    // a should contain all b fields
    for (let key of Object.keys(b)) {
        if (!isEqual(a[key], b[key])) {
            return false
        }
    }

    return true;

}