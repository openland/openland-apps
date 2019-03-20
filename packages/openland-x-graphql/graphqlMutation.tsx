import * as React from 'react';
import { MutationFunc, Mutation } from 'react-apollo';
import { prepareParams, prepareSourceTargetParams } from './prepareParams';
import { GraphqlTypedMutation, GraphqlTypedQuery } from 'openland-y-graphql/typed';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';

export interface MutationParams {
    params?: string[];
    refetchParams?: string[];
    refetchQueries?: GraphqlTypedQuery<any, any>[];
    refetchRouterParams?: { sourceParamName: string; targetParamName: string }[];
}

export function graphqlMutation<TQuery, TVars, TN extends string>(
    mutation: GraphqlTypedMutation<TQuery, TVars>,
    name: TN,
    params: MutationParams = {},
) {
    return function(
        WrappedComponent: React.ComponentType<
            { router: XRouter } & { refetchVars?: any } & Record<
                    TN,
                    MutationFunc<TQuery, Partial<TVars>>
                >
        >,
    ): React.ComponentType<{ variables?: Partial<TVars> }> {
        const Wrapped2 = (WrappedComponent as any) as React.ComponentType<any>;
        class RouterMutation extends React.Component<{
            variables?: Partial<TVars>;
            refetchVars?: any;
        }> {
            render() {
                let { variables, ...other } = this.props;
                return (
                    <XRouterContext.Consumer>
                        {router => {
                            let preparedParams = {
                                ...prepareParams(
                                    params.params ? params.params : [],
                                    router!!.routeQuery,
                                ),
                                ...(this.props.variables as any),
                            };
                            let refetchQueries = params.refetchQueries
                                ? params.refetchQueries.map(p => ({
                                      query: p.document,
                                      variables: {
                                          ...prepareParams(
                                              params.refetchParams ? params.refetchParams : [],
                                              router!!.routeQuery,
                                          ),
                                          ...prepareSourceTargetParams(
                                              params.refetchRouterParams
                                                  ? params.refetchRouterParams
                                                  : [],
                                              router!!.routeQuery,
                                          ),
                                          ...this.props.refetchVars,
                                      },
                                  }))
                                : [];

                            return (
                                <Mutation
                                    mutation={mutation.document}
                                    variables={preparedParams}
                                    refetchQueries={refetchQueries}
                                >
                                    {res => {
                                        let converted = (args: any) => {
                                            if (args.variables) {
                                                args.variables = {
                                                    ...preparedParams,
                                                    ...args.variables,
                                                };
                                            } else {
                                                args.variables = preparedParams;
                                            }
                                            return res(args as any);
                                        };
                                        let props = {
                                            [name]: converted,
                                        };
                                        return (
                                            <Wrapped2
                                                router={router!!}
                                                {...props}
                                                {...other}
                                                variables={preparedParams}
                                            />
                                        );
                                    }}
                                </Mutation>
                            );
                        }}
                    </XRouterContext.Consumer>
                );
            }
        }
        return RouterMutation;
        // let qlWrapper = graphql<{}, XWithRouter & { variables?: TVars }, GraphQLRoutedComponentProps<{}> & Record<TN, MutationFunc<TQuery, TVars>>>(mutation.document, {
        //     name: name,
        //     options: (props: XWithRouter & { variables?: any, refetchVars?: any }) => {
        //         return {
        //             variables: {
        //                 ...prepareParams(params.params ? params.params : [], props.router.routeQuery),
        //                 ...props.variables
        //             },
        //             refetchQueries: params.refetchQueries ? params.refetchQueries.map((p) => ({ query: p.document, variables: { ...prepareParams(params.refetchParams ? params.refetchParams : [], props.router.routeQuery), ...props.refetchVars } })) : []
        //         };
        //     }
        // });

        // return withRouter(qlWrapper(component));
    };
}
