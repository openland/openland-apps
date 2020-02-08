import * as React from 'react';
import { GraphqlEngine, GraphqlQueryWatch, GraphqlQueryResult, QueryWatchParameters, OperationParameters, GraphqlSubscriptionHandler, GraphqlActiveSubscription } from '@openland/spacex';
import { keyFromObject } from './utils/keyFromObject';
import { ClientCacheContext } from './ClientCache';
import { createLogger } from 'mental-log';

const log = createLogger('API');

export type ApiQueryWatchParameters = QueryWatchParameters & { suspense?: boolean };

export class BaseApiClient {
    readonly engine: GraphqlEngine;
    private queries = new Map<String, GraphqlQueryWatch<{}>>();

    constructor(engine: GraphqlEngine) {
        this.engine = engine;
    }

    close = () => {
        this.engine.close();
    }

    protected query<TQuery, TVars>(query: string, vars: TVars, opts?: OperationParameters): Promise<TQuery> {
        return this.engine.query<TQuery, TVars>(query, vars, opts);
    }

    protected refetch<TQuery, TVars>(query: string, vars?: TVars): Promise<TQuery> {
        return this.engine.query<TQuery, TVars>(query, vars, { fetchPolicy: 'network-only' });
    }

    protected updateQuery<TQuery, TVars>(updater: (data: TQuery) => TQuery | null, query: string, vars?: TVars): Promise<boolean> {
        return this.engine.updateQuery<TQuery, TVars>(updater, query, vars);
    }

    protected mutate<TQuery, TVars>(mutation: string, vars?: TVars): Promise<TQuery> {
        return this.engine.mutate<TQuery, TVars>(mutation, vars);
    }

    protected subscribe<TSubscription, TVars>(handler: GraphqlSubscriptionHandler<TSubscription>, subscription: string, vars?: TVars): GraphqlActiveSubscription<TSubscription> {
        return this.engine.subscribe<TSubscription, TVars>(handler, subscription, vars);
    }

    protected useQuery<TQuery, TVars>(query: string, vars: TVars, opts: ApiQueryWatchParameters & { suspense: false }): TQuery | null;
    protected useQuery<TQuery, TVars>(query: string, vars: TVars, opts?: ApiQueryWatchParameters): TQuery;
    protected useQuery<TQuery, TVars>(query: string, vars: TVars, opts?: ApiQueryWatchParameters): TQuery | null {
        if (opts && opts.suspense === false) {
            return this.useQueryNonSuspense(query, vars, opts);
        } else {
            return this.useQuerySuspense(query, vars, opts);
        }
    }

    private useQueryNonSuspense<TQuery, TVars>(query: string, vars?: TVars, opts?: QueryWatchParameters): TQuery | null {
        // tslint:disable-next-line
        const [observableQuery, currentResult] = this.useObservableQuery<TQuery, TVars>(query, vars, opts);

        if (currentResult && currentResult.error) {
            throw currentResult.error!!;
        } else if (currentResult && currentResult.data) {
            return currentResult.data!!;
        } else {
            return null;
        }
    }

    private useQuerySuspense<TQuery, TVars>(query: string, vars?: TVars, opts?: QueryWatchParameters): TQuery {
        const [observableQuery, currentResult] = this.useObservableQuery<TQuery, TVars>(query, vars, opts);
        if (currentResult && currentResult.error) {
            throw currentResult.error!!;
        } else if (currentResult && currentResult.data) {
            return currentResult.data!!;
        } else {
            throw observableQuery.result();
        }
    }

    private useObservableQuery<TQuery, TVars>(query: string, vars?: TVars, opts?: QueryWatchParameters): [GraphqlQueryWatch<TQuery>, GraphqlQueryResult<TQuery> | undefined] {
        const clientCache = React.useContext(ClientCacheContext);

        if (!clientCache && (opts && opts.fetchPolicy && (opts.fetchPolicy === 'cache-and-network' || opts.fetchPolicy === 'network-only'))) {
            throw Error('Unable to use cache-and-network or network-only fetch policy outside of cache context');
        }
        if (clientCache) {
            log.log('Found cache ' + clientCache.key);
        }
        const observableQuery = this.getQueryWatch<TQuery, TVars>(clientCache ? clientCache.queries : this.queries, query, vars, opts);

        // Value Holder
        const [responseId, setResponseId] = React.useState(0);
        const currentResult = React.useMemo(() => {
            return observableQuery.currentResult();
        }, [responseId, observableQuery]);

        // Subscription
        React.useEffect(() => {
            return observableQuery.subscribe((args) => {
                setResponseId(x => x + 1);
            });
        }, [observableQuery]);

        return [observableQuery, currentResult];
    }

    private getQueryWatch<TQuery, TVars>(cache: Map<String, GraphqlQueryWatch<{}>>, query: string, vars?: TVars, opts?: QueryWatchParameters): GraphqlQueryWatch<TQuery> {
        let shouldBeScoped = opts && opts.fetchPolicy && (opts.fetchPolicy === 'cache-and-network' || opts.fetchPolicy === 'network-only');
        let cacheKey = (opts && opts.fetchPolicy && opts.fetchPolicy) || 'cache-first';
        let q = cache;
        if (!shouldBeScoped) {
            q = this.queries;
        }
        let key = query + '$' + keyFromObject(vars) + '$' + cacheKey;
        if (q.has(key)) {
            // SpaceX QueryWatch fetches new data itself (see usage of doRequest on SpaceXWebClient.ts, line 167)
            // so there is no need to refetch data manually here
            return q.get(key)!! as GraphqlQueryWatch<TQuery>;
        } else {
            let res = this.engine.queryWatch<TQuery, TVars>(query, vars, opts);
            q.set(key, res);
            return res;
        }
    }
}