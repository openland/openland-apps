import { OpenlandClient } from 'openland-api/spacex';
import { Persistence } from 'openland-engines/persistence/Persistence';

export class DialogsEngine {
    readonly client: OpenlandClient;
    readonly persistence: Persistence;
    private started = false;

    constructor(client: OpenlandClient, persistence: Persistence) {
        this.client = client;
        this.persistence = persistence;
    }

    start() {
        if (this.started) {
            return;
        }
        this.started = true;

        (async () => {
            let completed = await this.persistence.readBoolean('dialogs.sync.completed');
            if (completed) {
                return;
            }

            // Update
            completed = false;
            let cursor = await this.persistence.read('dialogs.sync.cursor');

            while (!completed) {
                console.info('Loading dialogs...');
                let dialogs = await this.client.queryGetInitialDialogs({ after: cursor });
                await this.persistence.inTx(async (tx) => {

                    for (let d of dialogs.syncUserChats.items) {
                        console.info(d.sequence);
                    }

                    if (dialogs.syncUserChats.cursor) {
                        tx.write('dialogs.sync.cursor', cursor);
                        tx.writeBoolean('dialogs.sync.completed', false);
                        completed = false;
                        cursor = dialogs.syncUserChats.cursor;
                    } else {
                        tx.write('dialogs.sync.cursor', null);
                        tx.writeBoolean('dialogs.sync.completed', true);
                        completed = true;
                    }
                });
            }
        })();
    }

    // handleSequence = (tx: Transaction) => {

    // }
}