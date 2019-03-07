import * as React from 'react';
import { MutationFunc, Mutation } from 'react-apollo';
import { prepareParams } from './prepareParams';
import { GraphqlTypedMutation, GraphqlTypedQuery } from 'openland-y-graphql/typed';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';
import { IsActiveContext } from '../openland-web/pages/main/mail/components/Components';

export interface MutationParams {
    params?: string[];
    refetchParams?: string[];
    refetchQueries?: GraphqlTypedQuery<any, any>[];
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
        class MutationComponentWrapper extends React.Component<any> {
            // static whyDidYouRender = true;

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

        const Wrapped2 = (WrappedComponent as any) as React.ComponentType<any>;
        class RouterMutation extends React.Component<{
            variables?: Partial<TVars>;
            refetchVars?: any;
            isActive: boolean;
        }> {
            renderMutation(router: any, other: any, preparedParams: any, res: any) {
                let converted = (args: any) => {
                    if (args.variables) {
                        args.variables = { ...preparedParams, ...args.variables };
                    } else {
                        args.variables = preparedParams;
                    }
                    return res(args as any);
                };
                let props = {
                    [name]: converted,
                };

                return (
                    <MutationComponentWrapper
                        isActive={this.props.isActive}
                        Component={Wrapped2}
                        componentProps={{
                            router,
                            ...props,
                            ...other,
                            variables: preparedParams,
                            isActive: this.props.isActive,
                        }}
                    />
                );
            }
            renderRouter(other: any, router: any) {
                let preparedParams = {
                    ...prepareParams(params.params ? params.params : [], router!!.routeQuery),
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
                        {this.renderMutation.bind(this, router, other, preparedParams)}
                    </Mutation>
                );
            }
            render() {
                let { variables, ...other } = this.props;
                return (
                    <XRouterContext.Consumer>
                        {this.renderRouter.bind(this, other)}
                    </XRouterContext.Consumer>
                );
            }
        }

        const WrapRouterMutation = (props: any) => {
            const isActive = React.useContext(IsActiveContext);

            return <RouterMutation {...props} isActive={isActive} />;
        };

        return WrapRouterMutation;
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
