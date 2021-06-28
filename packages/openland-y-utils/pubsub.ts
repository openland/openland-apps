export class EventNotifier<T> {
    private subscribers: ((ev: T) => void)[] = [];

    emit(ev: T) {
        setImmediate(() => {
            for (let listener of this.subscribers) {
                listener(ev);
            }
        });
    }

    subscribe(cb: (ev: T) => void) {
        this.subscribers.push(cb);
        return () => {
            let index = this.subscribers.indexOf(cb);
            if (index === -1) {
                throw new Error('Double unsubscribe');
            }
            this.subscribers.splice(index, 1);
        };
    }
}