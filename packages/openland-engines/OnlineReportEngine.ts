import { OpenlandClient } from 'openland-api/spacex';
import { MessengerEngine } from './MessengerEngine';
import { backoff, delayBreakable } from 'openland-y-utils/timer';
import { canUseDOM } from '../openland-y-utils/canUseDOM';
import { lockStatus, releaseLock, tryLock } from '../openland-y-utils/webSync';
import { Priority } from 'openland-api/Priority';

export class OnlineReportEngine {
    readonly engine: MessengerEngine;
    readonly client: OpenlandClient;
    readonly platform: string;
    private alive = true;
    private visible = true;

    private breakable?: () => void;

    constructor(engine: MessengerEngine, platform: string) {
        this.engine = engine;
        this.client = engine.client
            .withParameters({ defaultPriority: Priority.LOW });
        this.platform = platform;
    }

    onReady() {
        (async () => {
            const waitForActive = async () => {
                let d = delayBreakable(3000);
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

                    let locked = tryLock('presence_report', 3000);

                    if (!locked) {
                        await waitForActive();
                        continue;
                    }
                }

                await backoff(async () => {
                    if (canUseDOM) {
                        await this.engine.client.mutateReportOnline({
                            active: active,
                            platform: this.platform,
                        });
                    } else {
                        if (active) {
                            await this.engine.client.mutateReportOnline({
                                active: true,
                                platform: this.platform,
                            });
                        } else {
                            // Do nothing
                        }
                    }
                });
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
