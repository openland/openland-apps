import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { ConferenceJoinMutation } from 'openland-api/ConferenceJoinMutation';
import { backoff, delay } from 'openland-y-utils/timer';
import { ConferenceKeepAliveMutation } from 'openland-api/ConferenceKeepAliveMutation';
import { ConferenceLeaveMutation } from 'openland-api/ConferenceLeaveMutation';
import { ConferenceQuery } from 'openland-api';

export class TalkSession {
    readonly client: OpenApolloClient;
    readonly cid: string;
    state: 'connecting' | 'online' | 'completed';
    private peerId!: string;
    private convId!: string;
    private callback: (peerId: string, convId: string) => void;
    private destroyed = false;

    constructor(cid: string, client: OpenApolloClient, callback: (peerId: string, convId: string) => void) {
        this.cid = cid;
        this.client = client;
        this.state = 'connecting';
        this.callback = callback;

        backoff(async () => {
            if (this.state === 'completed') {
                return;
            }
            if (!this.convId) {
                this.convId = (await this.client.query(ConferenceQuery, { id: cid })).data.conference.id;
            }
            if (this.state === 'connecting') {
                this.peerId = (await this.client.mutate(ConferenceJoinMutation, { id: this.convId })).data!.conferenceJoin.peerId as string;
                if (!this.destroyed) {
                    this.state = 'online';
                    this.callback(this.peerId!, this.convId!);
                }
            }

            this.startKeepAlive();
        });
    }

    private startKeepAlive() {
        backoff(async () => {
            while (this.state !== 'completed') {
                await this.client.mutate(ConferenceKeepAliveMutation, { id: this.convId, peerId: this.peerId });
                await delay(2000);
            }
            await this.client.mutate(ConferenceLeaveMutation, { id: this.convId, peerId: this.peerId });
        });
    }

    close() {
        this.destroyed = true;
        this.state = 'completed';
        backoff(async () => {
            if (this.convId && this.peerId) {
                await this.client.mutate(ConferenceLeaveMutation, { id: this.convId, peerId: this.peerId });
            }
        });
    }
}