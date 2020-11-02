import { UpdateEvent, UpdateSequenceState, UpdateSeuqenceDiff } from './../Types';
import { OpenlandClient } from 'openland-api/spacex';
import { UpdatesApi } from './UpdatesApi';

export class UpdatesApiClient implements UpdatesApi<UpdateEvent, UpdateSequenceState, UpdateSeuqenceDiff> {

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
        sequences: { state: UpdateSeuqenceDiff, fromPts: number, events: { pts: number, event: UpdateEvent }[] }[]
    }> {
        let difference = (await this.client.queryGetDifference({ state: vt })).updatesDifference;
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

    getSequenceState(id: string): Promise<{ pts: number, state: UpdateSequenceState }> {
        throw Error('not implemented');
    }

    getSequenceDifference(id: string, seq: number): Promise<{ state: UpdateSeuqenceDiff, events: { pts: number, event: UpdateEvent }[] }> {
        throw Error('not implemented');
    }
}