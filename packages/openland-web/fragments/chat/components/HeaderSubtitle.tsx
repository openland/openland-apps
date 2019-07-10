import * as React from 'react';
import { XView } from 'react-mental';

export const HeaderSubtitle = (props: { value: string; path?: string }) => (
    <XView
        as="a"
        fontSize={13}
        fontWeight="400"
        color="#7A7A7A"
        lineHeight="16px"
        path={props.path}
        hoverTextDecoration="none"
    >
        {props.value}
    </XView>
);
