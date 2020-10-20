import { XViewProps } from 'react-mental';
import { css } from 'linaria';

export const TextTitle1 = css` font-size: 24px; line-height: 32px; font-weight: 700; `;
export const TextTitle2 = css` font-size: 20px; line-height: 28px; font-weight: 700; `;
export const TextTitle3 = css` font-size: 17px; line-height: 24px; font-weight: 700; `;
export const TextLabel1 = css` font-size: 15px; line-height: 24px; font-weight: 600; `;
export const TextLabel2 = css` font-size: 14px; line-height: 20px; font-weight: 600; `;
export const TextLabel3 = css` font-size: 13px; line-height: 18px; font-weight: 600; `;
export const TextBody = css` font-size: 15px; line-height: 24px; font-weight: 400; `;
export const TextDensed = css` font-size: 14px; line-height: 20px; font-weight: 400; `;
export const TextCaption = css` font-size: 13px; line-height: 18px; font-weight: 400; `;
export const TextDetail = css` font-size: 10px; line-height: 12px; font-weight: 800; `;
export const TextSubhead = css` font-size: 14px; line-height: 20px; font-weight: 400 `;

type TextStylesVariants = 'Title1' | 'Title2' | 'Title3' | 'Label1' | 'Label2' | 'Label3' | 'Body' | 'Densed' | 'Caption' | 'Detail' | 'Subhead';

export const TextStyles: { [key in TextStylesVariants]: XViewProps } = {
    Title1: { fontSize: 24, lineHeight: '32px', fontWeight: '700' },
    Title2: { fontSize: 20, lineHeight: '28px', fontWeight: '700' },
    Title3: { fontSize: 17, lineHeight: '24px', fontWeight: '700' },
    Label1: { fontSize: 15, lineHeight: '24px', fontWeight: '600' },
    Label2: { fontSize: 14, lineHeight: '20px', fontWeight: '600' },
    Label3: { fontSize: 13, lineHeight: '18px', fontWeight: '600' },
    Body: { fontSize: 15, lineHeight: '24px', fontWeight: '400' },
    Densed: { fontSize: 14, lineHeight: '20px', fontWeight: '400' },
    Subhead: { fontSize: 14, lineHeight: '20px', fontWeight: '400' },
    Caption: { fontSize: 13, lineHeight: '18px', fontWeight: '400' },
    Detail: { fontSize: 10, lineHeight: '12px', fontWeight: '700' },
};

// !!! Never customize letterSpacing

export const HoverAlpha = 0.64;