import * as React from 'react';
import { XRoleContext } from './XRoleContext';
export const XWithRole = (props: { role: string | string[], orgPermission?: string | 'primary', negate?: boolean, children?: any }) => {
    return (
        <XRoleContext.Consumer>
            {userRoles => {
                if (!userRoles) {
                    return <>{props.children}</>;
                }
                let targetRoles = (Array.isArray(props.role) ? props.role : [props.role]).map(r => props.orgPermission ? ('org-' + ((props.orgPermission === 'primary' ? userRoles.currentOrganizatonId : props.orgPermission) || '') + '-' + r) : r);

                let _hasRole = false;
                for (let r of targetRoles) {
                    if (userRoles.roles.indexOf(r) >= 0) {
                        _hasRole = true;
                        break;
                    }
                }
                if (props.negate) {
                    if (!_hasRole) {
                        if (React.Children.count(props.children) > 0) {
                            return <>{props.children}</>;
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                } else {
                    if (_hasRole) {
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