import * as React from 'react';
import { css, cx } from 'linaria';
import { getRandomInt } from 'openland-web/utils/getRandomInt';

const twinkle = css`
    animation: twinkle 10s infinite;

    @keyframes twinkle {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;

const delays = [
    css`animation-delay: 1s`,
    css`animation-delay: 3s`,
    css`animation-delay: 5s`,
    css`animation-delay: 7s`,
];

const makeStar = (starProps?: {x?: number, y?: number, fill?: string, twinkle?: boolean, r?: number, opacity?: number, delayIndex?: number}) => {
    let props = starProps || {};
    let x = typeof props.x === 'number' ? props.x : getRandomInt(3000);
    let y = typeof props.y === 'number' ? props.y : getRandomInt(3000);
    let r = typeof props.r === 'number' ? props.r : getRandomInt(1, 3);
    let opacity = typeof props.opacity === 'number' ? props.opacity : 0.95;
    let delayIndex = typeof props.delayIndex === 'number' ? props.delayIndex : getRandomInt(4);
    let fill = props.fill || '#ffffff';
    let isTwinkle = typeof props.twinkle === 'boolean' ? props.twinkle : Math.random() > 0.7;

    return (
        <circle 
            key={`${x}-${y}-${r}`}
            fillOpacity={opacity}
            cx={x}
            cy={y}
            fill={fill}
            r={r}
            className={cx(isTwinkle && twinkle, isTwinkle && delays[delayIndex])}
        />
    );
};

export const stars: JSX.Element[] = [];

const ursa = [
    makeStar({x: 1480, y: 200, r: 2, twinkle: true, delayIndex: 1}),
    makeStar({x: 1550, y: 190, r: 2, twinkle: true, delayIndex: 1}),
    makeStar({x: 1600, y: 220, r: 2, twinkle: true, delayIndex: 1}),
    makeStar({x: 1650, y: 240, r: 2, twinkle: true, delayIndex: 1}),
    makeStar({x: 1780, y: 234, r: 2, twinkle: true, delayIndex: 1}),
    makeStar({x: 1658, y: 298, r: 2, twinkle: true, delayIndex: 1}),
    makeStar({x: 1780, y: 300, r: 2, twinkle: true, delayIndex: 1}),
];

for (let i = 0; i < 200; i++) {
    stars.push(makeStar());
}
stars.push(...ursa);
