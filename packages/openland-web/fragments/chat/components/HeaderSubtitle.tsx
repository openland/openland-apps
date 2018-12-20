import * as React from 'react';
import { XView } from 'react-mental';

export const HeaderSubtitle = (props: { value: string; path?: string }) => (
    <XView
        as="a"
        fontSize={13}
        fontWeight="400"
        color="rgba(0, 0, 0, 0.4)"
        lineHeight="16px"
        path={props.path}
    >
        {props.value}
    </XView>
);
