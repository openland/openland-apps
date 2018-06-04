import * as React from 'react';
import { withUserInfo } from '../../components/UserInfo';

export const AuthRouter = function (WrappedComponent: React.ComponentType) {
    return withUserInfo((props) => {
        if (props.isCompleted) {
            console.warn(props.router.path);
            // if ([''].indexOf(props.router.path) > 0) {

            // }
            return null;
        }
        return <WrappedComponent />;
    });
};