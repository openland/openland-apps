import * as React from 'react';
import { graphql } from 'react-apollo';
import { GraphQLRoutedComponentProps } from './graphql';
import { XWithRouter, withRouter } from 'openland-x-routing/withRouter';
import { getComponentDisplayName } from 'openland-x-utils/getComponentDisplayName';
import { prepareParams } from './prepareParams';
import { GraphqlTypedQuery } from './typed';

export function graphqlRouted<TResult, TVars>(
  query: GraphqlTypedQuery<TResult, TVars>,
  options?: {
    params?: ({ key: string, default?: string } | string)[],
    notifyOnNetworkStatusChange?: boolean,
    fetchPolicy?: 'cache-first' | 'cache-and-network' | 'network-only' | 'cache-only' | 'no-cache' | 'standby',
    throwOnError?: boolean
  }
) {
  return function (Component: React.ComponentType<GraphQLRoutedComponentProps<TResult>>): React.ComponentType<{ variables?: TVars }> {
    let qlWrapper = graphql<TResult, XWithRouter & { variables?: TVars }, GraphQLRoutedComponentProps<TResult>>(query.document, {
      options: (props: XWithRouter & { variables?: any }) => {
        return {
          variables: {
            ...prepareParams(options && options.params ? options.params : [], props.router.routeQuery),
            ...props.variables
          },
          notifyOnNetworkStatusChange: options ? options.notifyOnNetworkStatusChange : undefined,
          fetchPolicy: options ? options.fetchPolicy : undefined
        };
      }
    });

    let Comp: React.ComponentType<GraphQLRoutedComponentProps<TResult>> = Component;
    if (options && options.throwOnError) {
      Comp = function (props: GraphQLRoutedComponentProps<TResult>) {
        if (props.data.error) {
          throw props.data.error;
        }
        return <Component {...props} />;
      };
    }
    let res = withRouter(qlWrapper(Comp));
    res.displayName = `withQuery(${getComponentDisplayName(Component)})`;
    return res;

  };
}