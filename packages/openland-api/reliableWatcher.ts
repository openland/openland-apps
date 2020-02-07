import { GraphqlActiveSubscription, GraphqlSubscriptionHandler } from '@openland/spacex';

export function reliableWatcher<T>(subscribe: (handler: GraphqlSubscriptionHandler<T>) => GraphqlActiveSubscription<T>, handler: (update: T) => void) {
    let stopped = false;
    let subs: GraphqlActiveSubscription<T> | undefined;

    function start() {
        subs = subscribe((src) => {
            if (stopped) {
                return;
            }
            if (src.type === 'stopped') {
                subs = undefined;
                start();
            } else {
                handler(src.message);
            }
        });
    }
    start();

    return () => {
        if (!stopped) {
            stopped = true;
            if (subs) {
                subs.destroy();
                subs = undefined;
            }
        }
    };
}