import { MessengerEngine } from 'openland-engines/MessengerEngine';

export class LocationEngine {
    readonly engine: MessengerEngine;

    constructor(engine: MessengerEngine) {
        this.engine = engine;
    }

    status = (): 'unknown' | 'denied' | 'enabled' | 'unsupported' => {
        return 'unknown';
    }
}