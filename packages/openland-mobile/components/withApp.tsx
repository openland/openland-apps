import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { getClient } from '../utils/apolloClient';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { YApolloProvider } from 'openland-y-graphql/YApolloProvider';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { getMessenger } from '../utils/messenger';
import { PushManager } from './PushManager';
import { ZSafeAreaView } from './ZSaveAreaView';

export const withApp = (Wrapped: React.ComponentType<NavigationInjectedProps>, args?: { noSafeWrapper: boolean }) => {
    let res = (props: NavigationInjectedProps) => {
        return (
            <YApolloProvider client={getClient()}>
                <MessengerContext.Provider value={getMessenger()}>
                    <PushManager client={getClient()} />
                    {args && args.noSafeWrapper && <Wrapped {...props} />}
                    {!(args && args.noSafeWrapper) && <ZSafeAreaView><Wrapped {...props} /></ZSafeAreaView>}
                </MessengerContext.Provider>
            </YApolloProvider>
        );
    };

    hoistNonReactStatics(res, Wrapped);

    return res;
};