import { delay } from 'openland-y-utils/timer';

export function forever(handler: () => Promise<void>) {
    (async () => {
        while (true) {
            try {
                await handler();
            } catch (e) {
                console.warn(e);
                await delay(1000);
            }
        }
    })();
}