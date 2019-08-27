export class TimingAnimation {
    readonly _to: number;
    readonly _duration: number;
    readonly _delay: number;
    readonly _endTime: number;

    constructor(to: number, duration: number, delay: number) {
        this._to = to;
        this._duration = duration;
        this._delay = delay;
        this._endTime = this._delay + this._duration;
    }

    delay = (d: number) => {
        return new TimingAnimation(this._to, this._duration, this._delay + d);
    }
}

export class SequenceAnimation {
    readonly _animations: Animation[];
    readonly _endTime: number;
    readonly _to: number;

    constructor(animations: Animation[]) {
        this._animations = animations;
        let t = 0;
        let e = 0;
        for (let a of this._animations) {
            e += a._endTime;
            t = a._to;
        }
        this._endTime = e;
        this._to = t;
    }
}

export class SetValueAnimation {
    readonly _to: number;
    readonly _endTime: number = 0;

    constructor(_to: number) {
        this._to = _to;
    }
}

export type Animation = TimingAnimation | SequenceAnimation | SetValueAnimation;