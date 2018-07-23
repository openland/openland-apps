import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { getClient } from '../utils/apolloClient';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { YApolloProvider } from 'openland-y-graphql/YApolloProvider';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { getMessenger } from '../utils/messenger';

export const withApp = (Wrapped: React.ComponentType<NavigationInjectedProps>) => {
    let res = (props: NavigationInjectedProps) => {
        return (
            <YApolloProvider client={getClient()}>
                <MessengerContext.Provider value={getMessenger()}>
                    <Wrapped {...props} />
                </MessengerContext.Provider>
            </YApolloProvider>
        );
    };

    hoistNonReactStatics(res, Wrapped);

    return res;
};