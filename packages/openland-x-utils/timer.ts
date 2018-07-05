export async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function delayForewer() {
    return new Promise(resolver => { /*Do nothing*/ });
}

export async function backoff<T>(callback: () => Promise<T>): Promise<T> {
    while (true) {
        try {
            return await callback();
        } catch (e) {
            console.warn(e);
            await delay(1000);
        }
    }
}

export function delayBreakable(ms: number) {
    // We can cancel delay from outer code
    let promiseResolver: ((value?: any | PromiseLike<any>) => void) | null = null;
    let resolver = () => {
        if (promiseResolver) {
            promiseResolver();
        }
    };
    let promise = new Promise(resolve => {
        promiseResolver = resolve;
        setTimeout(resolve, ms);
    });
    return { promise, resolver };
}