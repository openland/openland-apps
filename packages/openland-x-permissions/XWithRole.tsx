import * as React from 'react';
import { XRoleContext } from './XRoleContext';
export const XWithRole = (props: { role: string | string[], negate?: boolean, children?: any }) => {
    return (
        <XRoleContext.Consumer>
            {userRoles => {
                if (!userRoles) {
                    return <>{props.children}</>;
                }
                let hasRole = false;
                if (Array.isArray(props.role)) {
                    for (let r of props.role) {
                        if (userRoles.roles.indexOf(r) >= 0) {
                            hasRole = true;
                            break;
                        }
                    }
                } else {
                    hasRole = userRoles.roles.indexOf(props.role) >= 0;
                }
                if (props.negate) {
                    if (!hasRole) {
                        if (React.Children.count(props.children) > 0) {
                            return <>{props.children}</>;
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                } else {
                    if (hasRole) {
                        if (React.Children.count(props.children) > 0) {
                            return <>{props.children}</>;
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                }
                //
            }}
        </XRoleContext.Consumer>
    );
};