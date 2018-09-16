export async function throttle() {
    return new Promise((r) => { setTimeout(r); });
}

export async function throttledMap<T, V>(src: T[], map: (item: T) => V): Promise<V[]> {
    let res: V[] = [];
    let c = 0;
    for (let s of src) {
        if (c++ > 3) {
            await throttle();
            c = 0;
        }
        res.push(map(s));
    }
    return res;
}