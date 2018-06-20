import * as React from 'react';
import { graphql, MutationFunc } from 'react-apollo';
import { GraphQLRoutedComponentProps } from './graphql';
import { XWithRouter, withRouter } from 'openland-x-routing/withRouter';
import { prepareParams } from './prepareParams';
import { GraphqlTypedMutation, GraphqlTypedQuery } from './typed';

export interface MutationParams {
    params?: string[];
    refetchParams?: string[];
    refetchQueries?: GraphqlTypedQuery<any, any>[];
}

export function graphqlMutation<TQuery, TVars, TN extends string>(mutation: GraphqlTypedMutation<TQuery, TVars>, name: TN, params: MutationParams = {}) {
    return function (component: React.ComponentType<GraphQLRoutedComponentProps<{}> & Record<TN, MutationFunc<TQuery, Partial<TVars>>>>): React.ComponentType<{ variables?: Partial<TVars> }> {
        let qlWrapper = graphql<{}, XWithRouter & { variables?: TVars }, GraphQLRoutedComponentProps<{}> & Record<TN, MutationFunc<TQuery, TVars>>>(mutation.document, {
            name: name,
            options: (props: XWithRouter & { variables?: any }) => {
                return {
                    variables: {
                        ...prepareParams(params.params ? params.params : [], props.router.routeQuery),
                        ...props.variables
                    },
                    refetchQueries: params.refetchQueries ? params.refetchQueries.map((p) => ({ query: p.document, variables: { ...prepareParams(params.refetchParams ? params.refetchParams : [], props.router.routeQuery) } })) : []
                };
            }
        });

        return withRouter(qlWrapper(component));
    };
}