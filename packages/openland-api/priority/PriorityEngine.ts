import { Watcher } from 'openland-y-utils/Watcher';
import { GraphqlEngine, QueryParameters, QueryWatchParameters, GraphqlQueryWatch, GraphqlSubscriptionHandler, SubscriptionParameters, GraphqlActiveSubscription, MutationParameters, GraphqlEngineStatus } from '@openland/spacex';

export class PriorityEngine implements GraphqlEngine {

    // Status
    protected readonly statusWatcher: Watcher<GraphqlEngineStatus> = new Watcher();
    get status(): GraphqlEngineStatus {
        return this.statusWatcher.getState()!!;
    }
    watchStatus(handler: (status: GraphqlEngineStatus) => void) {
        return this.statusWatcher.watch(handler);
    }

    readonly engine: GraphqlEngine;
    constructor(opts: {
        engine: GraphqlEngine
    }) {
        this.engine = opts.engine;
        this.statusWatcher.setState(this.engine.status);
        this.engine.watchStatus((s) => {
            this.statusWatcher.setState(s);
        });
    }

    close() {
        this.engine.close();
    }

    //
    // Query
    //

    query<TQuery, TVars>(query: string, vars?: TVars, params?: QueryParameters): Promise<TQuery> {
        return this.engine.query(query, vars, params);
    }

    queryWatch<TQuery, TVars>(query: string, vars?: TVars, params?: QueryWatchParameters): GraphqlQueryWatch<TQuery> {
        return this.engine.queryWatch(query, vars, params);
    }

    //
    // Mutation
    //
    
    mutate<TQuery, TVars>(query: string, vars?: TVars, params?: MutationParameters): Promise<TQuery> {
        return this.engine.mutate(query, vars, params);
    }

    //
    // Subscriotion
    //

    subscribe<TSubscription, TVars>(handler: GraphqlSubscriptionHandler<TSubscription>, subscription: string, vars?: TVars, params?: SubscriptionParameters): GraphqlActiveSubscription<TSubscription> {
        return this.engine.subscribe(handler, subscription, vars, params);
    }

    //
    // Non-prioritized
    //

    updateQuery<TQuery, TVars>(updater: (data: TQuery) => TQuery | null, query: string, vars?: TVars): Promise<boolean> {
        return this.engine.updateQuery(updater, query, vars);
    }
    readQuery<TQuery, TVars>(query: string, vars?: TVars): Promise<TQuery | null> {
        return this.engine.readQuery(query, vars);
    }
    writeQuery<TQuery, TVars>(data: TQuery, query: string, vars?: TVars) {
        return this.engine.writeQuery(data, query, vars);
    }
}