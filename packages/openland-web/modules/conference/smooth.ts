const line = (pointA: number[], pointB: number[]) => {
    const lengthX = pointB[0] - pointA[0];
    const lengthY = pointB[1] - pointA[1];
    return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX)
    };
};

const controlPoint = (current: number[], previous: number[], next: number[], reverse?: boolean) => {
    // When 'current' is the first or last point of the array
    // 'previous' or 'next' don't exist.
    // Replace with 'current'
    const p = previous || current;
    const n = next || current;
    // The smoothing ratio
    const smoothing = 0.2;
    // Properties of the opposed-line
    const o = line(p, n);
    // If is end-control-point, add PI to the angle to go backward
    const angle = o.angle + (reverse ? Math.PI : 0);
    const length = o.length * smoothing;
    // The control point position is relative to the current point
    const x = current[0] + Math.cos(angle) * length;
    const y = current[1] + Math.sin(angle) * length;
    return [x, y];
};

const bezier = (point: number[], prev: number[], prevPrev: number[], next: number[]) => {
    // start control point
    const [cpsX, cpsY] = controlPoint(prev, prevPrev, point);
    // end control point
    const [cpeX, cpeY] = controlPoint(point, prev, next, true);
    return ((Math.abs(prev[0] - point[0]) + Math.abs(prev[1] - point[1]) > 4) || !prev || !next) ? `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}` : undefined;
};

export const bezierPath = (points: number[][]) => {
    // build the d attributes by looping over the points
    let prev: number[][] = [];
    return points.reduce((acc, point, i, a) => {
        if (i === 0) {
            prev.push(point);
            return `M ${point[0]},${point[1]}`;
        } else {
            let b = bezier(point, prev[prev.length - 1], prev[prev.length - 2], a[i + 1]);
            if (b) {
                prev.push(point);
            }
            return b ? `${acc} ${b}` : acc;
        }
    }, '');
};