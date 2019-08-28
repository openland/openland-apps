import BezierEasing from 'bezier-easing';

export class Easing {
    readonly x1: number;
    readonly y1: number;
    readonly x2: number;
    readonly y2: number;
    readonly interpolate: (src: number) => number;

    constructor(x1: number, y1: number, x2: number, y2: number) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.interpolate = BezierEasing(x1, y1, x2, y2);
    }
}