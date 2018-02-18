export async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

export async function forever(callback: () => Promise<void>) {
    while (true) {
        await backoff(callback);
    }
}