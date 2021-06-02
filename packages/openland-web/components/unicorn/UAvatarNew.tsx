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

const getContrast = (hexcolor: string) => {
    // If a leading # is provided, remove it
    if (hexcolor.slice(0, 1) === '#') {
        hexcolor = hexcolor.slice(1);
    }

    // Convert to RGB value
    let r = parseInt(hexcolor.substr(0, 2), 16);
    let g = parseInt(hexcolor.substr(2, 2), 16);
    let b = parseInt(hexcolor.substr(4, 2), 16);

    // Get YIQ ratio
    let yiq = (r * 299 + g * 587 + b * 114) / 1000;

    // Check contrast
    return yiq >= 128 ? 'black' : 'white';
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
            {...props}
        >
            <mask
                id="mask__bauhaus"
                maskUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={SIZEBAUHAUS}
                height={SIZEBAUHAUS}
            >
                <rect width={SIZEBAUHAUS} height={SIZEBAUHAUS} rx={SIZEBAUHAUS / 2} fill="#fff" />
            </mask>
            <g mask="url(#mask__bauhaus)">
                <rect
                    width={SIZEBAUHAUS}
                    height={SIZEBAUHAUS}
                    rx={SIZEBAUHAUS / 2}
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

const SIZEBEAM = 36;

function generateData(name: string, colors: string[]) {
    const numFromName = getNumber(name);
    const range = colors && colors.length;
    const wrapperColor = getRandomColor(numFromName, colors, range);
    const preTranslateX = getUnit(numFromName, 10, 1);
    const wrapperTranslateX = preTranslateX < 5 ? preTranslateX + SIZEBEAM / 9 : preTranslateX;
    const preTranslateY = getUnit(numFromName, 10, 2);
    const wrapperTranslateY = preTranslateY < 5 ? preTranslateY + SIZEBEAM / 9 : preTranslateY;

    const data = {
        wrapperColor: wrapperColor,
        faceColor: getContrast(wrapperColor),
        backgroundColor: getRandomColor(numFromName + 13, colors, range),
        wrapperTranslateX: wrapperTranslateX,
        wrapperTranslateY: wrapperTranslateY,
        wrapperRotate: getUnit(numFromName, 360),
        wrapperScale: 1 + getUnit(numFromName, SIZEBEAM / 12) / 10,
        isMouthOpen: getBoolean(numFromName, 2),
        isCircle: getBoolean(numFromName, 1),
        eyeSpread: getUnit(numFromName, 5),
        mouthSpread: getUnit(numFromName, 3),
        faceRotate: getUnit(numFromName, 10, 3),
        faceTranslateX:
            wrapperTranslateX > SIZEBEAM / 6 ? wrapperTranslateX / 2 : getUnit(numFromName, 8, 1),
        faceTranslateY:
            wrapperTranslateY > SIZEBEAM / 6 ? wrapperTranslateY / 2 : getUnit(numFromName, 7, 2),
    };

    return data;
}

export const AvatarBeam = (props: { name: string; size: number | string }) => {
    const data = generateData(props.name, COLORS);

    return (
        <svg
            viewBox={'0 0 ' + SIZEBEAM + ' ' + SIZEBEAM}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={props.size}
            height={props.size}
            {...props}
        >
            <mask
                id="mask__beam"
                maskUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={SIZEBEAM}
                height={SIZEBEAM}
            >
                <rect width={SIZEBEAM} height={SIZEBEAM} rx={20} fill="white" />
            </mask>
            <g mask="url(#mask__beam)" fill="transparent">
                <rect width={SIZEBEAM} height={SIZEBEAM} rx={20} fill={data.backgroundColor} />
                <rect
                    x="0"
                    y="0"
                    width={SIZEBEAM}
                    height={SIZEBEAM}
                    transform={
                        'translate(' +
                        data.wrapperTranslateX +
                        ' ' +
                        data.wrapperTranslateY +
                        ') rotate(' +
                        data.wrapperRotate +
                        ' ' +
                        SIZEBEAM / 2 +
                        ' ' +
                        SIZEBEAM / 2 +
                        ') scale(' +
                        data.wrapperScale +
                        ')'
                    }
                    fill={data.wrapperColor}
                    rx={data.isCircle ? SIZEBEAM : SIZEBEAM / 6}
                />
                <g
                    transform={
                        'translate(' +
                        data.faceTranslateX +
                        ' ' +
                        data.faceTranslateY +
                        ') rotate(' +
                        data.faceRotate +
                        ' ' +
                        SIZEBEAM / 2 +
                        ' ' +
                        SIZEBEAM / 2 +
                        ')'
                    }
                >
                    {data.isMouthOpen ? (
                        <path
                            d={'M15 ' + (19 + data.mouthSpread) + 'c2 1 4 1 6 0'}
                            stroke={data.faceColor}
                            fill="none"
                            strokeLinecap="round"
                        />
                    ) : (
                        <path
                            d={'M13,' + (19 + data.mouthSpread) + ' a1,0.75 0 0,0 10,0'}
                            fill={data.faceColor}
                        />
                    )}
                    <rect
                        x={14 - data.eyeSpread}
                        y={14}
                        width={1.5}
                        height={2}
                        rx={1}
                        stroke="none"
                        fill={data.faceColor}
                    />
                    <rect
                        x={20 + data.eyeSpread}
                        y={14}
                        width={1.5}
                        height={2}
                        rx={1}
                        stroke="none"
                        fill={data.faceColor}
                    />
                </g>
            </g>
        </svg>
    );
};
