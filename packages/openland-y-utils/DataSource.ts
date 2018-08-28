import { WatchSubscription } from './Watcher';

export interface DataSourceItem {
    key: string;
}

export interface DataSourceWatcher<T extends DataSourceItem> {
    onDataSourceInited(data: T[], completed: boolean): void;
    onDataSourceItemAdded(item: T, index: number): void;
    onDataSourceItemUpdated(item: T, index: number): void;
    onDataSourceItemRemoved(item: T, index: number): void;
    onDataSourceItemMoved(item: T, fromIndex: number, toIndex: number): void;
    onDataSourceLoadedMore(data: T[], completed: boolean): void;
    onDataSourceCompleted(): void;
}

export class DataSource<T extends DataSourceItem> {
    private watchers: DataSourceWatcher<T>[] = [];
    private data: T[] = [];
    private dataByKey = new Map<string, T>();
    private inited: boolean = false;
    private destroyed: boolean = false;
    private needMoreCallback: () => void;
    private completed: boolean = false;

    constructor(needMoreCallback: () => void) {
        this.needMoreCallback = needMoreCallback;
    }

    needMore() {
        if (!this.completed) {
            this.needMoreCallback();
        }
    }

    hasItem(key: string) {
        return this.dataByKey.has(key);
    }

    getItem(key: string) {
        return this.dataByKey.get(key);
    }
    getSize() {
        return this.data.length;
    }

    initialize(data: T[], completed: boolean) {
        if (this.destroyed) {
            throw Error('Datasource already destroyed');
        }
        if (this.inited) {
            this.inited = false;
        }
        this.completed = completed;
        this.data = data;
        for (let d of data) {
            this.dataByKey.set(d.key, d);
        }
        for (let w of this.watchers) {
            w.onDataSourceInited(data, completed);
        }
        this.inited = true;
    }

    addItem(item: T, index: number) {
        if (this.destroyed) {
            throw Error('Datasource already destroyed');
        }
        if (index > this.data.length) {
            throw Error('Invalid Index');
        }
        if (index < 0) {
            throw Error('Invalid Index');
        }
        if (this.dataByKey.has(item.key)) {
            throw Error('Item already exists');
        }
        let r = [...this.data];
        r.splice(index, 0, item);
        this.data = r;
        this.dataByKey.set(item.key, item);
        for (let w of this.watchers) {
            w.onDataSourceItemAdded(item, index);
        }
    }
    updateItem(item: T) {
        if (this.destroyed) {
            throw Error('Datasource already destroyed');
        }
        let i = this.data.findIndex((v) => v.key === item.key);
        if (i >= 0) {
            this.data[i] = item;
            this.dataByKey.set(item.key, item);
            for (let w of this.watchers) {
                w.onDataSourceItemUpdated(item, i);
            }
        } else {
            console.warn('Trying to update non-existent item');
        }
    }
    removeItem(key: string) {
        if (this.destroyed) {
            throw Error('Datasource already destroyed');
        }
        let i = this.data.findIndex((v) => v.key === key);
        if (i >= 0) {
            let removed = this.data[i];
            let res = [...this.data];
            res.splice(i, 1);
            this.data = res;
            this.dataByKey.delete(key);
            for (let w of this.watchers) {
                w.onDataSourceItemUpdated(removed, i);
            }
        } else {
            console.warn('Trying to remove non-existent item');
        }
    }
    moveItem(key: string, index: number) {
        if (this.destroyed) {
            throw Error('Datasource already destroyed');
        }
        let i = this.data.findIndex((v) => v.key === key);
        if (i >= 0) {
            if (i === index) {
                return;
            }
            if (index >= this.data.length) {
                throw Error('Invalid Index');
            }
            if (index < 0) {
                throw Error('Invalid Index');
            }
            let res = [...this.data];
            let ex = res[i];
            res.splice(i, 1);
            res.splice(index, 0, ex);
            this.data = res;
            for (let w of this.watchers) {
                w.onDataSourceItemMoved(ex, i, index);
            }
        } else {
            console.warn('Trying to move non-existent item');
        }
    }

    loadedMore(items: T[], completed: boolean) {
        let filtered = items.filter((v) => !this.hasItem(v.key));
        for (let v of filtered) {
            this.dataByKey.set(v.key, v);
        }
        this.data = [...this.data, ...filtered];
        this.completed = completed;
        for (let w of this.watchers) {
            w.onDataSourceLoadedMore(filtered, completed);
        }
    }

    complete() {
        if (this.destroyed) {
            throw Error('Datasource already destroyed');
        }
        if (this.completed) {
            return;
        }
        this.completed = true;
        for (let w of this.watchers) {
            w.onDataSourceCompleted();
        }
    }

    watch(handler: DataSourceWatcher<T>): WatchSubscription {
        this.watchers.push(handler);
        if (this.inited) {
            handler.onDataSourceInited(this.data, this.completed);
        }
        return () => {
            let index = this.watchers.indexOf(handler);
            if (index < 0) {
                console.warn('Double unsubscribe detected!');
            } else {
                this.watchers.splice(index, 1);
            }
        };
    }

    destroy() {
        if (this.destroyed) {
            throw Error('Datasource already destroyed');
        }
        this.destroyed = true;
    }
}