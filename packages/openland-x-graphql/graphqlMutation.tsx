import * as React from 'react';
import { graphql } from 'react-apollo';
import { DocumentNode } from 'graphql';
import { GraphQLRoutedComponentProps } from './graphql';
import { XWithRouter, withRouter } from 'openland-x-routing/withRouter';
import { prepareParams } from './prepareParams';

export interface MutationParams {
    name: string;
    params?: string[];
    refetchQueries?: any[];
}

export function graphqlMutation<TResult>(document: DocumentNode, params: MutationParams) {
    return function (component: React.ComponentType<GraphQLRoutedComponentProps<{}> & TResult>): React.ComponentType<{ variables?: any }> {
        let qlWrapper = graphql<{}, XWithRouter & { variables?: any }, GraphQLRoutedComponentProps<{}> & TResult>(document, {
            name: params.name,
            options: (props: XWithRouter & { variables?: any }) => {
                return {
                    variables: {
                        ...prepareParams(params.params ? params.params : [], props.router.routeQuery),
                        ...props.variables
                    },
                    refetchQueries: params.refetchQueries ? params.refetchQueries.map((p: any) => ({ query: p })) : []
                };
            }
        });

        return withRouter(qlWrapper(component));
    };
}