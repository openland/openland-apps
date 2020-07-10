import { ExecutionQueue } from 'openland-y-utils/ExecutionQueue';
import { Watcher } from 'openland-y-utils/Watcher';
import { GraphqlEngine, QueryParameters, QueryWatchParameters, GraphqlQueryWatch, GraphqlSubscriptionHandler, SubscriptionParameters, GraphqlActiveSubscription, MutationParameters, GraphqlEngineStatus } from '@openland/spacex';
import { Priority } from 'openland-api/Priority';

function extractPriority(params: undefined | QueryParameters | QueryWatchParameters | MutationParameters) {
    if (params !== undefined) {
        if (params.priority !== undefined) {
            if (typeof params.priority === 'number') {
                return params.priority;
            } else {
                return params.priority.priority;
            }
        }
    }

    return Priority.NORMAL;
}

export class PriorityEngine implements GraphqlEngine {

    // Execution queue
    private _execitionQueue = new ExecutionQueue({ parallelism: 24 /* Enforced by server too */ });

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
        let priority = extractPriority(params);
        return this._execitionQueue.sync(async () => {
            return await this.engine.query(query, vars, params);
        }, priority);
    }

    queryWatch<TQuery, TVars>(query: string, vars?: TVars, params?: QueryWatchParameters): GraphqlQueryWatch<TQuery> {
        return this.engine.queryWatch(query, vars, params);
    }

    //
    // Mutation
    //

    mutate<TQuery, TVars>(query: string, vars?: TVars, params?: MutationParameters): Promise<TQuery> {
        let priority = extractPriority(params);
        return this._execitionQueue.sync(async () => {
            return await this.engine.mutate(query, vars, params);
        }, priority);
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