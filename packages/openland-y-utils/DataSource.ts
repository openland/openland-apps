import { WatchSubscription } from './Watcher';
import { Queue } from 'openland-graphql/utils/Queue';

async function throttle() {
    return new Promise(r => {
        setTimeout(r, 10);
    });
}

async function throttledMap<T, V>(src: T[], map: (item: T) => V): Promise<V[]> {
    let res: V[] = [];
    await throttle();
    for (let s of src) {
        res.push(map(s));
        await throttle();
    }
    return res;
}

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

export interface ReadableDataSource<T extends DataSourceItem> {
    needMore(): void;
    hasItem(key: string): boolean;
    findIndex(key: string): number;
    getAt(index: number): T;
    getSize(): number;
    watch(handler: DataSourceWatcher<T>): WatchSubscription;
}

export class DataSource<T extends DataSourceItem> implements ReadableDataSource<T> {
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

    findIndex(key: string) {
        return this.data.findIndex(({ key: dataKey }: { key: string }) => dataKey === key);
    }

    getItem(key: string) {
        return this.dataByKey.get(key);
    }
    getItems() {
        return [...this.dataByKey.values()];
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

    isInited = () => {
        return this.inited;
    }

    getAt(index: number) {
        if (this.destroyed) {
            throw Error('Datasource already destroyed');
        }
        if (index > this.data.length) {
            throw Error('Invalid Index');
        }
        if (index < 0) {
            throw Error('Invalid Index');
        }
        return this.data[index];
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
        let i = this.data.findIndex(v => v.key === item.key);
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
        let i = this.data.findIndex(v => v.key === key);
        if (i >= 0) {
            let removed = this.data[i];
            let res = [...this.data];
            res.splice(i, 1);
            this.data = res;
            this.dataByKey.delete(key);
            for (let w of this.watchers) {
                w.onDataSourceItemRemoved(removed, i);
            }
        } else {
            throw Error('Trying to remove non-existent item');
        }
    }
    clear() {
        if (this.destroyed) {
            throw Error('Datasource already destroyed');
        }
        this.data.map((o, i) => {
            let removed = this.data[i];
            let res = [...this.data];
            res.splice(i, 1);
            this.data = res;
            this.dataByKey.delete(o.key);
            for (let w of this.watchers) {
                w.onDataSourceItemUpdated(removed, i);
            }
        });
    }
    moveItem(key: string, index: number) {
        if (this.destroyed) {
            throw Error('Datasource already destroyed');
        }
        let i = this.data.findIndex(v => v.key === key);
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
            throw Error('Trying to move non-existent item');
        }
    }

