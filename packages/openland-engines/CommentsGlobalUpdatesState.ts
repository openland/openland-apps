export class CommentsGlobalUpdatesState {
    readonly loading: boolean;

    constructor(loading: boolean) {
        this.loading = loading;
    }
}

export interface CommentsGlobalUpdatesStateHandler {
    onStateUpdated(state: CommentsGlobalUpdatesState): void;
}
