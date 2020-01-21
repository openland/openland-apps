import * as React from 'react';
import { css, cx } from 'linaria';
import { TextLabel2 } from 'openland-web/utils/TextStyles';
import DoneIcon from 'openland-icons/s/ic-done-16.svg';

const wrapper = css`
    padding: 6px 24px;
    background-color: var(--backgroundTertiaryTrans);
    color: var(--foregroundSecondary);
    border-radius: 100px;
    height: 32px;
    cursor: pointer;
    display: flex;
    position: relative;
    user-select: none;

    &:hover {
        background-color: #ebedf0;
    }

    &:active {
        background-color: #e6e7eb;
    }
`;

const wrapperSelected = css`
    background-color: var(--accentPrimary);
    color: var(--foregroundInverted);

    &:hover {
        background-color: var(--accentPrimaryHover);
    }

    &:active {
        background-color: #1677d9;
    }
`;

const iconWrapper = css`
    transform: scale(0);
    transition: transform 0.15s linear;
    position: absolute;
    top: 8px;
    left: 12px;
    fill: var(--foregroundInverted);
`;

const iconSelected = css`
    transform: scale(1);
`;

const textWrapper = css`
    transition: transform .15s linear;
`;

const textSelected = css`
    transform: translateX(8px);
`;

export const UChip = (props: { text: string, selected: boolean, onClick: React.MouseEventHandler<HTMLDivElement> }) => {
    return (
        <div className={cx(TextLabel2, wrapper, props.selected && wrapperSelected)} onClick={props.onClick}>
            <DoneIcon className={cx(iconWrapper, props.selected && iconSelected)} />
            <span className={cx(textWrapper, props.selected && textSelected)}>{props.text}</span>
        </div>
    );
};