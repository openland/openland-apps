export class VM<T> {
    private val: T | undefined;
    private listeners = new Set<(val: T) => void>();
    cold?: boolean;
    constructor(cold?: boolean) {
        this.cold = cold;
    }
    set = (val: T) => {
        let updated = val !== this.val;
        this.val = val;
        if (updated) {
            for (let l of this.listeners) {
                l(val);
            }
        }
    }
    get = () => {
        return this.val;
    }
    listen = (listener: (val: T) => void) => {
        this.listeners.add(listener);
        if (!this.cold && this.val) {
            listener(this.val);
        }
        return () => this.listeners.delete(listener);
    }
}

export class VMMap<K, T> {
    vals = new Map<K, T>();
    protected listeners = new Map<K, Set<(val: T) => void>>();
    protected allListeners = new Set<(vals: Map<K, T>) => void>();
    protected allValuesListeners = new Set<(val: T) => void>();
    protected allShallowListeners = new Set<(vals: Map<K, T>) => void>();
    keys = () => {
        return this.vals.keys();
    }
    values = () => {
        return this.vals.values();
    }
    set = (key: K, val: T, force?: boolean) => {
        let updated = this.vals.get(key) !== val;
        this.vals.set(key, val);
        if (updated || force) {
            this.notify(key, val);
            this.notifyShallow(key, val);
        }
        return this;
    }
    get = (key: K) => {
        return this.vals.get(key);
    }
    delete = (key: K) => {
        let updated = this.vals.has(key);
        if (updated) {
            this.vals.delete(key);
            for (let l of this.allListeners) {
                l(this.vals);
            }
        }
        return this;
    }
    listen = (key: K, listener: (val: T) => void) => {
        let listeners = this.listeners.get(key);
        if (!listeners) {
            listeners = new Set();
            this.listeners.set(key, listeners);
        }
        listeners.add(listener);
        let val = this.vals.get(key);
        if (val) {
            listener(val);
        }
        return () => {
            if (listeners) {
                listeners.delete(listener);
                if (listener.length === 0) {
                    this.listeners.delete(key);
                }
            }
        };
    }
    notify = (key: K, val: T) => {
        for (let l of this.listeners.get(key) || []) {
            l(val);
        }
        for (let l of this.allListeners) {
            l(this.vals);
        }
    }
    notifyShallow = (key: K, val: T) => {
        for (let l of this.allShallowListeners) {
            l(this.vals);
        }
    }
    listenAll = (listener: (vals: Map<K, T>) => void) => {
        this.allListeners.add(listener);
        listener(this.vals);
        return () => {
            this.allListeners.delete(listener);
        };
    }
    listenAllShallow = (listener: (vals: Map<K, T>) => void) => {
        this.allShallowListeners.add(listener);
        listener(this.vals);
        return () => {
            this.allShallowListeners.delete(listener);
        };
    }
    listenAllValues = (listener: (val: T) => void) => {
        this.allValuesListeners.add(listener);
        for (let [, v] of this.vals) {
            listener(v);
        }
        return () => {
            this.allValuesListeners.delete(listener);
        };
    }
}

export class VMSetMap<K, T> extends VMMap<K, Set<T>> {
    add = (key: K, val: T, force?: boolean) => {
        let current = this.vals.get(key);
        if (!current) {
            current = new Set();
            this.set(key, current);
        }
        let updated = !current.has(val);
        current.add(val);
        if (updated || force) {
            this.notify(key, current);
        }
        return this;
    }

    remove = (key: K, val: T) => {
        let current = this.vals.get(key);
        if (!current) {
            return this;
        }
        let updated = current.has(val);
        current.delete(val);
        if (updated) {
            this.notify(key, current);
        }
        return this;
    }
}

export class VMMapMap<K, I, T> extends VMMap<K, Map<I, T>> {
    idListeners = new Map<I, Set<(val: T) => void>>();
    allIdListeners = new Set<(val: T) => void>();
    reverceMap = new Map<I, K>();
    hasId = (id: I) => {
        return this.reverceMap.has(id);
    }
    getById = (id: I) => {
        let key = this.reverceMap.get(id);
        if (key) {
            return this.get(key)?.get(id);
        }
        return undefined;
    }
    add = (key: K, id: I, val: T, force?: boolean) => {
        let current = this.vals.get(key);
        if (!current) {
            current = new Map();
            this.set(key, current);
        }
        this.reverceMap.set(id, key);
        let updated = current.get(id) !== val;
        current.set(id, val);
        if (updated || force) {
            this.notify(key, current);
            for (let l of this.idListeners.get(id) || []) {
                l(val);
            }
            for (let l of this.allIdListeners) {
                l(val);
            }
        }
        return this;
    }
    addById = (id: I, val: T, force?: boolean) => {
        let key = this.reverceMap.get(id);
        if (key) {
            this.add(key, id, val, force);
        }
    }

    deleteVal = (key: K, id: I) => {
        let current = this.vals.get(key);
        if (!current) {
            return this;
        }
        let updated = current.has(id);
        current.delete(id);
        this.reverceMap.delete(id);
        if (updated) {
            this.notify(key, current);
        }
        return this;
    }

    deleteByValId = (id: I) => {
        let key = this.reverceMap.get(id);
        if (key) {
            this.deleteVal(key, id);
        }
        return this;
    }

    listenId = (key: K, id: I, listener: (val: T) => void) => {
        let idListeners = this.idListeners.get(id);
        if (!idListeners) {
            idListeners = new Set();
            this.idListeners.set(id, idListeners);
        }
        idListeners.add(listener);
        let val = this.vals.get(key)?.get(id);
        if (val) {
            listener(val);
        }
        return () => {
            idListeners?.delete(listener);
        };

    }

    listenAllIds = (listener: (val: T) => void) => {
        this.allIdListeners.add(listener);
        // TODO: iterate all values?
        return () => {
            this.allIdListeners.delete(listener);
        };

    }
}