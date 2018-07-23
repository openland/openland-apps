import * as React from 'react';
import { Query } from 'react-apollo';
import { GraphQLRoutedComponentProps } from './graphql';
import { prepareParams } from './prepareParams';
import { GraphqlTypedQuery } from 'openland-y-graphql/typed';
import { XRouterContext } from 'openland-x-routing/XRouterContext';

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
    class RoutedGraphql extends React.Component<{ variables?: TVars }> {
      render() {
        let { variables, ...other } = this.props;
        return (
          <XRouterContext.Consumer>
            {(router) => {
              let preparedVariables = {
                ...prepareParams(options && options.params ? options.params : [], router!!.routeQuery),
                ...(this.props.variables as any)
              };
              return (
                <Query
                  query={query.document}
                  variables={preparedVariables}
                  notifyOnNetworkStatusChange={options ? options.notifyOnNetworkStatusChange : undefined}
                  fetchPolicy={options ? options.fetchPolicy : undefined}
                >
                  {(results) => {
                    if (options && options.throwOnError && results.data.error) {
                      throw results.data.error;
                    }
                    return (<Component {...other} {...results} variables={preparedVariables} router={router!!} />);
                  }}
                </Query>
              );
            }}
          </XRouterContext.Consumer>
        );
      }
    }
    // RoutedGraphql as.displayName = `withQuery(${getComponentDisplayName(Component)})`;
    return RoutedGraphql;
  };
}