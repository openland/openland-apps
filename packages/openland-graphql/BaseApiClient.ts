import * as React from 'react';
import { GraphqlQuery, GraphqlClient, GraphqlQueryWatch, GraphqlQueryResult, QueryWatchParameters } from './GraphqlClient';
import { keyFromObject } from './utils/keyFromObject';
import { ClientCacheContext } from './ClientCache';
import { createLogger } from 'mental-log';

const log = createLogger('API');

export class BaseApiClient {
    readonly client: GraphqlClient;
    private queries = new Map<String, GraphqlQueryWatch<{}>>();

    constructor(client: GraphqlClient) {
        this.client = client;
    }

    protected refetch<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery> {
        return this.client.query(query, vars, { fetchPolicy: 'network-only' });
    }

    protected useQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars, opts?: QueryWatchParameters): TQuery | null {
        const [observableQuery, currentResult] = this.useObservableQuery(query, vars, opts);
        if (currentResult && currentResult.error) {
            throw currentResult.error!!;
        } else if (currentResult && currentResult.data) {
            return currentResult.data!!;
        } else {
            return null;
        }
    }

    protected useQuerySuspense<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars, opts?: QueryWatchParameters): TQuery {
        const [observableQuery, currentResult] = this.useObservableQuery(query, vars, opts);
        if (currentResult && currentResult.error) {
            throw currentResult.error!!;
        } else if (currentResult && currentResult.data) {
            return currentResult.data!!;
        } else {
            throw observableQuery.result();
        }
    }

    private useObservableQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars, opts?: QueryWatchParameters): [GraphqlQueryWatch<TQuery>, GraphqlQueryResult<TQuery> | undefined] {
        log.log('useQuery: ' + JSON.stringify(opts));
        const clientCache = React.useContext(ClientCacheContext)
        if (!clientCache && (opts && opts.fetchPolicy && (opts.fetchPolicy === 'cache-and-network' || opts.fetchPolicy === 'network-only'))) {
            throw Error('Unable to use cache-and-network or network-only fetch policy outside of cache context')
        }
        if (clientCache) {
            log.log('Found cache ' + clientCache.key);
        }
        const observableQuery = this.getQueryWatch(clientCache ? clientCache.queries : this.queries, query, vars, opts);

        // Value Holder
        const [responseId, setResponseId] = React.useState(0);
        const currentResult = React.useMemo(() => {
            return observableQuery.currentResult();
        }, [responseId, observableQuery]);

        // Subscription
        React.useEffect(() => {
            return observableQuery.subscribe((args) => {
                setResponseId(x => x + 1)
            });
        }, [observableQuery]);

        return [observableQuery, currentResult]
    }

    private getQueryWatch<TQuery, TVars>(cache: Map<String, GraphqlQueryWatch<{}>>, query: GraphqlQuery<TQuery, TVars>, vars?: TVars, opts?: QueryWatchParameters): GraphqlQueryWatch<TQuery> {
        let shouldBeScoped = opts && opts.fetchPolicy && (opts.fetchPolicy === 'cache-and-network' || opts.fetchPolicy === 'network-only');
        let cacheKey = (opts && opts.fetchPolicy && opts.fetchPolicy) || 'cache-first'
        let q = cache;
        if (!shouldBeScoped) {
            q = this.queries;
        }
        let key = query.document.definitions[0].name.value + '$' + keyFromObject(vars) + '$' + cacheKey;
        if (q.has(key)) {
            return q.get(key)!! as GraphqlQueryWatch<TQuery>
        } else {
            let res = this.client.queryWatch(query, vars, opts);
            q.set(key, res);
            return res;
        }
    }
}