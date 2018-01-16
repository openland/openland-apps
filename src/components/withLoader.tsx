import * as React from 'react';
import { QueryProps } from 'react-apollo';
import { Loader } from './Loaders';
import Error from 'next/error';

export function withLoader<P extends { data: QueryProps }>(WrappedComponent: React.ComponentType<P>): React.ComponentType<P> {
    return function (props: { data: QueryProps } & P) {
        if (props.data.loading) {
            return (
                <Loader />
            );
        } else if (props.data.error != null) {
            return (
                <Error key="_message" statusCode={500} />
            );
        }

        return (
            <WrappedComponent {...props} key="_component" />
        );
    };
}