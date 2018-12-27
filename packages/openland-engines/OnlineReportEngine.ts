import { MessengerEngine } from './MessengerEngine';
import { backoff, delay, delayBreakable } from 'openland-y-utils/timer';
import gql from 'graphql-tag';

const OnlineMutation = gql`
    mutation ReportOnline($active: Boolean) {
        presenceReportOnline(timeout: 5000, active: $active)
    }
`;

export class OnlineReportEngine {
    readonly engine: MessengerEngine;
    private alive = true;
    private visible = true;
    private breakable?: () => void;

    constructor(engine: MessengerEngine) {
        this.engine = engine;

        (async () => {
            while (this.alive) {
                let active = this.visible;
                await backoff(async () => engine.client.client.mutate({
                    mutation: OnlineMutation,
                    variables: {
                        active: active
                    }
                }));
                if (this.visible !== active) {
                    continue;
                }
                let d = delayBreakable(2000);
                this.breakable = d.resolver;
                await d.promise;
                this.breakable = undefined;
            }
        })();
    }

    destroy() {
        this.alive = false;
    }

    onVisible(visible: boolean) {
        if (this.visible !== visible) {
            this.visible = visible;
            if (this.breakable) {
                this.breakable();
            }
        }
    }
}