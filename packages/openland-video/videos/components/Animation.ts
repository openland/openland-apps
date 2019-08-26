export class TimingAnimation {
    readonly _from: number;
    readonly _to: number;
    readonly _duration: number;
    readonly _delay: number;

    constructor(from: number, to: number, duration: number, delay: number) {
        this._from = from;
        this._to = to;
        this._duration = duration;
        this._delay = delay;
    }

    delay = (d: number) => {
        return new TimingAnimation(this._from, this._to, this._duration, this._delay + d);
    }
}

export class SequenceAnimation {
    readonly _animations: Animation[];

    constructor(animations: Animation[]) {
        this._animations = animations;
    }
}

export type Animation = TimingAnimation | SequenceAnimation;