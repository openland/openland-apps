import * as React from 'react';
import { AsyncStorage, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { buildNativeClient, saveClient, getClient } from '../../utils/apolloClient';
import { AccountQuery } from 'openland-api';
import { buildMessenger, setMessenger, getMessenger } from '../../utils/messenger';
import { ZLoader } from '../../components/ZLoader';
import { AppBadge } from 'openland-y-runtime/AppBadge';
import { AppStyles } from '../../styles/AppStyles';
import { backoff } from 'openland-y-utils/timer';
import { AppStack, LoginStack } from '../../routes';
import { YApolloProvider } from 'openland-y-graphql/YApolloProvider';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { PushManager } from '../../components/PushManager';

export class LoginLoader extends React.Component<NavigationInjectedProps, { state: 'start' | 'loading' | 'auth' | 'app' }> {
    constructor(props: NavigationInjectedProps) {
        super(props);
        this.state = {
            state: 'start'
        };
    }
    componentDidMount() {
        (async () => {
            let userToken: string | undefined = await AsyncStorage.getItem('openland-token');
            if (userToken) {
                this.setState({ state: 'loading' });
                let client = buildNativeClient(userToken);
                let res = await backoff(async () => await client.client.query<any>({
                    query: AccountQuery.document
                }));
                if (!res.data.me) {
                    userToken = undefined;
                } else {
                    let messenger = buildMessenger(client, res.data.me);
                    setMessenger(messenger);
                    saveClient(client);
                    await messenger.awaitLoading();
                }
            }

            // Reset badge if not authenticated
            if (!userToken) {
                AppBadge.setBadge(0);
            }

            // Launch app or login sequence
            if (userToken) {
                this.setState({ state: 'app' });
            } else {
                this.setState({ state: 'auth' });
            }
            // this.props.navigation.navigate(userToken ? 'App' : 'Login');
        })();
    }
    render() {
        if (this.state.state === 'loading') {
            return <ZLoader />;
        } else if (this.state.state === 'app') {
            return (
                <YApolloProvider client={getClient()}>
                    <MessengerContext.Provider value={getMessenger()}>
                        <PushManager client={getClient()} />
                        <AppStack />
                    </MessengerContext.Provider>
                </YApolloProvider>
            );
        } else if (this.state.state === 'auth') {
            return <LoginStack />;
        }

        return (<View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }} />);
    }
}