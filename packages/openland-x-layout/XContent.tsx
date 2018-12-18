import * as React from 'react';
import { XView } from 'react-mental';
import XStyles from 'openland-x/XStyles';

export const XContent = (props: { children?: any }) => (
    <XView paddingLeft={XStyles.paddings.xlarge} paddingRight={XStyles.paddings.xlarge}>
        {props.children}
    </XView>
);
