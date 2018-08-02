import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { getClient } from '../utils/apolloClient';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { YApolloProvider } from 'openland-y-graphql/YApolloProvider';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { getMessenger } from '../utils/messenger';
import { PushManager } from './PushManager';
import { ZSafeAreaView } from './ZSaveAreaView';
import { ZAppContent } from './ZAppContent';

export const withApp = (Wrapped: React.ComponentType<NavigationInjectedProps>, args?: { noSafeWrapper?: boolean, isInTab?: boolean, navigationStyle?: 'large' | 'small' }) => {
    let res = (props: NavigationInjectedProps) => {
        return (
            <YApolloProvider client={getClient()}>
                <MessengerContext.Provider value={getMessenger()}>
                    <PushManager client={getClient()} />
                    <ZAppContent navigation={props.navigation} useParent={args && args.isInTab} navigationStyle={(args && args.navigationStyle) || 'large'}>
                        <Wrapped {...props} />
                    </ZAppContent>
                </MessengerContext.Provider>
            </YApolloProvider>
        );
    };

    hoistNonReactStatics(res, Wrapped);

    return res;
};