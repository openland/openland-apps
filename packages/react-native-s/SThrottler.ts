export async function throttle() {
    return new Promise((r) => { setTimeout(r, 1); });
}

export async function throttledMap<T, V>(src: T[], map: (item: T) => V): Promise<V[]> {
    let res: V[] = [];
    let c = 0;
    for (let s of src) {
        if (c++ > 3) {
            await throttle();
            c = 0;
        }
        if (__DEV__) {
            let start = Date.now();
            res.push(map(s));
            console.log('Mapped in ' + (Date.now() - start) + ' ms');
        } else {
            res.push(map(s));
        }
    }
    return res;
}