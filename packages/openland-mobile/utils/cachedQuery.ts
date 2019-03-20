import { GraphqlClient } from 'openland-graphql/GraphqlClient';
import { GraphqlTypedQuery } from 'openland-y-graphql/typed';
import { AsyncStorage } from 'react-native';

export async function cachedQuery<T, V>(client: GraphqlClient, query: GraphqlTypedQuery<T, V>, variables: V, key: string): Promise<T> {
    let rec = await AsyncStorage.getItem('cache-' + key);
    if (rec && rec.length > 0) {
        console.log('cache HIT for ' + key);
        await client.writeQuery(JSON.parse(rec), query, variables);
    }
    let watch = client.queryWatch(query, variables);
    client.refetch(query, variables);
    return await new Promise<T>((resolve, reject) => {
        let first = true;
        (async () => {
            while (true) {
                try {
                    let d = await watch.get();
                    await AsyncStorage.setItem('cache-' + key, JSON.stringify(d));
                    if (first) {
                        first = false;
                        resolve(d);
                    }
                } catch (e) {
                    console.warn(e);
                    if (first) {
                        first = false;
                        reject(e);
                    }
                }
            }
        })();
    });
}