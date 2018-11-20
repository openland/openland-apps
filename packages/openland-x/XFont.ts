import { CSSProperties } from 'glamorous';

export function neutral(alpha: number) {
    let v = Math.round(240 * (1 - alpha));
    return 'rgb(' + v + ', ' + v + ', ' + v + ')';
}

const h600: CSSProperties = {
    fontSize: 22,
    fontWeight: 400,
    lineHeight: '24px',
    color: neutral(0.9)
};

const h500: CSSProperties = {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '20px',
    color: neutral(1.0)
};

const h400: CSSProperties = {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
    color: neutral(0.8)
};

const b300: CSSProperties = {
    fontSize: 13,
    fontWeight: 400,
    lineHeight: '17px',
    color: neutral(0.6)
};

const h100: CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    lineHeight: '16px',
    textTransform: 'uppercase',
    color: neutral(0.6)
};

export const XFont = {
    h100,
    h500,
    h600,
    h400,
    b300
};