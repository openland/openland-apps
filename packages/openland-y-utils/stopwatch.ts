import { Logger, createLogger } from 'mental-log';

export class Stopwatch {
    time = new Date().getTime();
    tag?: string;
    context = 'stopwatch';
    private log: Logger;
    constructor(context?: string) {
        this.context = context || this.context;
        this.log = createLogger(this.context);
    }

    next = (tag?: string) => {
        let newTime = new Date().getTime();
        if (this.tag) {
            this.log.log(this.tag + ': ' + (newTime - this.time));
        }
        this.tag = tag;
        this.time = newTime;
        this.tag = tag;
    }
}