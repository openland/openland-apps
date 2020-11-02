import { UpdateEvent, UpdateSequenceState, UpdateSeuqenceDiff } from './Types';
import { UpdatesSubscriptionClient } from './internal/UpdatesSubscriptionClient';
import { UpdatesApiClient } from './internal/UpdatesApiClient';
import { MainUpdatesSubscription } from './internal/MainUpdatesSubscription';
import { OpenlandClient } from 'openland-api/spacex';
import { Persistence } from 'openland-engines/persistence/Persistence';

export class UpdatesEngine {
    readonly client: OpenlandClient;
    readonly persistence: Persistence;
    private started = false;
    private closed = false;
    private main: MainUpdatesSubscription<UpdateEvent, UpdateSequenceState, UpdateSeuqenceDiff>;

    constructor(client: OpenlandClient, persistence: Persistence) {
        this.client = client;
        this.persistence = persistence;
        this.main = new MainUpdatesSubscription(null,
            new UpdatesApiClient(this.client),
            new UpdatesSubscriptionClient(this.client));
    }

    start() {
        if (this.closed) {
            return;
        }
        if (this.started) {
            return;
        }
        this.started = true;
        this.main.start((event) => {
            console.log('updates: ', event);
        });
    }

    close() {
        if (!this.closed) {
            this.closed = true;
            this.main.stop();
        }
    }
}