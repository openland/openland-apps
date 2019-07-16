import { XViewProps } from 'react-mental';

export const TypeStyles: { [key in string]: XViewProps } = {
    title1: {
        fontSize: 24,
        lineHeight: '32px',
        fontWeight: '600' // Need to be 700. TBD in mentaljs
    },
    title2: {
        fontSize: 17,
        lineHeight: '24px',
        fontWeight: '600' // Need to be 700. TBD in mentaljs
    },
    label1: {
        fontSize: 15,
        lineHeight: '24px',
        fontWeight: '600'
    },
    label2: {
        fontSize: 13,
        lineHeight: '18px',
        fontWeight: '600'
    },
    body: {
        fontSize: 15,
        lineHeight: '24px',
        fontWeight: '400'
    },
    densed: {
        fontSize: 14,
        lineHeight: '20px',
        fontWeight: '400'
    },
    caption: {
        fontSize: 13,
        lineHeight: '18px',
        fontWeight: '400'
    },
};

// !!! Never customize letterSpacing