import * as React from 'react';
import { OpenApolloClient } from './apolloClient';
import { ApolloProvider } from 'react-apollo';

export const YApolloContext = React.createContext<OpenApolloClient | undefined>(undefined);

export const YApolloProvider = (props: { client: OpenApolloClient, children?: any }) => {
    console.log(props.children);
    console.log(YApolloContext);
    console.log(YApolloContext.Provider);
    return (
        <YApolloContext.Provider value={props.client}>
            <ApolloProvider client={props.client.client}>
                {props.children}
            </ApolloProvider>
        </YApolloContext.Provider>
    );
};