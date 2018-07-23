import { backoff } from 'openland-y-utils/timer';

export class Visibility {
    private readonly ifvisible = backoff(() => import('ifvisible.js'));
    private readonly handler: (isVisible: boolean) => void;
    private isStarted = true;
    private isSet = false;

    constructor(handler: (isVisible: boolean) => void) {
        this.handler = handler;
        this.ifvisible.then((v) => {
            if (this.isStarted) {
                this.isSet = true;
                v.on('idle', this.onIdleHandler);
                v.on('wakeup', this.onWakeupHandler);
            }
        });
    }

    destroy = () => {
        this.isStarted = false;
        if (this.isSet) {
            this.ifvisible.then((v) => {
                v.off('idle', this.onIdleHandler);
                v.off('wakeup', this.onWakeupHandler);
            });
        }
    }

    private onIdleHandler = () => {
        if (this.isStarted) {
            this.handler(false);
        }
    }
    private onWakeupHandler = () => {
        if (this.isStarted) {
            this.handler(true);
        }
    }
}