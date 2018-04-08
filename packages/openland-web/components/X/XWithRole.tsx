import * as React from 'react';
import { withUserInfo } from '../UserInfo';
export const XWithRole = withUserInfo<{ role: string | string[], negate?: boolean }>((props) => {
    let hasRole = false;
    if (Array.isArray(props.role)) {
        for (let r of props.role) {
            if (props.roles.indexOf(r) >= 0) {
                hasRole = true;
                break;
            }
        }
    } else {
        hasRole = props.roles.indexOf(props.role) >= 0;
    }
    if (props.negate) {
        if (!hasRole) {
            return <>{props.children}</>;
        } else {
            return null;
        }
    } else {
        if (hasRole) {
            return <>{props.children}</>;
        } else {
            return null;
        }
    }
});