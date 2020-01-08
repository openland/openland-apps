import * as React from 'react';
import { XScrollView3 } from 'openland-x/XScrollView3';

export const PScrollView = React.memo((props: { children?: any }) => {
    return (
        <XScrollView3>
            {props.children}
        </XScrollView3>
    );
});