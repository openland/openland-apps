import { UpdatesSubscriptionHandler, UpdatesSubscriptionEvent, UpdatesSubscription } from './UpdatesSubscription';

export class UpdatesSubscriptionMock<T> implements UpdatesSubscription<T> {

    private handler: UpdatesSubscriptionHandler<T> | null = null;

    start(handler: UpdatesSubscriptionHandler<T>) {
        this.handler = handler;
    }

    stop() {
        this.handler = null;
    }

    push(src: UpdatesSubscriptionEvent<T>) {
        this.handler!(src);
    }
}