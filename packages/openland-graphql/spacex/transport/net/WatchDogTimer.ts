export class WatchDogTimer {

    readonly onRestart: () => void;
    readonly timeout: number;
    private timer: any;
    private isDead = true;

    constructor(timeout: number, onRestart: () => void) {
        this.timeout = timeout;
        this.onRestart = onRestart;
    }

    kick = () => {
        if (this.isDead) {
            return;
        }
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            if (!this.isDead) {
                this.isDead = true;
                this.onRestart();
            }
        }, this.timeout);
    }

    reset = () => {
        this.isDead = false;
        this.kick();
    }

    kill = () => {
        this.isDead = true;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
}