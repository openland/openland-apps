import { ReadableDataSource, DataSourceItem, DataSourceWatcher, DataSource } from './DataSource';
import { WatchSubscription } from './Watcher';

export class DataSourceWindow<T extends DataSourceItem> implements ReadableDataSource<T> {
    private readonly _inner: ReadableDataSource<T>;
    private readonly _subscription: WatchSubscription;
    private readonly _proxy: DataSource<T>;
    private readonly _windowSize: number;
    private _isPassThrough = false;
    private _innerCompleted = false;

    constructor(inner: ReadableDataSource<T>, windowSize: number) {
        this._inner = inner;
        this._proxy = new DataSource(() => { /*  */ });
        this._windowSize = windowSize;
        this._subscription = inner.watch({
            onDataSourceInited: (data: T[], completed: boolean) => {
                this._innerCompleted = completed;
                if (data.length < windowSize) {
                    this._proxy.initialize(data, completed);
                    this._isPassThrough = true;
                } else {
                    this._proxy.initialize(data.slice(0, windowSize), false);
                }
            },
            onDataSourceItemAdded: (item: T, index: number) => {
                if (index < this._proxy.getSize()) {
                    this._proxy.addItem(item, index);
                }
            },
            onDataSourceItemUpdated: (item: T, index: number) => {
                if (index < this._proxy.getSize()) {
                    this._proxy.updateItem(item);
                }
            },
            onDataSourceItemRemoved: (item: T, index: number) => {
                if (index < this._proxy.getSize()) {
                    this._proxy.removeItem(item.key);
                }
            },
            onDataSourceItemMoved: (item: T, fromIndex: number, toIndex: number) => {
                if ((fromIndex < this._proxy.getSize() && toIndex < this._proxy.getSize()) || this._isPassThrough) {
                    // Simple move
                    this._proxy.moveItem(item.key, toIndex);
                } else if (fromIndex >= this._proxy.getSize() && toIndex >= this._proxy.getSize()) {
                    // Ignore (out of window)
                } else if (fromIndex < this._proxy.getSize()) {
                    // Remove
                    this._proxy.removeItem(item.key);
                } else if (toIndex < this._proxy.getSize()) {
                    // Add
                    this._proxy.addItem(item, toIndex);
                }
            },
            onDataSourceLoadedMore: (data: T[], completed: boolean) => {
                this._innerCompleted = completed;
                if (this._isPassThrough) {
                    this._proxy.loadedMore(data, completed);
                }
            },
            onDataSourceCompleted: () => {
                this._innerCompleted = true;
                if (this._isPassThrough) {
                    this._proxy.complete();
                }
            },
            onDataSourceScrollToKeyRequested: (key: string) => {
                // throw Error('Not supported');
            },
        });
    }

    needMore() {
        if (this._isPassThrough) {
            this._inner.needMore();
            return;
        }

        setTimeout(() => {
            let available = Math.min(this._proxy.getSize() + this._windowSize, this._inner.getSize()) - this._proxy.getSize();
            if (available > 0) {
                let toAdd: T[] = [];
                for (let i = 0; i < available; i++) {
                    toAdd.push(this._inner.getAt(i + this._proxy.getSize()));
                }
                if (this._proxy.getSize() + available < this._inner.getSize()) {
                    this._proxy.loadedMore(toAdd, false);
                } else {
                    this._proxy.loadedMore(toAdd, this._innerCompleted);
                }
            } else {
                this._isPassThrough = true;
                this._inner.needMore();
            }
        }, 10);
    }
    hasItem(key: string) {
        return this._proxy.hasItem(key);
    }
    findIndex(key: string) {
        return this._proxy.findIndex(key);
    }
    getAt(index: number): T {
        return this._proxy.getAt(index);
    }
    getSize(): number {
        return this._proxy.getSize();
    }

    watch(handler: DataSourceWatcher<T>): WatchSubscription {
        return this._proxy.watch(handler);
    }

    destroy() {
        this._subscription();
    }
}