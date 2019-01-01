import * as React from 'react';
import { XView } from 'react-mental';

export interface XAppBarProps {
    title?: string;
}

export function XAppBar(props: XAppBarProps) {
    return (
        <XView height={64} backgroundColor="#f6f6f6">
            <XView flexDirection="column" flexBasis={0} minWidth={0} flexGrow={1} flexShrink={1}>
                <XView>
                    {props.title}
                </XView>
            </XView>
        </XView>
    );
}