import * as React from 'react';
import { GraphqlTypedQuery } from 'openland-y-graphql/typed';
import { YApolloContext } from 'openland-y-graphql/YApolloProvider';
import isPlainObject from 'lodash/isPlainObject';

function objToKey(obj: any) {
    if (!obj) {
        return null;
    }
    const keys = Object.keys(obj);
    keys.sort();
    const sortedObj = keys.reduce((result, key) => {
        const value = obj[key];
        if (isPlainObject(value)) {
            result[key] = objToKey(obj[key]);
        } else {
            result[key] = obj[key];
        }
        return result;
    }, {});
    return JSON.stringify(sortedObj);
}

function shallowEq(obj1: any, obj2: any) {
    let k1 = Object.keys(obj1);
    let k2 = Object.keys(obj2);
    if (k1.length !== k2.length) {
        return false;
    }
    for (var i = 0; i < k1.length; i++) {
        var key = k1[i];

        if (obj1[key] !== obj2[key]) {
            console.log(key);
            return false;
        }
    }
    return true;
}

export function useQuery<T, V>(query: GraphqlTypedQuery<T, V>, variables?: V) {
    let client = React.useContext(YApolloContext)!;
    let k = objToKey(variables);
    // let lk = React.useRef<string>(k!);
    let watchQuery = React.useMemo(() => client.client.watchQuery<T, V>({
        query: query.document,
        variables: variables ? { ...(variables as any) } as any : undefined
    }), [query, k]);
    let [state, setState] = React.useState<number>(0);
    let stateRef = React.useRef(0);
    let res = watchQuery.currentResult();
    let lastState = React.useRef<any>(res);
    lastState.current = res;
    React.useEffect(() => {
        let subs = watchQuery.subscribe((d) => {
            if (!shallowEq(d.data, lastState.current.data) || d.loading !== lastState.current.loading || (d.errors && d.errors.length > 0)) {
                lastState.current = d;
                setState(++stateRef.current);
            }
        });
        return () => subs.unsubscribe();
    }, [watchQuery]);

    return {
        data: res.data as T,
        loading: res.loading,
        error: res.error
    };
}