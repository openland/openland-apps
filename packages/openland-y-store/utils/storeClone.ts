export function storeClone(src: any): any {
    if (src === null) {
        return null;
    } else if (Array.isArray(src)) {
        let res = [];
        for (let v of src) {
            res.push(storeClone(v));
        }
        return res;
    } else if (typeof src === 'object') {
        let props = Object.getOwnPropertyNames(src);
        let res: any = {};
        for (let p of props) {
            res[p] = storeClone(src[p]);
        }
        return res;
    } else {
        return src;
    }
}