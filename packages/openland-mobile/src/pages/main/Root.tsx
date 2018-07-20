import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { AppStack } from '../../routes';

export class Root extends React.Component<NavigationInjectedProps, { client: ApolloClient<NormalizedCacheObject> | null }> {
    state = {
        client: null
    };

    componentDidMount() {
        (async () => {
            let token = await AsyncStorage.getItem('openland-token')!!;
            var headers: any = {};
            if (token) {
                headers['x-openland-token'] = token;
            }
            const httpLink = new HttpLink({
                uri: 'https://api.openland.com/api',
                headers: headers,
            });
            let client = new ApolloClient({
                link: httpLink,
                cache: new InMemoryCache(),
                ssrMode: false,
                connectToDevTools: false
            });
            this.setState({client});
        })();
    }
    render() {
        if (this.state.client) {
            return (
                <ApolloProvider client={this.state.client!!}>
                    <AppStack />
                </ApolloProvider>
            );
        }
        return null;
    }
}