import { XViewProps } from 'react-mental';
import { css } from 'linaria';

export const TypeTitle1 = css` font-size: 24px; line-height: 32px; font-weight: 700; `;
export const TypeTitle2 = css` font-size: 17px; line-height: 24px; font-weight: 700; `;
export const TypeLabel1 = css` font-size: 15px; line-height: 24px; font-weight: 600; `;
export const TypeLabel2 = css` font-size: 13px; line-height: 18px; font-weight: 600; `;
export const TypeBody = css` font-size: 15px; line-height: 24px; font-weight: 400; `;
export const TypeDensed = css` font-size: 14px; line-height: 20px; font-weight: 400; `;
export const TypeCaption = css` font-size: 13px; line-height: 18px; font-weight: 400; `;

export const TypeStyles: { [key in string]: XViewProps } = {
    title1: { fontSize: 24, lineHeight: '32px', fontWeight: '700' },
    title2: { fontSize: 17, lineHeight: '24px', fontWeight: '700' },
    label1: { fontSize: 15, lineHeight: '24px', fontWeight: '600' },
    label2: { fontSize: 13, lineHeight: '18px', fontWeight: '600' },
    body: { fontSize: 15, lineHeight: '24px', fontWeight: '400' },
    densed: { fontSize: 14, lineHeight: '20px', fontWeight: '400' },
    caption: { fontSize: 13, lineHeight: '18px', fontWeight: '400' },
};

// !!! Never customize letterSpacing