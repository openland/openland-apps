import * as React from 'react';
import { XRoleContext } from './XRoleContext';
export const XWithRole = (props: { role: string | string[], orgPermission?: boolean, negate?: boolean, children?: any }) => {
    return (
        <XRoleContext.Consumer>
            {userRoles => {
                if (!userRoles) {
                    return <>{props.children}</>;
                }
                let targetRoles = (Array.isArray(props.role) ? props.role : [props.role]).map(r => props.orgPermission ? ('org-' + (userRoles.currentOrganizatonId || '') + '-' + r) : r);

                let hasRole = false;
                for (let r of targetRoles) {
                    if (userRoles.roles.indexOf(r) >= 0) {
                        hasRole = true;
                        break;
                    }
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