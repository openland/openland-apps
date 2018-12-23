import { MessengerEngine } from './MessengerEngine';
import { backoff, delay, delayBreakable } from 'openland-y-utils/timer';
import gql from 'graphql-tag';

const OnlineMutation = gql`
    mutation ReportOnline {
        presenceReportOnline(timeout: 5000)
    }
`;

const OfflineMutation = gql`
    mutation ReportOnline {
        presenceReportOnline(timeout: 100)
    }
`;

export class OnlineReportEngine {
    readonly engine: MessengerEngine;
    private alive = true;
    private visible = true;
    private delayBreak: (() => void) | null = null;

    constructor(engine: MessengerEngine) {
        this.engine = engine;

        (async () => {
            while (this.alive) {
                let online = this.visible;
                if (online) {
                    await backoff(async () => engine.client.client.mutate({ mutation: OnlineMutation }));
                } else {
                    await backoff(async () => engine.client.client.mutate({ mutation: OfflineMutation }));
                }
                if (online !== this.visible) {
                    continue;
                }
                let d = delayBreakable(2000);
                this.delayBreak = d.resolver;
                await d.promise;
            }
        })();
    }

    destroy() {
        this.alive = false;
    }

    onVisible(visible: boolean) {
        if (visible !== this.visible) {
            this.visible = visible;
            if (this.delayBreak) {
                this.delayBreak();
            }
        }
    }
}