import { backoff } from 'openland-y-utils/timer';

export class SequenceHandler {
    private readonly handler: (src: any) => Promise<void>;
    private pending: any[] = [];
    private isHandling = false;
    private after?: () => void = undefined;

    constructor(handler: (src: any) => Promise<void>) {
        this.handler = handler;
    }

    push(item: any) {
        if (this.isHandling) {
            this.pending.push(item);
        } else {
            this.isHandling = true;
            (async () => {
                try {
                    // backoff in case of io error
                    await backoff(async () => await this.handler(item), 3);
                } finally {
                    this.isHandling = false;
                    this.afterHandled();
                }
            })();
        }
    }

    private afterHandled() {
        if (this.pending.length > 0) {
            this.isHandling = true;
            let item = this.pending.splice(0, 1)[0];
            (async () => {
                try {
                    // backoff in case of io error
                    await backoff(async () => await this.handler(item), 3);
                } finally {
                    this.isHandling = false;
                    this.afterHandled();
                }
            })();
        } else {
            if (this.after) {
                this.after();
                this.after = undefined;
            }
        }
    }

    doAfter = (after: () => void) => {
        if (this.pending.length || this.isHandling) {
            this.after = after;
        } else {
            after();
        }
    }
}