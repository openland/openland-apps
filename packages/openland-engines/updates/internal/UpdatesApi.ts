export interface UpdatesApi<T> {
    getState(): Promise<{ seq: number, vt: string }>;
    getDifference(vt: string): Promise<{
        seq: number,
        vt: string,
        hasMore: boolean,
        sequences: { sequence: string, fromPts: number, events: { pts: number, event: T }[] }[]
    }>;
}