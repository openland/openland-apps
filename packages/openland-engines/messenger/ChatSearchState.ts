export class ChatSearchState {
    readonly loading: boolean;
    readonly loadingHistory: boolean;
    readonly historyFullyLoaded: boolean;
    readonly itemsCount: number;

    constructor(loading: boolean, loadingHistory: boolean, historyFullyLoaded: boolean, itemsCount: number) {
        this.loading = loading;
        this.loadingHistory = loadingHistory;
        this.historyFullyLoaded = historyFullyLoaded;
        this.itemsCount = itemsCount;
    }
}