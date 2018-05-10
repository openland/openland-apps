import * as React from 'react';
import { graphql } from 'react-apollo';
import { DocumentNode } from 'graphql';
import { GraphQLRoutedComponentProps } from './graphql';
import { XWithRouter, withRouter } from 'openland-x-routing/withRouter';
import { getComponentDisplayName } from 'openland-x-utils/getComponentDisplayName';
import { prepareParams } from './prepareParams';

export function graphqlRouted<TResult, TVars = any>(document: DocumentNode, params: ({ key: string, default?: string } | string)[] = [], notifyOnNetworkStatusChange?: boolean, fetchPolicy?: 'cache-first' | 'cache-and-network' | 'network-only' | 'cache-only' | 'no-cache' | 'standby') {
  return function (component: React.ComponentType<GraphQLRoutedComponentProps<TResult>>): React.ComponentType<{ variables?: TVars }> {
    let qlWrapper = graphql<TResult, XWithRouter & { variables?: TVars }, GraphQLRoutedComponentProps<TResult>>(document, {
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