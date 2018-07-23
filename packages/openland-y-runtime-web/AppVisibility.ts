import { backoff } from 'openland-y-utils/timer';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { AppVisibilityApi } from 'openland-y-runtime-api/AppVisibilityApi';

class AppVisibilityWeb implements AppVisibilityApi {

    isVisible: boolean;

    private readonly ifvisible = canUseDOM ? backoff(() => import('ifvisible.js')) : null;
    private watchers: ((isVisible: boolean) => void)[] = [];

    constructor() {
        this.isVisible = true;
        if (this.ifvisible) {
            this.ifvisible.then((v) => {
                v.on('idle', this.onIdleHandler);
                v.on('wakeup', this.onWakeupHandler);
            });
        }
    }

    watch(handler: (isVisible: boolean) => void) {
        this.watchers.push(handler);
    }

    unwatch(handler: (isVisible: boolean) => void) {
        let index = this.watchers.findIndex((v) => v === handler);
        if (index >= 0) {
            this.watchers.splice(index, 1);
        } else {
            console.warn('Trying to unsubscribe unknown watcher');
        }
    }

    private onIdleHandler = () => {
        this.isVisible = false;
        for (let w of this.watchers) {
            w(false);
        }
    }
    private onWakeupHandler = () => {
        this.isVisible = true;
        for (let w of this.watchers) {
            w(true);
        }
    }
}

export const AppVisibility = new AppVisibilityWeb();