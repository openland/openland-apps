export class ChatSearchState {
    readonly loading: boolean;
    readonly loadingHistory: boolean;
    readonly historyFullyLoaded: boolean;

    constructor(loading: boolean, loadingHistory: boolean, historyFullyLoaded: boolean) {
        this.loading = loading;
        this.loadingHistory = loadingHistory;
        this.historyFullyLoaded = historyFullyLoaded;
    }
}