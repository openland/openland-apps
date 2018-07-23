import * as React from 'react';
import { OpenApolloClient } from './apolloClient';
import { ApolloProvider } from 'react-apollo';

export const YApolloContext = React.createContext<OpenApolloClient | undefined>(undefined);

export const YApolloProvider = (props: { client: OpenApolloClient, children?: any }) => {
    return (
        <ApolloProvider client={props.client.client}>
            <YApolloContext.Provider value={props.client}>
                {props.children}
            </YApolloContext.Provider>
        </ApolloProvider>
    );
};