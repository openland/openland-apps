import { UpdateEvent, UpdateSequenceState, UpdateSequenceDiff } from './../Types';
import { OpenlandClient } from 'openland-api/spacex';
import { UpdatesApi } from './UpdatesApi';

export class UpdatesApiClient implements UpdatesApi<UpdateEvent, UpdateSequenceState, UpdateSequenceDiff> {

    private client: OpenlandClient;

    constructor(client: OpenlandClient) {
        this.client = client;
    }

    async getState(): Promise<{ seq: number, vt: string, sequences: { pts: number, state: UpdateSequenceState }[] }> {
        let res = await this.client.queryGetState({ fetchPolicy: 'network-only' });
        return {
            seq: res.updatesState.seq,
            vt: res.updatesState.state,
            sequences: res.updatesState.sequences.map((s) => ({
                pts: s.pts,
                state: s.sequence
            }))
        };
    }

    async getDifference(vt: string): Promise<{
        seq: number,
        vt: string,
        hasMore: boolean,
        sequences: { state: UpdateSequenceDiff, fromPts: number, events: { pts: number, event: UpdateEvent }[] }[]
    }> {
        let difference = (await this.client.queryGetDifference({ state: vt }, { fetchPolicy: 'network-only' })).updatesDifference;
        return {
            seq: difference.seq,
            vt: difference.state,
            hasMore: difference.hasMore,
            sequences: difference.sequences.map((seq) => ({
                state: seq.sequence,
                fromPts: seq.after,
                sequence: seq.sequence.id,
                events: seq.events.map((e) => ({ pts: e.pts, event: e.event }))
            }))
        };
    }

    async getSequenceState(id: string): Promise<{ pts: number, state: UpdateSequenceState }> {
        let res = await this.client.queryGetSequenceState({ id }, { fetchPolicy: 'network-only' });
        return {
            pts: res.sequenceState.pts,
            state: res.sequenceState.sequence
        };
    }

    async getSequenceDifference(id: string, pts: number): Promise<{ state: UpdateSequenceDiff, hasMore: boolean, pts: number, events: { pts: number, event: UpdateEvent }[] }> {
        let res = await this.client.queryGetSequenceDifference({ id, pts }, { fetchPolicy: 'network-only' });
        return {
            state: res.sequenceDifference.sequence,
            events: res.sequenceDifference.events,
            hasMore: res.sequenceDifference.hasMore,
            pts: res.sequenceDifference.after
        };
    }
}