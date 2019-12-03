import { getClient } from './graphqlClient';

export function useClient(unsafe?: boolean) {
    return getClient(unsafe);
}