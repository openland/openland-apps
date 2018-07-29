import { XStore } from './XStore';
import { readValue } from './utils/readValue';
import { storeClone } from './utils/storeClone';

export class XStoreState {
    private store: XStore;
    private data: any;

    constructor(store: XStore, data: any) {
        this.store = store;
        this.data = data;
    }

    export = () => {
        return storeClone(this.data);
    }

    reset = () => {
        this.store.reset();
    }

    readValue = (name: string) => {
        return readValue(this.data, name);
    }

    writeValue = (name: string, value: any) => {
        this.store.writeValue(name, value);
    }
}