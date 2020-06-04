export interface QueueEngine<T> {
    readonly size: number;
    pop(): T | undefined;
    push(src: T): void;
}