import { MessengerEngine } from './MessengerEngine';
import { backoff, delayBreakable } from 'openland-y-utils/timer';
import { canUseDOM } from '../openland-y-utils/canUseDOM';
import { lockStatus, releaseLock, tryLock } from '../openland-y-utils/webSync';

export class OnlineReportEngine {
    readonly engine: MessengerEngine;
    private alive = true;
    private visible = true;
    private breakable?: () => void;

    constructor(engine: MessengerEngine, platform: string) {
        this.engine = engine;

        (async () => {
            const waitForActive = async () => {
                let d = delayBreakable(2000);
                this.breakable = d.resolver;
                await d.promise;
                this.breakable = undefined;
            };

            while (this.alive) {
                let active = this.visible;

                if (canUseDOM) {
                    //
                    // Only one tab (hopefully the active one) should report online status
                    //
                    let lock = lockStatus('presence_report');

                    if (lock.locked && lock.byMe && !active) {
                        releaseLock('presence_report');
                        await waitForActive();
                    }

                    let locked = tryLock('presence_report', 2000);

                    if (!locked) {
                        await waitForActive();
                        continue;
                    }
                }

                await backoff(async () =>
                    engine.client.mutateReportOnline({
                        active: active,
                        platform: platform,
                    }),
                );
                if (this.visible !== active) {
                    continue;
                }
                await waitForActive();
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
