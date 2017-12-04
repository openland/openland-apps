import * as React from 'react';
import { QueryProps } from 'react-apollo';
import { Loader } from './Loader';
import * as Router from 'react-router';

export function withLoader<P>(WrappedComponent: React.ComponentType<P>):
    React.ComponentType<{ data: QueryProps } & P> {
    return function (props: { data: QueryProps } & P) {
        console.warn(props);
        if (props.data.loading) {
            return (
                <Loader />
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

export function withRootLoader<P>(WrappedComponent: React.ComponentType<P>): React.ComponentType<{ data: QueryProps } & P> {
    return Router.withRouter<{ data: QueryProps } & P>(props => {
        if (props.data.loading) {
            return (
                <div className="st-page">
                    <Loader />
                </div>
            );
        } else if (props.data.error != null) {
            if (props.data.error.networkError != null) {
                if ((props.data.error.networkError as any).response.status === 404) {
                    props.history.push('/404');
                    return null;
                }
            }
            return (
                <div key="_message">
                    {props.data.error.message}
                </div>
            );
        }

        return (
            <WrappedComponent {...props} key="_component" />
        );
    });
}