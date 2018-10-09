import { MessengerEngine } from './MessengerEngine';
import { backoff, delay } from 'openland-y-utils/timer';
import gql from 'graphql-tag';

const OnlineMutation = gql`
    mutation ReportOnline {
        alphaReportOnline(timeout: 5000)
    }
`;

export class OnlineReportEngine {
    readonly engine: MessengerEngine;
    private alive = true;

    constructor(engine: MessengerEngine) {
        this.engine = engine;

        (async () => {
            while (this.alive) {
                await backoff(async () => engine.client.client.mutate({ mutation: OnlineMutation }));
                await delay(2000);
            }
        })();
    }

    destroy() {
        this.alive = false;
    }

    onVisible(visible: boolean) {
        // some day
    }
}