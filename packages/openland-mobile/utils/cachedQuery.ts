import { GraphqlClient } from 'openland-graphql/GraphqlClient';
import { GraphqlTypedQuery } from 'openland-y-graphql/typed';
import { AsyncStorage } from 'react-native';

export async function cachedQuery<T, V>(client: GraphqlClient, query: GraphqlTypedQuery<T, V>, variables: V, key: string): Promise<T> {
    let rec = await AsyncStorage.getItem('cache-' + key);
    if (rec && rec.length > 0) {
        console.log('cache HIT for ' + key);
        await client.writeQuery(JSON.parse(rec), query, variables);
    }
    let watch = client.queryWatch(query, variables, { fetchPolicy: 'cache-and-network' });

    return await new Promise<T>((resolve, reject) => {
        let first = true;
        watch.subscribe(({ data, error }) => {
            if (error) {
                console.warn(error);
                if (first) {
                    first = false;
                    reject(error);
                }
            } else {
                AsyncStorage.setItem('cache-' + key, JSON.stringify(data));
                if (first) {
                    first = false;
                    resolve(data);
                }
            }
        });
    });
}