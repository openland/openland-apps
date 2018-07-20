import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { getClient } from '../utils/apolloClient';
import { ApolloProvider } from 'react-apollo';
import hoistNonReactStatics from 'hoist-non-react-statics';

export const withApp = (Wrapped: React.ComponentType<NavigationInjectedProps>) => {
    let res = (props: NavigationInjectedProps) => {
        return (
            <ApolloProvider client={getClient()}>
                <Wrapped {...props} />
            </ApolloProvider>
        );
    };

    hoistNonReactStatics(res, Wrapped);

    return res;
};