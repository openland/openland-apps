import { GraphqlClient, GraphqlQuery, GraphqlMutation, GraphqlActiveSubscription, GraphqlSubscription, GraphqlQueryWatch, OperationParameters, ApiError, InvalidField, GraphqlFragment } from '../GraphqlClient';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { FetchPolicy } from 'apollo-client';
import { throwFatalError } from 'openland-y-utils/throwFatalError';
import { convertError } from './convertError';
import { DirectApolloSubscription } from './DirectApolloSubscription';
import { defaultDataIdFromObject } from 'apollo-cache-inmemory';

export class DirectApollolClient implements GraphqlClient {

    readonly client: OpenApolloClient;

    constructor(client: OpenApolloClient) {
        this.client = client;
    }

    async query<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars, params?: OperationParameters): Promise<TQuery> {
        let fetchPolicy: FetchPolicy = 'cache-first';
        if (params && params.fetchPolicy) {
            fetchPolicy = params.fetchPolicy
        }
        let res = await this.client.client.query<TQuery, TVars>({ query: query.document, variables: vars, fetchPolicy: fetchPolicy });
        if (res.errors && res.errors.length > 0) {
            throw convertError([...res.errors]);
        }
        return res.data
    }

    queryWatch<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars, params?: OperationParameters): GraphqlQueryWatch<TQuery> {
        let fetchPolicy: FetchPolicy = 'cache-first';
        if (params && params.fetchPolicy) {
            fetchPolicy = params.fetchPolicy
        }
        let source = this.client.client.watchQuery<TQuery, TVars>({ query: query.document, variables: vars, fetchPolicy: fetchPolicy })
        // let callback: ((args: { data?: TQuery, error?: Error }) => void) | undefined = undefined;
        return {
            subscribe: (handler: ((args: { data?: TQuery, error?: Error }) => void)) => {
                // callback = handler
                let subscription = source.subscribe({
                    next: (v) => {
                        if (v.errors) {
                            handler({ error: convertError([...v.errors]) })
                        } else {
                            handler({ data: v.data });
                        }
                    },
                    error: (e) => {
                        handler({ error: e });
                    },
                    complete: () => {
                        throwFatalError('Fatal error: Query Watch can\'t be completed')
                    }
                });
                return () => {
                    if (!subscription.closed) {
                        subscription.unsubscribe();
                    }
                }
            },
            currentResult: () => {
                let res = source.currentResult();
                if (res.errors && res.errors.length > 0) {
                    return ({ error: convertError([...res.errors]) })
                } else {
                    if (!res.loading && !res.partial) {
                        return ({ data: res.data as TQuery })
                    }
                }
                return undefined;
            },
            result: async () => {
                let res = await source.result();
                if (res.errors && res.errors.length > 0) {
                    return ({ error: convertError([...res.errors]) })
                } else {
                    return ({ data: res.data as TQuery })
                }
            },
            destroy: () => {
                // Nothing to do
                // this.postQueryWatchEnd(id);
            }
        }
    }

    async mutate<TMutation, TVars>(mutation: GraphqlMutation<TMutation, TVars>, vars?: TVars): Promise<TMutation> {
        let res = await this.client.client.mutate<TMutation, TVars>({ mutation: mutation.document, variables: vars, errorPolicy: 'all' });
        if (res.errors && res.errors.length > 0) {
            throw convertError([...res.errors]);
        }
        return res.data as TMutation;
    }

    subscribe<TSubscription, TVars>(subscription: GraphqlSubscription<TSubscription, TVars>, vars?: TVars): GraphqlActiveSubscription<TSubscription, TVars> {
        return new DirectApolloSubscription(this, subscription.document, vars);
    }

    async updateQuery<TQuery, TVars>(updater: (data: TQuery) => TQuery | null, query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<boolean> {
        let r = undefined;
        try {
            // https://github.com/apollographql/apollo-feature-requests/issues/1
            r = this.client.client.readQuery<TQuery>({ query: query.document, variables: vars });
        } catch (e) {
            //
        }
        if (r) {
            let udpated = updater(r);
            if (udpated) {
                this.client.client.writeQuery<TQuery>({ query: query.document, variables: vars, data: udpated });
                return true;
            }
        }
        return false;
    }

    async writeQuery<TQuery, TVars>(data: TQuery, query: GraphqlQuery<TQuery, TVars>, vars?: TVars) {
        this.client.client.writeQuery<TQuery>({ query: query.document, variables: vars, data: data });
    }

    async readQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery | null> {
        try {
            return this.client.client.readQuery<TQuery>({ query: query.document, variables: vars })
        } catch (e) {
            return null;
        }
    }

    async writeFragment<TFragment>(data: TFragment, fragment: GraphqlFragment<TFragment>): Promise<void> {
        let id = defaultDataIdFromObject(data)!;
        this.client.client.writeFragment<TFragment>({ data, id, fragment: fragment.document });
    }
}