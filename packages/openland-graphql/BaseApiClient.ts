import * as React from 'react';
import { GraphqlQuery, GraphqlClient, GraphqlQueryWatch, GraphqlQueryResult } from './GraphqlClient';
import { keyFromObject } from './utils/keyFromObject';

export class BaseApiClient {
    readonly client: GraphqlClient;
    private queries = new Map<String, GraphqlQueryWatch<{}>>();

    constructor(client: GraphqlClient) {
        this.client = client;
    }

    protected refetch<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): Promise<TQuery> {
        return this.client.query(query, vars, { fetchPolicy: 'network-only' });
    }

    protected useQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): TQuery | null {
        const [observableQuery, currentResult] = this.useObservableQuery(query, vars);
        if (currentResult && currentResult.error) {
            throw currentResult.error!!;
        } else if (currentResult && currentResult.data) {
            return currentResult.data!!;
        } else {
            return null;
        }
    }

    protected useQuerySuspense<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): TQuery {
        const [observableQuery, currentResult] = this.useObservableQuery(query, vars);
        if (currentResult && currentResult.error) {
            throw currentResult.error!!;
        } else if (currentResult && currentResult.data) {
            return currentResult.data!!;
        } else {
            throw observableQuery.result();
        }
    }

    private getQueryWatch<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): GraphqlQueryWatch<TQuery> {
        let key = query.document.definitions[0].name.value + '$' + keyFromObject(vars);
        if (this.queries.has(key)) {
            return this.queries.get(key)!! as GraphqlQueryWatch<TQuery>
        } else {
            let res = this.client.queryWatch(query, vars);
            this.queries.set(key, res);
            return res;
        }
    }

    private useObservableQuery<TQuery, TVars>(query: GraphqlQuery<TQuery, TVars>, vars?: TVars): [GraphqlQueryWatch<TQuery>, GraphqlQueryResult<TQuery> | undefined] {
        const observableQuery = this.getQueryWatch(query, vars);

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