import * as React from 'react';
import { XRoleContext } from './XRoleContext';

export const XWithRole = (props: { role: string | string[], or?: boolean, orgPermission?: string | 'primary', negate?: boolean, children?: any }) => {
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
                _hasRole = _hasRole || (props.or !== undefined && props.or);
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

export const useHasRole = (role: string | string[], or?: boolean, orgPermission?: string | 'primary', negate?: boolean) => {
    const userRoles = React.useContext(XRoleContext);

    if (!userRoles) {
        return false;
    }
    
    let targetRoles = (Array.isArray(role) ? role : [role]).map(r => orgPermission ? ('org-' + ((orgPermission === 'primary' ? userRoles.currentOrganizatonId : orgPermission) || '') + '-' + r) : r);
    let _hasRole = false;

    for (let r of targetRoles) {
        if (userRoles.roles.indexOf(r) >= 0) {
            _hasRole = true;
            break;
        }
    }
    _hasRole = _hasRole || (or !== undefined && or);

    return (negate ? !_hasRole : _hasRole);
};