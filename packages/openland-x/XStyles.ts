import { CSSProperties } from 'glamorous';

function neutral(alpha: number) {
    return 'rgba(0, 0, 0, ' + alpha + ')';
}

function neutralLight(alpha: number) {
    return 'rgba(255, 255, 255, ' + alpha + ')';
}

const color = {
    neutralDark: neutral(1.0),
    neutralLight: neutralLight(1.0),
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
        color: neutral(1.0)
    } as CSSProperties,
    h800: {
        fontSize: '29px',
        fontWeight: 500,
        lineHeight: '32px',
        color: neutral(1.0)
    } as CSSProperties,
    h700: {
        fontSize: '24px',
        fontWeight: 400,
        lineHeight: '28px',
        color: neutral(1.0)
    } as CSSProperties,
    h600: {
        fontSize: '20px',
        fontWeight: 400,
        lineHeight: '24px',
        color: neutral(1.0)
    } as CSSProperties,
    h500: {
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '20px',
        color: neutral(1.0)
    } as CSSProperties,
    h400: {
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '20px',
        color: neutral(0.6)
    } as CSSProperties,
    h300: {
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '16px',
        color: neutral(1.0)
    } as CSSProperties,
    h200: {
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '16px',
        color: neutral(0.6)
    } as CSSProperties,
    h100: {
        fontSize: '12px',
        fontWeight: 600,
        lineHeight: '16px',
        textTransform: 'uppercase',
        color: neutral(0.6)
    } as CSSProperties,

    m500: {
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '20px',
        color: neutral(0.8)
    } as CSSProperties,

    p: {
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '18px',
        color: neutral(1.0)
    } as CSSProperties,
};

const scroll = {
    '&::-webkit-scrollbar': {
        WebkitAppearance: 'none'
    },
    
    '&::-webkit-scrollbar:vertical': {
        width: 11
    },
    
    '&::-webkit-scrollbar:horizontal': {
        height: 11
    },
    
    '&::-webkit-scrollbar-thumb': {
        borderRadius: 8,
        border: '2px solid white', /* should match background, can't be transparent */
        backgroundColor: 'rgba(0, 0, 0, .5)'
    }
};

export default {
    color,
    text,
    paddings,
    scroll
};