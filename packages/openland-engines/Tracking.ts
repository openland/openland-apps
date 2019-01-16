import { AppStorage } from 'openland-y-runtime-native/AppStorage';
import uuid from 'uuid/v4';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import { backoff } from 'openland-y-utils/timer';

const Persist = gql`
    mutation PersistEvents($did: String!, $events: [Event!]!) {
        track(did: $did, events: $events)
    }
`;

class TrackingEngine {

    private client!: ApolloClient<{}>;
    private initPromise: Promise<void> | undefined;
    private deviceId!: string;
    private pending: { id: string, event: string, params?: string }[] = [];
    private isSending = false;

    setClient(client: ApolloClient<{}>) {
        if (!this.client) {
            this.client = client;
            this.flush();
        }
    }

    track(event: string, params?: { [key: string]: any }) {
        console.log('Event: ' + event, params);

        this.pending.push({ event: event, params: params ? JSON.stringify(params) : undefined, id: uuid() });

        this.flush();
    }

    private async flush() {
        if (!this.client) {
            return;
        }
        if (this.isSending) {
            return;
        }
        if (this.pending.length === 0) {
            return;
        }

        this.isSending = true;
        if (!this.initPromise) {
            this.initPromise = (async () => {
                let did = await AppStorage.readKey<string>('device-id');
                if (!did) {
                    did = uuid();
                    await AppStorage.writeKey<string>('device-id', did);
                }
                this.deviceId = did;

                console.log('DEVICE-ID: ' + did);
            })();
        }

        await this.initPromise;

        await backoff(async () => {
            let events = [...this.pending];
            let res = await this.client.mutate({
                mutation: Persist, variables: {
                    did: this.deviceId,
                    events: events
                }
            });
            if (res.errors && res.errors.length > 0) {
                throw Error('Error during persisting event');
            }
        })

        this.isSending = false;
        this.flush();
    }
}

export const Track = new TrackingEngine();