    loadedMore(items: T[], completed: boolean) {
        let filtered = items.filter(v => !this.hasItem(v.key));
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

    dumbWatch(callback: () => void): WatchSubscription {
        return this.watch({
            onDataSourceInited(data: T[], completed: boolean) {
                callback();
            },
            onDataSourceItemAdded(item: T, index: number) {
                callback();
            },
            onDataSourceItemUpdated(item: T, index: number) {
                callback();
            },
            onDataSourceItemRemoved(item: T, index: number) {
                callback();
            },
            onDataSourceItemMoved(item: T, fromIndex: number, toIndex: number) {
                callback();
            },
            onDataSourceLoadedMore(data: T[], completed: boolean) {
                callback();
            },
            onDataSourceCompleted() {
                callback();
            },
        });
    }

    destroy() {
        if (this.destroyed) {
            throw Error('Datasource already destroyed');
        }
        this.destroyed = true;
    }

    map<T2 extends DataSourceItem>(map: (src: T) => T2) {
        let res = new DataSource<T2>(() => {
            this.needMore();
        });

        if (this.inited) {
            res.initialize(this.data.map(map), this.completed);
        }

        this.watch({
            onDataSourceInited(data: T[], completed: boolean) {
                res.initialize(data.map(map), completed);
            },
            onDataSourceItemAdded(item: T, index: number) {
                res.addItem(map(item), index);
            },
            onDataSourceItemUpdated(item: T, index: number) {
                res.updateItem(map(item));
            },
            onDataSourceItemRemoved(item: T, index: number) {
                res.removeItem(map(item).key);
            },
            onDataSourceItemMoved(item: T, fromIndex: number, toIndex: number) {
                res.moveItem(map(item).key, toIndex);
            },
            onDataSourceLoadedMore(data: T[], completed: boolean) {
                res.loadedMore(data.map(map), completed);
            },
            onDataSourceCompleted() {
                res.complete();
            },
        });

        return res;
    }

    throttledMap<T2 extends DataSourceItem>(map: (src: T) => T2) {
        let res = new DataSource<T2>(() => {
            this.needMore();
        });

        let queue = new Queue();
        (async () => {
            let c = 0;
            while (true) {
                let s = await queue.get();
                if (c++ > 3) {
                    await throttle();
                    c = 0;
                }
                await s();
            }
        })();

        function schedule(callback: () => any) {
            queue.post(callback);
        }

        if (this.inited) {
            schedule(async () => {
                res.initialize(await throttledMap(this.data, map), this.completed);
            });
        }

        this.watch({
            onDataSourceInited(data: T[], completed: boolean) {
                schedule(async () => {
                    res.initialize(await throttledMap(data, map), completed);
                });
            },
            onDataSourceItemAdded(item: T, index: number) {
                schedule(async () => {
                    res.addItem(map(item), index);
                });
            },
            onDataSourceItemUpdated(item: T, index: number) {
                schedule(async () => {
                    res.updateItem(map(item));
                });
            },
            onDataSourceItemRemoved(item: T, index: number) {
                schedule(async () => {
                    res.removeItem(map(item).key);
                });
            },
            onDataSourceItemMoved(item: T, fromIndex: number, toIndex: number) {
                schedule(async () => {
                    res.moveItem(map(item).key, toIndex);
                });
            },
            onDataSourceLoadedMore(data: T[], completed: boolean) {
                schedule(async () => {
                    res.loadedMore(await throttledMap(data, map), completed);
                });
            },
            onDataSourceCompleted() {
                schedule(async () => {
                    res.complete();
                });
            },
        });

        return res;
    }

    batched(): DataSource<T> {
        let res = new DataSource<T>(() => {
            this.needMore();
        });

        if (this.inited) {
            res.initialize(this.data, this.completed);
        }

        let batch: {
            op: 'added' | 'updated' | 'removed' | 'moved';
            item: T;
            index: number;
            toIndex?: number;
        }[] = [];

        let batchScheduled = false;
        let timer: any;

        const doDlush = () => {
            batchScheduled = false;
            let latestBatch = batch;
            batch = [];

            let removed: { [key: string]: boolean } = {};
            let added: { [key: string]: boolean } = {};
            let updated: { [key: string]: boolean } = {};
            // let updated: { [key: string]: boolean } = {};

            let values: { [key: string]: T } = {};

            // Collect values
            for (let b of latestBatch) {
                if (b.op === 'added') {
                    values[b.item!.key] = b.item!;
                    added[b.item!.key] = true;
                    removed[b.item!.key] = false;
                    updated[b.item!.key] = false;
                } else if (b.op === 'removed') {
                    if (added[b.item!.key]) {
                        added[b.item!.key] = false;
                    } else {
                        removed[b.item!.key] = true;
                        added[b.item!.key] = false;
                    }
                } else if (b.op === 'updated') {
                    values[b.item!.key] = b.item!;
                    if (!added[b.item!.key]) {
                        added[b.item!.key] = false;
                        updated[b.item!.key] = true;
                        removed[b.item!.key] = false;
                    }
                }
            }

            // Apply changes
            let processed: { [key: string]: boolean } = {};
            for (let b of latestBatch) {
                if (b.op === 'added') {
                    processed[b.item.key] = true;
                    res.addItem(values[b.item.key], b.index);
                } else if (b.op === 'moved') {
                    res.moveItem(b.item.key, b.toIndex!);
                } else if (b.op === 'updated') {
                    if (!processed[b.item.key] && updated[b.item.key]) {
                        processed[b.item.key] = true;
                        res.updateItem(values[b.item.key]);
                    }
                } else if (b.op === 'removed') {
                    if (removed[b.item.key]) {
                        processed[b.item.key] = true;
                        res.removeItem(b.item.key);
                    }
                }
            }
        };

        function scheduleFlush() {
            if (!batchScheduled) {
                batchScheduled = true;
                timer = setTimeout(() => doDlush(), 10);
            }
        }

        this.watch({
            onDataSourceInited(data: T[], completed: boolean) {
                res.initialize(data, completed);
            },
            onDataSourceItemAdded(item: T, index: number) {
                batch.push({ op: 'added', item, index });
                scheduleFlush();
            },
            onDataSourceItemUpdated(item: T, index: number) {
                batch.push({ op: 'updated', item, index });
                scheduleFlush();
            },
            onDataSourceItemRemoved(item: T, index: number) {
                batch.push({ op: 'removed', item, index });
                scheduleFlush();
            },
            onDataSourceItemMoved(item: T, fromIndex: number, toIndex: number) {
                batch.push({ op: 'moved', item, index: fromIndex, toIndex });
                scheduleFlush();
            },
            onDataSourceLoadedMore(data: T[], completed: boolean) {
                if (batchScheduled) {
                    clearTimeout(timer);
                    doDlush();
                }
                res.loadedMore(data, completed);
            },
            onDataSourceCompleted() {
                if (batchScheduled) {
                    clearTimeout(timer);
                    doDlush();
                }
                res.complete();
            },
        });

        return res;
    }
}
