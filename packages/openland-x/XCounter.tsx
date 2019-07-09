import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';

type XCounterProps = {
    big?: boolean;
    grey?: boolean;
    count: number;
};

const XCounterBig = (props: XCounterProps) => (
    <XView
        alignItems="center"
        justifyContent="center"
        fontWeight="600"
        color="#ffffff"
        backgroundColor={props.grey ? 'rgba(0, 0, 0, 0.2)' : '#0C7FF2'}

        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        minWidth={18}
        height={18}
        borderRadius={9}
        fontSize={12}
        lineHeight="10px"
        paddingLeft={5}
        paddingRight={5}
    >
        {props.count}
    </XView>
);

const XCounterSmall = (props: XCounterProps) => (
    <XView
        alignItems="center"
        justifyContent="center"
        fontWeight="600"
        color="#ffffff"
        backgroundColor={props.grey ? 'rgba(0, 0, 0, 0.2)' : '#0C7FF2'}

        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        minWidth={11}
        height={11}
        borderRadius={6}
        fontSize={10}
        lineHeight="13px"
        paddingLeft={2}
        paddingRight={2}
    >
        {props.count}
    </XView>
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
