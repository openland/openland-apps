import * as React from 'react';
import { QueryProps } from 'react-apollo';
import { Loader } from './Loader';

export function withLoader<P>(WrappedComponent: React.ComponentType<P>):
    React.ComponentType<{ data: QueryProps } & P> {
    return function (props: { data: QueryProps } & P) {
        if (props.data.loading) {
            return (
                <div style={{ boxAlign: 'center', height: '100%' }} key="_loader">
                    <Loader />
                </div>
            );
        } else if (props.data.error != null) {
            return (
                <div key="_message">
                    {props.data.error.message}
                </div>
            );
        }

        return (
            <WrappedComponent {...props} key="_component" />
        );
    };
}