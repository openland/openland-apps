import * as React from 'react';
import { Query } from 'react-apollo';
import { GraphQLRoutedComponentProps } from './graphql';
import { prepareParams } from './prepareParams';
import { GraphqlTypedQuery } from 'openland-y-graphql/typed';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { IsActiveContext } from 'openland-web/pages/main/mail/components/Components';
import { throwGraphQLErrors } from './throwErrors';

export function graphqlRouted<TResult, TVars>(
    query: GraphqlTypedQuery<TResult, TVars>,
    options?: {
        params?: ({ key: string; default?: string } | string)[];
        notifyOnNetworkStatusChange?: boolean;
        fetchPolicy?:
            | 'cache-first'
            | 'cache-and-network'
            | 'network-only'
            | 'cache-only'
            | 'no-cache'
            | 'standby';
        throwOnError?: boolean;
        pollInterval?: number;
    },
) {
    return function(
        Component: React.ComponentType<GraphQLRoutedComponentProps<TResult>>,
    ): React.ComponentType<{ variables?: TVars }> {
        class QueryComponentWrapper extends React.Component<any> {
            shouldComponentUpdate(props: any) {
                return props.isActive !== false;
            }

            render() {
                return (
                    <this.props.Component
                        {...this.props.componentProps}
                        isActive={this.props.isActive}
                    />
                );
            }
        }

        class RoutedGraphql extends React.Component<{
            variables?: TVars;
            isActive: boolean | null;
        }> {
            renderQuery(preparedVariables: any, other: any, router: any, results: any) {
                if (options && options.throwOnError && results.data.error) {
                    throw results.data.error;
                }
                if (results.error) {
                    console.warn(preparedVariables);

                    throwGraphQLErrors(results.error);
                }

                return (
                    <QueryComponentWrapper
                        isActive={this.props.isActive}
                        Component={Component}
                        componentProps={{
                            ...other,
                            ...results,
                            variables: preparedVariables,
                            router: router!!,
                        }}
                    />
                );
            }

            renderRouter(other: any, router: any) {
                let preparedVariables = {
                    ...prepareParams(
                        options && options.params ? options.params : [],
                        router!!.routeQuery,
                    ),
                    ...(this.props.variables as any),
                };

                return (
                    <Query
                        query={query.document}
                        variables={preparedVariables}
                        notifyOnNetworkStatusChange={
                            options ? options.notifyOnNetworkStatusChange : undefined
                        }
                        fetchPolicy={options ? options.fetchPolicy : undefined}
                        pollInterval={options ? options.pollInterval : undefined}
                    >
                        {this.renderQuery.bind(this, preparedVariables, other, router)}
                    </Query>
                );
            }

            render() {
                let { variables, isActive, ...other } = this.props;
                // console.log('renderIsActive');
                // console.log('isActive', isActive);

                return (
                    <XRouterContext.Consumer>
                        {this.renderRouter.bind(this, other)}
                    </XRouterContext.Consumer>
                );
            }
        }

        const WrapRoutedGraphql = (props: any) => {
            const isActive = React.useContext(IsActiveContext);

            return <RoutedGraphql {...props} isActive={isActive} />;
        };

        // RoutedGraphql as.displayName = `withQuery(${getComponentDisplayName(Component)})`;
        return WrapRoutedGraphql;
    };
}
