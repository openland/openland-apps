export type UpdatesSubscriptionEvent<T> =
    | { type: 'stopped' }
    | { type: 'started', seq: number }
    | { type: 'event', seq: number, sequence: string, pts: number, event: T };

export type UpdatesSubscriptionHandler<T> = (event: UpdatesSubscriptionEvent<T>) => void;

export interface UpdatesSubscription<T> {
    start(handler: UpdatesSubscriptionHandler<T>): void;
    stop(): void;
}