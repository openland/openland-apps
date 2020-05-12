import { reliableWatcher } from "openland-api/reliableWatcher";
import { OpenlandClient } from 'openland-api/spacex';
import { GlobalEventBus as GlobalEventBusType } from 'openland-api/spacex.types';

export class GlobalEventBus {
    topic: string;
    listeners = new Set<(message: string) => void>();
    client: OpenlandClient;
    eventBusSubscription: () => void;
    constructor(topic: string, client: OpenlandClient) {
        this.client = client;
        this.topic = topic;
        this.eventBusSubscription = reliableWatcher<GlobalEventBusType>((handler) => client.subscribeGlobalEventBus({ topic }, handler), m => {
            for (let l of this.listeners) {
                l(m.globalEventBus.message);
            }
        });
    }

    subscribe = (listener: (message: string) => void) => {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }

    publish = async (message: string) => {
        this.client.mutateGlobalEventBusPublish({ topic: this.topic, message });
    }
}