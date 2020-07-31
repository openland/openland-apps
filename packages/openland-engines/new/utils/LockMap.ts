import { AsyncLock } from '@openland/patterns';

export class LockMap<K> {
    private _locks = new Map<K, AsyncLock>();
    inLock<T>(key: K, func: () => Promise<T> | T): Promise<T> {
        let lock = this._locks.get(key);
        if (!lock) {
            lock = new AsyncLock();
            this._locks.set(key, lock);
        }
        return lock.inLock(func);
    }
}