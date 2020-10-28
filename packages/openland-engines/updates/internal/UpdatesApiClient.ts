import { UpdateEvent } from './../Types';
import { OpenlandClient } from 'openland-api/spacex';
import { UpdatesApi } from './UpdatesApi';

export class UpdatesApiClient implements UpdatesApi<UpdateEvent> {

    private client: OpenlandClient;

    constructor(client: OpenlandClient) {
        this.client = client;
    }

    async getState(): Promise<{ seq: number, vt: string }> {
        let res = await this.client.queryGetState({ fetchPolicy: 'network-only' });
        return { seq: res.updatesState.seq, vt: res.updatesState.state };
    }

    async getDifference(vt: string): Promise<{
        seq: number,
        vt: string,
        hasMore: boolean,
        sequences: { sequence: string, fromPts: number, events: { pts: number, event: UpdateEvent }[] }[]
    }> {
        let difference = (await this.client.queryGetDifference({ state: vt })).updatesDifference;
        return {
            seq: difference.seq,
            vt: difference.state,
            hasMore: difference.hasMore,
            sequences: difference.sequences.map((seq) => ({
                fromPts: seq.after,
                sequence: seq.sequence.id,
                events: seq.events.map((e) => ({ pts: e.pts, event: e.event }))
            }))
        };
    }
}