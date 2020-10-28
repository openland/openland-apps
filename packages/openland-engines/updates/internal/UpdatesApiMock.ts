import { UpdatesApi } from './UpdatesApi';

export class UpdatesApiMock<T> implements UpdatesApi<T> {

    private _state: { seq: number, vt: string } | null = null;

    setState(state: { seq: number, vt: string }) {
        this._state = state;
    }

    async getState(): Promise<{ seq: number, vt: string }> {
        if (!this._state) {
            throw Error('Not inited');
        }
        return this._state;
    }

    getDifference(vt: string): Promise<{
        seq: number,
        vt: string,
        hasMore: boolean,
        sequences: { sequence: string, fromPts: number, events: { pts: number, event: T }[] }[]
    }> {
        throw Error('Not implemented');
    }
}