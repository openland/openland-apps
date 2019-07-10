import * as React from 'react';
import { css, cx } from 'linaria';

const titleOneClassName = css`
    font-size: 24px;
    line-height: 32px;
    letter-spacing: 0.36px;
`;

const titleTwoClassName = css`
    font-size: 17px;
    line-height: 24px;
    letter-spacing: -0.24px;
`;

const labelSemicolumnClassName = css`
    font-size: 15px;
    line-height: 24px;
    letter-spacing: -0.41px;
`;

const bodyRegularClassName = css`
    font-size: 15px;
    line-height: 24px;
    letter-spacing: -0.24px;
`;

const densedRegularClassName = css`
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.24px;
`;

const captionRegularClassName = css`
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.08px;
`;

export enum Mode {
    TitleOne = 'TitleOne',
    TitleTwo = 'TitleTwo',
    LabelSemicolumn = 'LabelSemicolumn',
    BodyRegular = 'BodyRegular',
    DensedRegular = 'DensedRegular',
    CaptionRegular = 'CaptionRegular',
}

export const XText = ({ mode = Mode.BodyRegular, children }: { mode: Mode; children: any }) => {
    return (
        <span
            className={cx(
                mode === Mode.TitleOne && titleOneClassName,
                mode === Mode.TitleTwo && titleTwoClassName,
                mode === Mode.LabelSemicolumn && labelSemicolumnClassName,
                mode === Mode.BodyRegular && bodyRegularClassName,
                mode === Mode.DensedRegular && densedRegularClassName,
                mode === Mode.CaptionRegular && captionRegularClassName,
            )}
        >
            {children}
        </span>
    );
};
