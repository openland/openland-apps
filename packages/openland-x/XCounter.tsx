import * as React from 'react';
import { css, cx } from 'linaria';

type XCounterProps = {
    big?: boolean;
    grey?: boolean;
    count: number;
};

const counterContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #fff;
    background-color: #0C7FF2;
    font-weight: 600;
`;

const greyStyle = css`
    background-color: #c4c7cc;
`;

const counterBigStyle = css`
    font-size: 13px;
    line-height: 10px;
    height: 20px;
    min-width: 20px;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 20px;
`;

const XCounterBig = (props: XCounterProps) => (
    <div className={cx(counterContainer, counterBigStyle, props.grey && greyStyle)}>
        {props.count}
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
    <div className={cx(counterContainer, counterSmallStyle, props.grey && greyStyle)}>
        {props.count}
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
