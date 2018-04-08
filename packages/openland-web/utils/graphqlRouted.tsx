import * as React from 'react';
import { graphql } from 'react-apollo';
import { DocumentNode } from 'graphql';
import { withRouter, XWithRouter } from '../components/withRouter';
import { GraphQLRoutedComponentProps } from './graphql';
import { prepareParams, getComponentDisplayName } from './utils';

export function graphqlRouted<TResult>(document: DocumentNode, params: ({ key: string, default?: string } | string)[] = [], notifyOnNetworkStatusChange?: boolean, fetchPolicy?: 'cache-first' | 'cache-and-network' | 'network-only' | 'cache-only' | 'no-cache' | 'standby') {
  return function (component: React.ComponentType<GraphQLRoutedComponentProps<TResult>>): React.ComponentType<{ variables?: any }> {
    let qlWrapper = graphql<TResult, XWithRouter & { variables?: any }, GraphQLRoutedComponentProps<TResult>>(document, {
      options: (props: XWithRouter & { variables?: any }) => {
        return {
          variables: {
            ...prepareParams(params, props.router.routeQuery),
            ...props.variables
          },
          notifyOnNetworkStatusChange,
          fetchPolicy
        };
      }
    });

    let res = withRouter(qlWrapper(component));
    res.displayName = `withQuery(${getComponentDisplayName(component)})`;
    return res;
  };
}