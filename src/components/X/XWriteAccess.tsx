import * as React from 'react';
import { withUserInfo } from '../UserInfo';

export const XWriteAcces = withUserInfo<{ children: any }>((props) => {
    if (props.area && props.area.writeAccess) {
        return (
            <>
            {props.children}
            </>
        );
    } else {
        return null;
    }
});