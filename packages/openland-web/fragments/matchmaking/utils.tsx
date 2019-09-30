export const objToMap = (obj: object): Map<string, string[] | string> => {
    const map = new Map<string, string[] | string>();
    Object.keys(obj).forEach(k => {
        map.set(k, obj[k]);
    });
    return map;
};

export const mapToObj = (map: Map<string, string[] | string>): object => {
    const obj: object = {};
    map.forEach((v, k) => {
        obj[k] = v;
    });
    return obj;
};

export const saveToLocalStorage = (key: string, data: object) => {
    return localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = (key: string): Map<string, string[] | string> | null => {
    let data = localStorage.getItem(key);
    if (data) {
        return objToMap(JSON.parse(data));
    }

    return null;
};
