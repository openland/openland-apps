import * as React from 'react';
import { MutationFunc, Mutation } from 'react-apollo';
import { prepareParams } from './prepareParams';
import { GraphqlTypedMutation, GraphqlTypedQuery } from './typed';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';

export interface MutationParams {
    params?: string[];
    refetchParams?: string[];
    refetchQueries?: GraphqlTypedQuery<any, any>[];
}

export function graphqlMutation<TQuery, TVars, TN extends string>(mutation: GraphqlTypedMutation<TQuery, TVars>, name: TN, params: MutationParams = {}) {
    return function (WrappedComponent: React.ComponentType<{ router: XRouter } & { refetchVars?: any } & Record<TN, MutationFunc<TQuery, Partial<TVars>>>>): React.ComponentType<{ variables?: Partial<TVars> }> {
        const Wrapped2 = (WrappedComponent as any) as React.ComponentType<any>;
        class RouterMutation extends React.Component<{ variables?: Partial<TVars>, refetchVars?: any }> {
            render() {
                let { variables, ...other } = this.props;
                return (
                    <XRouterContext.Consumer>
                        {(router) => {
                            let preparedParams = {
                                ...prepareParams(params.params ? params.params : [], router!!.routeQuery),
                                ...(this.props.variables as any)
                            };
                            let refetchQueries = params.refetchQueries ? params.refetchQueries.map((p) => ({ query: p.document, variables: { ...prepareParams(params.refetchParams ? params.refetchParams : [], router!!.routeQuery), ...this.props.refetchVars } })) : [];
                            return (
                                <Mutation mutation={mutation.document} variables={preparedParams} refetchQueries={refetchQueries}>
                                    {(res) => {
                                        let props = {
                                            [name]: res
                                        };
                                        return (<Wrapped2 router={router!!} {...props} {...other} />);
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