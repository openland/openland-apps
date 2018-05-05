import * as React from 'react';
import { graphql } from 'react-apollo';
import { DocumentNode } from 'graphql';
import { GraphQLRoutedComponentProps } from './graphql';
import { prepareParams } from './utils';
import { XWithRouter, withRouter } from 'openland-x-routing/withRouter';
import { getComponentDisplayName } from 'openland-x-utils/getComponentDisplayName';

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