import { GraphqlClient, GraphqlQuery, GraphqlMutation, GraphqlActiveSubscription, GraphqlSubscription, GraphqlQueryWatch, OperationParameters, ApiError, InvalidField } from './GraphqlClient';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { Observable } from 'apollo-link';
import { FetchPolicy } from 'apollo-client';
import { throwFatalError } from 'openland-y-utils/throwFatalError';
import { GraphQLError } from 'graphql';

function convertError(errors: GraphQLError[]) {
    let message = errors[0].message;
    let invalidFields: InvalidField[] = [];
    for (let e of errors) {
        if ((e as any).invalidFields) {
            for (let i of (e as any).invalidFields) {
                let ex = invalidFields.find((v) => v.key === i.key);
                if (ex) {
                    ex.messages.push(i.message);
                } else {
                    invalidFields.push({ key: i.key, messages: [i.message] });
                }
            }
        }
    }
    return new ApiError(message, invalidFields);
}

class ApolloSubscription<TSubscription, TVars> implements GraphqlActiveSubscription<TSubscription, TVars> {
    private readonly client: ApolloGraphqlClient;
    private source?: Observable<any>;
    private sourceSubscription?: ZenObservable.Subscription;
    private statusSubscription: () => void;
    private subscription: any;
    private vars: any;
    private queue: any[] = [];
    private pending?: (src: any) => void;
    private stopped = false;

    constructor(client: ApolloGraphqlClient, subscription: any, vars?: any) {
        this.client = client;
        this.vars = vars;
        this.subscription = subscription;

        this.statusSubscription = client.client.status.subscribe((isConnected) => {
            if (isConnected) {
                this.handleConnected();
            } else {
                this.handleDisconnected();
            }
        });
        if (client.client.status.isConnected) {
            this.handleConnected();
        } else {
            this.handleDisconnected();
        }
    }

    private tryStart = () => {
        if (this.stopped) {
            return;
        }
        if (this.source) {
            return;
        }
        console.log('trying to start');
        this.source = this.client.client.client.subscribe({ query: this.subscription, variables: this.vars });
        this.sourceSubscription = this.source.subscribe({
            next: this.handleNext,
            error: this.handleError,
            complete: this.handleError
        });
    }

    private tryStop = () => {
        if (!this.source) {
            return;
        }
        console.log('trying to stop');
        try {
            if (!this.sourceSubscription!.closed) {
                this.sourceSubscription!.unsubscribe();
            }
        } catch (e) {
            // Ignore exception since this method will throw if connection already closed
        }
        this.sourceSubscription = undefined;
        this.source = undefined;
    }

    private handleConnected = () => {
        this.tryStart();
    }

    private handleDisconnected = () => {
        this.tryStop();
    }

    private handleNext = (src: any) => {
        if (this.pending) {
            if (this.queue.length > 0) {
                this.queue.push(src.data);
            } else {
                let p = this.pending;
                this.pending = undefined;
                p(src.data);
            }
        } else {
            this.queue.push(src.data);
        }
    }

    private handleError = (err?: any) => {
        console.log('error');
        console.log(err);
        this.tryStop();
        this.tryStart();
    }

    get = async () => {
        if (this.queue.length > 0) {
            return this.queue.shift();
        } else {
            if (this.pending) {
                throw Error('Multiple subscribers are not supported yet')
            }
            return await new Promise<any>((resolver) => this.pending = resolver);
        }
    }

    updateVariables = (src?: any) => {
        this.vars = src;
    }

    destroy = () => {
        if (this.stopped) {
            return;
        }
        this.stopped = true
        this.statusSubscription();
        this.tryStop();
    }
}

export class ApolloGraphqlClient implements GraphqlClient {

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
        let callback: ((args: { data?: TQuery, error?: Error }) => void) | undefined = undefined;
        let subscription = source.subscribe({
            next: (v) => {
                if (callback) {
                    if (v.errors) {
                        callback({ error: convertError([...v.errors]) })
                    } else {
                        callback({ data: v.data });
                    }
                }
            },
            error: (e) => {
                throwFatalError('Fatal error: Query Watch can\'t throw error')
            },
            complete: () => {
                throwFatalError('Fatal error: Query Watch can\'t be completed')
            }
        });
        return {
            subscribe: (handler: ((args: { data?: TQuery, error?: Error }) => void)) => {
                callback = handler
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
                if (!subscription.closed) {
                    subscription.unsubscribe();
                }
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
        return new ApolloSubscription(this, subscription.document, vars);
    }

    // useQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): TQuery {

    //     // Build and wait for initial data
    //     const observableQuery = React.useMemo(
    //         () => this.client.client.watchQuery({ query: query.document, variables: vars }),
    //         [query.document, keyFromObject(vars)]
    //     );

    //     // Subsctibe for latest values
    //     const [responseId, setResponseId] = React.useState(0);
    //     const currentResult = React.useMemo(() => {
    //         return observableQuery.currentResult();
    //     }, [responseId, observableQuery]);
    //     React.useEffect(() => {
    //         const invalidateCurrentResult = () => setResponseId(x => x + 1);
    //         let subs = observableQuery.subscribe(invalidateCurrentResult, invalidateCurrentResult);
    //         return () => {
    //             subs.unsubscribe();
    //         }
    //     }, [observableQuery]);

    //     if (currentResult.errors && currentResult.errors.length > 0) {
    //         throw currentResult.errors;
    //     }

    //     if (currentResult.loading || currentResult.partial) {
    //         throw observableQuery.result();
    //     }

    //     return currentResult.data as TQuery
    // }

    // useWithoutLoaderQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): TQuery | null {

    //     // Build and wait for initial data
    //     const observableQuery = React.useMemo(
    //         () => this.client.client.watchQuery({ query: query.document, variables: vars }),
    //         [query.document, keyFromObject(vars)]
    //     );

    //     // Subsctibe for latest values
    //     const [responseId, setResponseId] = React.useState(0);
    //     const currentResult = React.useMemo(() => {
    //         return observableQuery.currentResult();
    //     }, [responseId, observableQuery]);
    //     React.useEffect(() => {
    //         const invalidateCurrentResult = () => setResponseId(x => x + 1);
    //         let subs = observableQuery.subscribe(invalidateCurrentResult, invalidateCurrentResult);
    //         return () => {
    //             subs.unsubscribe();
    //         }
    //     }, [observableQuery]);

    //     if (currentResult.errors && currentResult.errors.length > 0) {
    //         throw currentResult.errors;
    //     }

    //     if (currentResult.loading || currentResult.partial) {
    //         // throw observableQuery.result();
    //         return null;
    //     }

    //     return currentResult.data as TQuery
    // }

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
}