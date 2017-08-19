import * as React from 'react';
import { QueryProps } from 'react-apollo';
import * as S from 'semantic-ui-react';

export function withLoader<P>(WrappedComponent: React.ComponentType<P>):
    React.ComponentType<{ data: QueryProps } & P> {
    return function (props: { data: QueryProps } & P) {
        if (props.data.loading) {
            return (
                <S.Loader size="big" active={true} />
            );
        } else if (props.data.error != null) {
            return (
                <div>
                    {props.data.error.message}
                </div>
            );
        }
        return (
            <WrappedComponent {...props} />
        );
    };
}