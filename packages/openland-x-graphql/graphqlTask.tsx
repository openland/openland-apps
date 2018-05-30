import * as React from 'react';
import * as PropTypes from 'prop-types';
import { GraphqlTypedTask } from './typed';
import { ApolloClient } from 'apollo-client';
import { RefreshTaskQuery } from 'openland-api/queries/Tasks.types';

export function graphqlTask<T, V, R>(task: GraphqlTypedTask<T, V, R>) {
    return function <TProps>(WrappedComponent: React.ComponentType<{
        task: {
            startTask: (args: V) => void,
            status: 'NOT_STARTED' | 'IN_PROGRESS' | 'FAILED' | 'COMPLETED',
            result: R | null
        }
    } & TProps>) {
        return class TaskComponent extends React.Component<TProps, { status: 'NOT_STARTED' | 'IN_PROGRESS' | 'FAILED' | 'COMPLETED', result: R | null }> {
            static contextTypes = {
                client: PropTypes.object.isRequired,
            };

            private started = false;
            private client: ApolloClient<{}>;
            private _isMounted = true;
            private _isCompleted = false;
            private currentTaskId: string | null = null;

            constructor(props: TProps, context: any) {
                super(props, context);
                this.client = context.client as ApolloClient<{}>;
                this.state = { status: 'NOT_STARTED', result: null };
            }

            componentWillUnmount() {
                this._isMounted = false;
            }

            private sceduleRefresh = () => {
                window.setTimeout(
                    async () => {
                        if (!this._isMounted || this._isCompleted) {
                            return;
                        }
                        // TODO: Implement network error tolration
                        try {
                            let res = await this.client.query({
                                query: RefreshTaskQuery.document,
                                variables: {
                                    id: this.currentTaskId
                                },
                                fetchPolicy: 'network-only'
                            });
                            this.handleTask((res.data as any).task);
                        } catch (e) {
                            console.warn(e);
                            if (this._isMounted) {
                                this.setState({ status: 'FAILED' });
                            }
                            return;
                        }
                        this.sceduleRefresh();
                    },
                    1000);
            }

            private handleTask = (obj: any) => {
                let c = obj as { id: string, result: string, status: 'IN_PROGRESS' | 'FAILED' | 'COMPLETED' };
                if (c.status === 'FAILED' || c.status === 'COMPLETED') {
                    this._isCompleted = true;
                }
                if (this.currentTaskId === null) {
                    this.currentTaskId = c.id;
                    this.sceduleRefresh();
                }
                if (c.status === 'COMPLETED') {
                    this.setState({ result: JSON.parse(c.result) });
                }
                this.setState({ status: c.status });
                console.warn(obj);
            }

            private startTask = (args: V) => {
                if (!this.started && this._isMounted) {
                    this.started = true;
                    this.setState({ status: 'IN_PROGRESS' });
                    (async () => {
                        try {
                            let res = await this.client.mutate({
                                mutation: task.document,
                                variables: args
                            });
                            let obj = res.data!!.task;
                            this.handleTask(obj);
                        } catch (e) {
                            console.warn(e);
                            this.setState({ status: 'FAILED' });
                        }
                    })();

                    // window.setTimeout()
                }
            }

            render() {
                return (
                    <WrappedComponent
                        task={{
                            startTask: this.startTask,
                            result: this.state.result,
                            status: this.state.status
                        }}
                        {...this.props} />
                );
            }
        };
    };
}