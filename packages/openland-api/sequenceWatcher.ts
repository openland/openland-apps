import { GraphqlSubscriptionHandler, GraphqlActiveSubscription } from '@openland/spacex';

export function sequenceWatcher<T>(
    startState: string | null,
    subscribe: (state: string | null, handler: GraphqlSubscriptionHandler<T>) => GraphqlActiveSubscription<T>,
    handler: ((src: T) => string | null)
) {
    let stopped = false;
    let subs: GraphqlActiveSubscription<T> | undefined;
    let state = startState;

    function start() {
        subs = subscribe(state, (src) => {
            if (stopped) {
                return;
            }
            if (src.type === 'stopped') {
                subs = undefined;
                start();
            } else {
                let ns = handler(src.message);
                if (ns) {
                    state = ns;
                }
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