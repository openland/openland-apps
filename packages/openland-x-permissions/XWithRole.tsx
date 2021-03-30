import * as React from 'react';
import { XRoleContext } from './XRoleContext';

export const XWithRole = (props: { role: string | string[], or?: boolean, negate?: boolean, children?: any }) => {
    return (
        <XRoleContext.Consumer>
            {userRoles => {
                if (!userRoles) {
                    return <>{props.children}</>;
                }
                let targetRoles = (Array.isArray(props.role) ? props.role : [props.role]);

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

export const useRole = (role: string | string[], or?: boolean, negate?: boolean) => {
    const userRoles = React.useContext(XRoleContext);

    if (!userRoles) {
        return false;
    }

    let targetRoles = (Array.isArray(role) ? role : [role]);
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
