export async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function delayForewer() {
    return new Promise(resolver => { /*Do nothing*/ });
}

export function debounce<T extends (...args: any[]) => any>(f: T, ms: number): T {
    let timer: NodeJS.Timeout | null = null;
    let argsToUse: any = undefined;
    return ((...args: any[]) => {
        if (timer) {
            clearTimeout(timer);
            argsToUse = args;
        } else {
            f(...args);
            argsToUse = undefined;
        }

        timer = setTimeout(() => {
            if (argsToUse) {
                f(...argsToUse);
                argsToUse = undefined;
                timer = null;
            }
        }, ms);
    }) as any;
}

export function throttle<T extends (...args: any[]) => any>(f: T, wait: number): T {
    let isCalled = false;
    let savedArgs: any[] | null;

    const wrapper = ((...args: any[]) => {
        if (isCalled) {
            savedArgs = args;
            return;
        }

        f(...args);
        isCalled = true;

        setTimeout(() => {
            isCalled = false;
            if (savedArgs) {
                wrapper(...args);
                savedArgs = null;
            }
        }, wait);
    }) as any;

    return wrapper;
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

type Inline<T extends string, V extends { __typename: string }> = (V extends { __typename: T } ? V : never) | {};

type Dialog = (
    & { __typename: 'Dialog' | 'Smialog' }
    & Inline<'Dialog', {
        __typename: 'Dialog'
        hey: string;
    }>
);

const d: Dialog = { __typename: 'Dialog' };