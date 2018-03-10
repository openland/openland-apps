import * as React from 'react';
import { graphql } from 'react-apollo';
import { DocumentNode } from 'graphql';
import { withRouter, RouterState } from '../components/withRouter';
import { GraphQLRoutedComponentProps } from './graphql';
import { prepareParams } from './utils';

export interface MutationParams {
    name: string;
    params?: string[];
    refetchQueries?: any[];
}

export function graphqlMutation<TResult>(document: DocumentNode, params: MutationParams) {
    return function (component: React.ComponentType<GraphQLRoutedComponentProps<{}> & TResult>): React.ComponentType<{}> {
        let qlWrapper = graphql<{}, { router: RouterState }, GraphQLRoutedComponentProps<{}> & TResult>(document, {
            name: params.name,
            options: (props: { router: RouterState }) => {
                return {
                    variables: {
                        ...prepareParams(params.params ? params.params : [], props.router.query)
                    },
                    refetchQueries: params.refetchQueries ? params.refetchQueries.map((p: any) => ({query: p})) : []
                };
            }
        });

        return withRouter(qlWrapper(component));
    };
}