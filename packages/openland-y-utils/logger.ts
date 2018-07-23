function currentTime() {
    let dt = new Date();
    let hours = dt.getHours();
    let ampm = dt.getHours() < 12 ? 'AM' : 'PM';
    hours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return hours + ':' + ('0' + dt.getMinutes()).substr(-2) + ampm;
}

export class Logger {
    readonly tag: string;
    constructor(tag: string) {
        this.tag = tag;
    }

    log(src: any) {
        if (typeof src === 'string') {
            console.log(currentTime() + ' [' + this.tag + '] ' + src);
        } else {
            // console.log(currentTime() + ' [' + this.tag + ']:');
            console.log(src);
        }
    }

    warn(text: string) {
        console.warn(currentTime() + ' [' + this.tag + '] ' + text);
    }

    error(e: any) {
        console.warn(currentTime() + ' [' + this.tag + '] ' + e.message);
        console.warn(e);
    }
}

export function logger(tag: string) {
    return new Logger(tag);
}