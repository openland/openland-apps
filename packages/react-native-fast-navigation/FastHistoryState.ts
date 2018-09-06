import { FastHistoryRecord } from './FastHistoryRecord';

export class FastHistoryState {
    readonly history: FastHistoryRecord[];
    constructor(history: FastHistoryRecord[]) {
        this.history = [...history];
    }
}