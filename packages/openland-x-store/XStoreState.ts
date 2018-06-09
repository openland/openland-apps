import { XStore } from './XStore';
import { readValue } from './utils/readValue';

export class XStoreState {
    private store: XStore;
    private data: any;

    constructor(store: XStore, data: any) {
        this.store = store;
        this.data = data;
    }

    readValue = (name: string) => {
        return readValue(this.data, name);
    }

    writeValue = (name: string, value: any) => {
        this.store.writeValue(name, value);
    }
}