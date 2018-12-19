import * as React from 'react';
import { GraphqlTypedQuery } from 'openland-y-graphql/typed';
import { YApolloContext } from 'openland-y-graphql/YApolloProvider';
import { ApolloCurrentResult } from 'apollo-client';

export function useQuery<T, V>(query: GraphqlTypedQuery<T, V>, variables?: V) {
    let client = React.useContext(YApolloContext)!;
    let watchQuery = React.useMemo(() => client.client.watchQuery<T, V>({
        query: query.document,
        variables: variables ? { ...(variables as any) } as any : undefined
    }), []);
    let [state, setState] = React.useState<ApolloCurrentResult<T>>(watchQuery.currentResult());
    React.useEffect(() => {
        let subs = watchQuery.subscribe((d) => {
            setState(d);
        });
        return () => subs.unsubscribe();
    }, [watchQuery]);

    return React.useMemo(() => {
        return ({
            data: state.data as T,
            loading: state.loading,
            error: state.error
        })
    }, [state.data, state.error, state.loading]);
}