import { OpenlandClient } from 'openland-api/spacex';
import { Persistence } from 'openland-engines/persistence/Persistence';

export class DialogsEngine {
    readonly client: OpenlandClient;
    readonly persistence: Persistence;

    constructor(client: OpenlandClient, persistence: Persistence) {
        this.client = client;
        this.persistence = persistence;
    }

    // TODO: Implement
}