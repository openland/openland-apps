import * as React from 'react';

const COLORS = ['#96BBF8', '#F2F3F5', '#E94A47', '#2F7FEA', '#F1B505'];

const ELEMENTS = 4;
const SIZEBAUHAUS = 80;

const getNumber = (name: string) => {
    const charactersArray = Array.from(name);
    let charactersCodesSum = 0;

    charactersArray.forEach((charactersArrayItem) => {
        return (charactersCodesSum += charactersArrayItem.charCodeAt(0));
    });

    return charactersCodesSum;
};

const getDigit = (n: number, ntn: number) => {
    return Math.floor((n / Math.pow(10, ntn)) % 10);
};

const getBoolean = (n: number, ntn: number) => {
    return !(getDigit(n, ntn) % 2);
};

const getUnit = (n: number, range: number, index?: number) => {
    let value = n % range;

    if (index && getDigit(n, index) % 2 === 0) {
        return -value;
    } else {
        return value;
    }
};

const getRandomColor = (n: number, colors: string[], range: number) => {
    return colors[n % range];
};

function generateColors(name: string, colors: string[]) {
    const numFromName = getNumber(name);
    const range = colors && colors.length;

    const elementsProperties = Array.from({ length: ELEMENTS }, (_, i) => ({
        color: getRandomColor(numFromName + i, colors, range),
        translateX: getUnit(numFromName * (i + 1), SIZEBAUHAUS / 2 - (i + 17), 1),
        translateY: getUnit(numFromName * (i + 1), SIZEBAUHAUS / 2 - (i + 17), 2),
        rotate: getUnit(numFromName * (i + 1), 360),
        isSquare: getBoolean(numFromName, 2),
    }));

    return elementsProperties;
}

export const AvatarBauhaus = (props: { name: string; size: number | string }) => {
    const properties = generateColors(props.name, COLORS);

    return (
        <svg
            viewBox={'0 0 ' + SIZEBAUHAUS + ' ' + SIZEBAUHAUS}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={props.size}
            height={props.size}
        >
            <mask
                id="mask__bauhaus"
                maskUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={SIZEBAUHAUS}
                height={SIZEBAUHAUS}
            >
                <rect
                    width={SIZEBAUHAUS}
                    height={SIZEBAUHAUS}
                    fill="#fff"
                />
            </mask>
            <g mask="url(#mask__bauhaus)">
                <rect
                    width={SIZEBAUHAUS}
                    height={SIZEBAUHAUS}
                    fill={properties[0].color}
                />
                <rect
                    x={(SIZEBAUHAUS - 60) / 2}
                    y={(SIZEBAUHAUS - 20) / 2}
                    width={SIZEBAUHAUS}
                    height={properties[1].isSquare ? SIZEBAUHAUS : SIZEBAUHAUS / 8}
                    fill={properties[1].color}
                    transform={
                        'translate(' +
                        properties[1].translateX +
                        ' ' +
                        properties[1].translateY +
                        ') rotate(' +
                        properties[1].rotate +
                        ' ' +
                        SIZEBAUHAUS / 2 +
                        ' ' +
                        SIZEBAUHAUS / 2 +
                        ')'
                    }
                />
                <circle
                    cx={SIZEBAUHAUS / 2}
                    cy={SIZEBAUHAUS / 2}
                    fill={properties[2].color}
                    r={SIZEBAUHAUS / 5}
                    transform={
                        'translate(' +
                        properties[2].translateX +
                        ' ' +
                        properties[2].translateY +
                        ')'
                    }
                />
                <line
                    x1={0}
                    y1={SIZEBAUHAUS / 2}
                    x2={SIZEBAUHAUS}
                    y2={SIZEBAUHAUS / 2}
                    strokeWidth={2}
                    stroke={properties[3].color}
                    transform={
                        'translate(' +
                        properties[3].translateX +
                        ' ' +
                        properties[3].translateY +
                        ') rotate(' +
                        properties[3].rotate +
                        ' ' +
                        SIZEBAUHAUS / 2 +
                        ' ' +
                        SIZEBAUHAUS / 2 +
                        ')'
                    }
                />
            </g>
        </svg>
    );
};
