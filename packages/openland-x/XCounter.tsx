import * as React from 'react';
import { css, cx } from 'linaria';
import { getCounterValue } from 'openland-y-utils/getCounterValue';

type XCounterProps = {
    big?: boolean;
    grey?: boolean;
    count: number;
    active?: boolean;
};

const counterContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--foregroundContrast);
    background-color: var(--accentPrimary);
    font-weight: 600;
`;

const greyStyle = css`
    background-color: var(--foregroundQuaternary);
    color: var(--foregroundContrast);
`;

const activeStyle = css`
    background-color: var(--foregroundContrast);
    color: var(--accentMuted);
`;

const counterBigStyle = css`
    font-size: 13px;
    line-height: 10px;
    height: 22px;
    min-width: 22px;
    padding-left: 6px;
    padding-right: 6px;
    border-radius: 20px;
`;

const XCounterBig = (props: XCounterProps) => (
    <div
        className={cx(
            counterContainer,
            counterBigStyle,
            props.grey && greyStyle,
            props.active && activeStyle,
        )}
    >
        {getCounterValue(props.count)}
    </div>
);

const counterSmallStyle = css`
    font-size: 10px;
    line-height: 13px;
    height: 11px;
    min-width: 11px;
    padding-left: 2px;
    padding-right: 2px;
    border-radius: 10px;
`;

const XCounterSmall = (props: XCounterProps) => (
    <div
        className={cx(
            counterContainer,
            counterSmallStyle,
            props.grey && greyStyle,
            props.active && activeStyle,
        )}
    >
        {getCounterValue(props.count)}
    </div>
);

export const counterBorderHoverClassname = css`
    &:hover .unread-messages-counter > div {
        border-color: #ececec;
    }
`;

export const XCounter = (props: XCounterProps) => {
    if (props.big) {
        return <XCounterBig {...props} />;
    } else {
        return <XCounterSmall {...props} />;
    }
};
