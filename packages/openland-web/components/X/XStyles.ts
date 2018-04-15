import { CSSProperties } from 'glamorous';

const color = {
    primary: '#1e1467',
    accent: '#522BFF'
};

const paddings = {
    small: 4,
    medium: 8,
    large: 16,
    xlarge: 24,
    content: {
        horizontal: 24,
        vertical: 24
    }
};

const text = {
    h900: {
        fontSize: '35px',
        fontWeight: 500,
        lineHeight: '40px',
        color: color.primary
    } as CSSProperties,
    h800: {
        fontSize: '29px',
        fontWeight: 500,
        lineHeight: '32px',
        color: color.primary
    } as CSSProperties,
    h700: {
        fontSize: '24px',
        fontWeight: 400,
        lineHeight: '28px',
        color: color.primary
    } as CSSProperties,
    h600: {
        fontSize: '20px',
        fontWeight: 400,
        lineHeight: '24px',
        color: color.primary
    } as CSSProperties,
    h500: {
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '20px',
        color: color.primary
    } as CSSProperties,
    h400: {
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '20px',
        color: color.primary
    } as CSSProperties,
    h300: {
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '16px',
        color: color.primary
    } as CSSProperties,
    h200: {
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '16px',
        color: color.primary
    } as CSSProperties,
    h100: {
        fontSize: '12px',
        fontWeight: 600,
        lineHeight: '16px',
        textTransform: 'uppercase',
        color: color.primary
    } as CSSProperties,

    m500: {
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '20px',
        color: color.primary
    } as CSSProperties,

    p: {
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '18px',
        color: color.primary
    } as CSSProperties,
};

export default {
    color,
    text,
    paddings
};