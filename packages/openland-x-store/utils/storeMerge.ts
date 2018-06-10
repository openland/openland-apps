export function storeMerge(left: any, right: any): any {
    if (left === null && right === null) {
        return null;
    }
    if (left === null) {
        return right;
    }
    if (right === null) {
        return left;
    }

    if (Array.isArray(left) !== Array.isArray(right)) {
        throw Error('Unable to merge array with object!');
    }
    if (typeof left !== typeof right) {
        throw Error('Unable to merge ' + typeof left + ' with ' + typeof right);
    }
    // Use right value if we merging arrays
    if (Array.isArray(left)) {
        return right;
    } else if (typeof left === 'object') {
        let leftProps = Object.getOwnPropertyNames(left);
        let rightProps = Object.getOwnPropertyNames(right);
        let res: any = {};
        for (let l of leftProps) {
            if (rightProps.indexOf(l) >= 0) {
                res[l] = storeMerge(left[l], right[l]);
            } else {
                res[l] = left[l];
            }
        }
        for (let r of rightProps) {
            if (leftProps.indexOf(r) < 0) {
                res[r] = right[r];
            }
        }
        return res;
    } else {
        return right;
    }
}