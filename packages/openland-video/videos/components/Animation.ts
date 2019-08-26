export class TimingAnimation {
    readonly _from: number;
    readonly _to: number;
    readonly _duration: number;
    readonly _delay: number;
    readonly _endTime: number;

    constructor(from: number, to: number, duration: number, delay: number) {
        this._from = from;
        this._to = to;
        this._duration = duration;
        this._delay = delay;
        this._endTime = this._delay + this._duration;
    }

    delay = (d: number) => {
        return new TimingAnimation(this._from, this._to, this._duration, this._delay + d);
    }
}

export class SequenceAnimation {
    readonly _animations: Animation[];
    readonly _endTime: number;

    constructor(animations: Animation[]) {
        this._animations = animations;
        let e = 0;
        for (let a of this._animations) {
            e += a._endTime;
        }
        this._endTime = e;
    }
}

export type Animation = TimingAnimation | SequenceAnimation;