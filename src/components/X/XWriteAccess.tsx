// import * as React from 'react';
import { withUserInfo } from '../UserInfo';

export const XWriteAcces = withUserInfo<{ children: any }>((props) => {
    // if (props.account.writeAccess) {
    //     return (
    //         <React.Fragment>
    //             {props.children}
    //         </React.Fragment>
    //     );
    // } else {
    //     return null;
    // }
    return null;
});