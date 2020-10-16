export class ChatSearchState {
    readonly loading: boolean;
    readonly historyFullyLoaded: boolean;

    constructor(loading: boolean, historyFullyLoaded: boolean) {
        this.loading = loading;
        this.historyFullyLoaded = historyFullyLoaded;
    }
}