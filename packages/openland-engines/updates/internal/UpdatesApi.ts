export interface UpdatesApi<T, STATE extends { id: string }, DIFF extends { id: string }> {

    getState(): Promise<{
        seq: number,
        vt: string,
        sequences: { pts: number, state: STATE }[]
    }>;
    getDifference(vt: string): Promise<{
        seq: number,
        vt: string,
        hasMore: boolean,
        sequences: {
            state: DIFF,
            fromPts: number,
            events: { pts: number, event: T }[]
        }[]
    }>;
    getSequenceState(id: string): Promise<{ pts: number, state: STATE }>;
    getSequenceDifference(id: string, seq: number): Promise<{ state: DIFF, events: { pts: number, event: T }[] }>;
}