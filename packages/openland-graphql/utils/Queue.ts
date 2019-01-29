export class Queue {
    private pending?: (src: any) => void;
    private queue: any[] = [];

    get = async () => {
        if (this.queue.length > 0) {
            return this.queue.shift();
        } else {
            if (this.pending) {
                throw Error('Multiple subscribers are not supported yet')
            }
            return await new Promise<any>((resolver) => this.pending = resolver);
        }
    }

    post = (src: any) => {
        if (this.pending) {
            if (this.queue.length > 0) {
                this.queue.push(src);
            } else {
                let p = this.pending;
                this.pending = undefined;
                p(src);
            }
        } else {
            this.queue.push(src);
        }
    }
}