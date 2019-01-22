import { MessengerEngine } from './MessengerEngine';
import { backoff, delayBreakable } from 'openland-y-utils/timer';
import { ReportOnlineMutation } from 'openland-api/ReportOnlineMutation';

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
                await backoff(async () => engine.client.mutate(ReportOnlineMutation, { active: active }));
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