export class SequenceHandler {
    private readonly handler: (src: any) => Promise<void>;
    private pending: any[] = [];
    private isHandling = false;

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
                    await this.handler(item);
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
                    await this.handler(item);
                } finally {
                    this.isHandling = false;
                    this.afterHandled();
                }
            })();
        }
    }
}