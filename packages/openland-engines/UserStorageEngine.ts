import { MessengerEngine } from './MessengerEngine';

export class UserStorageEngine {
    readonly messenger: MessengerEngine;

    constructor(messenger: MessengerEngine) {
        this.messenger = messenger;
    }

    useKeys(namespace: string, keys: string[]) {
        return this.messenger.client.useUserStorage({ namespace, keys }, { fetchPolicy: 'cache-and-network' });
    }

    async setKeys(namespace: string, keys: { key: string, value?: string | undefined | null }[]) {
        await this.messenger.client.mutateUserStorageSet({ namespace, data: keys });
    }
}