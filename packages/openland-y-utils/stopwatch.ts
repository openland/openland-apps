export class Stopwatch {
    time = new Date().getTime();
    tag?: string;
    context = 'stopwatch';
    constructor(context?: string) {
        this.context = context || this.context;
    }

    next = (tag?: string) => {
        let newTime = new Date().getTime();
        if (this.tag) {
            console.warn(this.context, this.tag, newTime - this.time);
        }
        this.tag = tag;
        this.time = newTime;
        this.tag = tag;
    }
}