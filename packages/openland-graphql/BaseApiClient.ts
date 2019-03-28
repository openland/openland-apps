import * as React from 'react';
import { GraphqlQuery, GraphqlClient, GraphqlQueryWatch, GraphqlQueryResult, QueryWatchParameters } from './GraphqlClient';
import { keyFromObject } from './utils/keyFromObject';
import { ClientCache, ClientCacheContext } from './ClientCache';

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

    private getQueryWatch<TQuery, TVars>(cache: Map<String, GraphqlQueryWatch<{}>>, query: GraphqlQuery<TQuery, TVars>, vars?: TVars, opts?: QueryWatchParameters): GraphqlQueryWatch<TQuery> {
        let shouldBeScoped = opts && opts.fetchPolicy && (opts.fetchPolicy === 'cache-and-network' || opts.fetchPolicy === 'network-only');
        let q = cache;
        if (shouldBeScoped) {
            q = this.queries;
        }
        let key = query.document.definitions[0].name.value + '$' + keyFromObject(vars);
        if (cache.has(key)) {
            return cache.get(key)!! as GraphqlQueryWatch<TQuery>
        } else {
            let res = this.client.queryWatch(query, vars, opts);
            cache.set(key, res);
            return res;
        }
    }

    private useObservableQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars, opts?: QueryWatchParameters): [GraphqlQueryWatch<TQuery>, GraphqlQueryResult<TQuery> | undefined] {
        const clientCache = React.useContext(ClientCacheContext)
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
}