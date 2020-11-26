import { UpdatesApi } from './UpdatesApi';

export class UpdatesApiMock<T, S extends { id: string }, D extends { id: string }> implements UpdatesApi<T, S, D> {

    private _state: { seq: number, vt: string, sequences: { pts: number, state: S }[] } | null = null;

    setState(state: { seq: number, vt: string, sequences: { pts: number, state: S }[] }) {
        this._state = state;
    }

    async getState(): Promise<{ seq: number, vt: string, sequences: { pts: number, state: S }[] }> {
        if (!this._state) {
            throw Error('Not inited');
        }
        return this._state;
    }

    getDifference(vt: string): Promise<{
        seq: number,
        vt: string,
        hasMore: boolean,
        sequences: { state: D, fromPts: number, events: { pts: number, event: T }[] }[]
    }> {
        throw Error('Not implemented');
    }

    getSequenceState(id: string): Promise<{ pts: number, state: S }> {
        throw Error('Not implemented');
    }
    getSequenceDifference(id: string, seq: number): Promise<{ state: D, hasMore: boolean, pts: number, events: { pts: number, event: T }[] }> {
        throw Error('Not implemented');
    }
}