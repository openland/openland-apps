import * as React from 'react';
import { XView } from 'react-mental';

interface FooterTitleProps {
    content: string;
}

export const FooterTitle = (props: FooterTitleProps) => (
    <XView
        color="rgba(83, 96, 134, 0.6)"
        marginBottom={10}
        fontSize={14}
        lineHeight="16px"
        fontWeight="600"
    >
        {props.content.toUpperCase()}
    </XView>
);
