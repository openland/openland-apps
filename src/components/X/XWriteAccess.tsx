import * as React from 'react';
import { withUserInfo } from '../Base/UserInfo';

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