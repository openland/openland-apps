import * as React from 'react';
import { XView } from 'react-mental';
import { XContainerStyles, extractContainerStyles } from './XContainerStyles';

export interface XVertical2Props extends XContainerStyles {
    children?: any;
}

export const XVertical2 = React.memo<XVertical2Props>((props) => {
    return (
        <XView flexDirection="column" alignItems="stretch" {...extractContainerStyles(props)}>
            {props.children}
        </XView>
    )
});