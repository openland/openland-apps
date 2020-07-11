import * as React from 'react';
import { WatchSubscription } from './Watcher';
import { createFifoQueue } from 'openland-y-utils/Queue';

async function throttle() {
    return new Promise(r => {
        setTimeout(r, 1);
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
    onDataSourceInited(data: T[], completed: boolean, completedForward: boolean, anchor?: string, reloaded?: boolean): void;
    onDataSourceScrollToKeyRequested(scrollToKey: string): void;
    onDataSourceScrollToTop(): void;
    onDataSourceItemAdded(item: T, index: number, isAnchor: boolean): void;
    onDataSourceItemUpdated(item: T, index: number): void;
    onDataSourceItemRemoved(item: T, index: number): void;
    onDataSourceItemMoved(item: T, fromIndex: number, toIndex: number): void;
    onDataSourceLoadedMore(data: T[], completed: boolean): void;
    onDataSourceLoadedMoreForward(data: T[], completed: boolean): void;
    onDataSourceCompleted(): void;
    onDataSourceCompletedForward(): void;
}

export interface ReadableDataSource<T extends DataSourceItem> {
    needMore(): void;
    needMoreForward(): void;
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
    private needMoreForwardCallback: () => void;
    private completed: boolean = false;
    private completedForward: boolean = true;
    private anchor?: string;

    constructor(needMoreCallback: () => void, needMoreForwardCallback: () => void) {
        this.needMoreCallback = needMoreCallback;
        this.needMoreForwardCallback = needMoreForwardCallback;
    }

    needMore() {
        if (!this.completed) {
            this.needMoreCallback();
        }
    }
    needMoreForward() {
        if (!this.completedForward) {
            this.needMoreForwardCallback();
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
        return [...this.data];
    }
    getSize() {
        return this.data.length;
    }

    initialize(data: T[], completed: boolean, completedForward: boolean, anchor?: string, reset?: boolean) {
        this.anchor = anchor;
        if (this.destroyed) {
            throw Error('Datasource already destroyed');
        }
        if (this.inited) {
            this.inited = false;
        }
        this.completed = completed;
        this.completedForward = completedForward;
        this.data = data;
        this.dataByKey = new Map();
        for (let d of data) {
            this.dataByKey.set(d.key, d);
        }
        this.inited = true;
        for (let w of this.watchers) {
            w.onDataSourceInited(data, completed, completedForward, anchor, reset);
        }
    }

    isInited = () => {
        return this.inited;
    }

    isCompleted = () => {
        return this.completed;
    }

    isCompletedForward = () => {
        return this.completedForward;
    }

    requestScrollToKey(scrollToKey: string) {
        for (let w of this.watchers) {
            if (w.onDataSourceScrollToKeyRequested) {
                w.onDataSourceScrollToKeyRequested(scrollToKey);
            }
        }
    }

    requestScrollToTop() {
        for (let w of this.watchers) {
            if (w.onDataSourceScrollToTop) {
                w.onDataSourceScrollToTop();
            }
        }
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

    addItem(item: T, index: number, isAnchor?: boolean) {
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
        if (isAnchor) {
            this.anchor = item.key;
        }
        for (let w of this.watchers) {
            w.onDataSourceItemAdded(item, index, !!isAnchor);
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

    reset(data?: T[]) {
        if (this.destroyed) {
            throw Error('Datasource already destroyed');
        }
        this.inited = false;
        this.initialize(data || [], false, true, undefined, true);
    }
    clear() {
        if (this.destroyed) {
            throw Error('Datasource already destroyed');
        }
        this.data.map(o => this.removeItem(o.key));
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
            console.warn(key, index);
            console.warn(this.data);
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

    loadedMoreForward(items: T[], completed: boolean) {
        let filtered = items.filter(v => !this.hasItem(v.key));
        for (let v of filtered) {
            this.dataByKey.set(v.key, v);
        }
        this.data = [...filtered, ...this.data];
        this.completedForward = completed;
        for (let w of this.watchers) {
            w.onDataSourceLoadedMoreForward(filtered, completed);
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

    completeForward() {
        if (this.destroyed) {
            throw Error('Datasource already destroyed');
        }
        if (this.completedForward) {
            return;
        }
        this.completedForward = true;
        for (let w of this.watchers) {
            w.onDataSourceCompletedForward();
        }
    }

    watch(handler: DataSourceWatcher<T>): WatchSubscription {
        this.watchers.push(handler);
        if (this.inited) {
            handler.onDataSourceInited(this.data, this.completed, this.completedForward, this.anchor);
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
            onDataSourceInited(data: T[], completed: boolean, completedForward: boolean) {
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
            onDataSourceLoadedMoreForward(data: T[], completed: boolean) {
                callback();
            },
            onDataSourceCompleted() {
                callback();
            },
            onDataSourceCompletedForward() {
                callback();
            },
            onDataSourceScrollToKeyRequested(key: string) {
                //
            },
            onDataSourceScrollToTop() {
                //
            }
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
        }, () => {
            this.needMoreForward();
        });

        if (this.inited) {
            res.initialize(this.data.map(map), this.completed, this.completedForward, this.anchor);
        }

        this.watch({
            onDataSourceInited(data: T[], completed: boolean, completedForward: boolean, anchor?: string, reset?: boolean) {
                res.initialize(data.map(map), completed, completedForward, anchor, reset);
            },
            onDataSourceItemAdded(item: T, index: number, isAnchor: boolean) {
                res.addItem(map(item), index, isAnchor);
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
            onDataSourceLoadedMoreForward(data: T[], completed: boolean) {
                res.loadedMoreForward(data.map(map), completed);
            },
            onDataSourceCompleted() {
                res.complete();
            },
            onDataSourceCompletedForward() {
                res.completeForward();
            },
            onDataSourceScrollToKeyRequested(key: string) {
                res.requestScrollToKey(key);
            },
            onDataSourceScrollToTop() {
                res.requestScrollToTop();
            }
        });

        return res;
    }

    throttledMap<T2 extends DataSourceItem>(map: (src: T) => T2) {
        let res = new DataSource<T2>(() => {
            this.needMore();
        }, () => {
            this.needMoreForward();
        });

        let queue = createFifoQueue<() => any>();
        (async () => {
            let c = 0;
            while (true) {
                let s = await queue.get();
                if (c++ > 10) {
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
                res.initialize(await throttledMap(this.data, map), this.completed, this.completedForward, this.anchor);
            });
        }

        this.watch({
            onDataSourceInited(data: T[], completed: boolean, completedForward: boolean, anchor?: string, reset?: boolean) {
                schedule(async () => {
                    res.initialize(await throttledMap(data, map), completed, completedForward, anchor, reset);
                });
            },
            onDataSourceItemAdded(item: T, index: number, isAnchor: boolean) {
                schedule(async () => {
                    res.addItem(map(item), index, isAnchor);
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
            onDataSourceLoadedMoreForward(data: T[], completed: boolean) {
                schedule(async () => {
                    res.loadedMoreForward(await throttledMap(data, map), completed);
                });
            },
            onDataSourceCompleted() {
                schedule(async () => {
                    res.complete();
                });
            },
            onDataSourceCompletedForward() {
                schedule(async () => {
                    res.completeForward();
                });
            },
            onDataSourceScrollToKeyRequested(key: string) {
                schedule(async () => {
                    res.requestScrollToKey(key);
                });
            },
            onDataSourceScrollToTop() {
                schedule(async () => {
                    res.requestScrollToTop();
                });
            }
        });

        return res;
    }

    batched(): DataSource<T> {
        let res = new DataSource<T>(() => {
            this.needMore();
        }, () => {
            this.needMoreForward();
        });

        if (this.inited) {
            res.initialize(this.data, this.completed, this.completedForward, this.anchor);
        }

        let batch: {
            op: 'added' | 'updated' | 'removed' | 'moved';
            item: T;
            index: number;
            toIndex?: number;
            isAnchor?: boolean;
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
                    // if skip remove operation, then delete+add in one batch will crash on itemAlreadyExists
                    // removed[b.item!.key] = false;
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
                    res.addItem(values[b.item.key], b.index, !!b.isAnchor);
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
            onDataSourceInited(data: T[], completed: boolean, completedForward: boolean, anchor?: string, reset?: boolean) {
                res.initialize(data, completed, completedForward, anchor, reset);
            },
            onDataSourceItemAdded(item: T, index: number, isAnchor: boolean) {
                batch.push({ op: 'added', item, index, isAnchor });
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
            onDataSourceLoadedMoreForward(data: T[], completed: boolean) {
                if (batchScheduled) {
                    clearTimeout(timer);
                    doDlush();
                }
                res.loadedMoreForward(data, completed);
            },
            onDataSourceCompleted() {
                if (batchScheduled) {
                    clearTimeout(timer);
                    doDlush();
                }
                res.complete();
            },
            onDataSourceCompletedForward() {
                if (batchScheduled) {
                    clearTimeout(timer);
                    doDlush();
                }
                res.completeForward();
            },
            onDataSourceScrollToKeyRequested(key: string) {
                if (batchScheduled) {
                    clearTimeout(timer);
                    doDlush();
                }
                res.requestScrollToKey(key);
            },
            onDataSourceScrollToTop() {
                if (batchScheduled) {
                    clearTimeout(timer);
                    doDlush();
                }
                res.requestScrollToTop();
            }
        });

        return res;
    }
}

export function useDataSource<T extends DataSourceItem>(
    dataSource: ReadableDataSource<T>,
): [T[], boolean, boolean, { scrollTo: string | undefined }] {
    let [items, setItems] = React.useState<T[]>([]);
    let [scrollToHolder, setScrollTo] = React.useState<{ scrollTo: string | undefined }>({ scrollTo: undefined });
    let [completed, setCompleted] = React.useState<boolean>(false);
    let [completedForward, setCompletedForward] = React.useState<boolean>(true);
    React.useEffect(
        () => {
            let lastData: T[] = [];
            let w = dataSource.watch({
                onDataSourceInited: (data: T[], isCompleted: boolean, isCompletedForward: boolean, anchor?: string, reset?: boolean) => {
                    lastData = [...data];
                    setItems(data);
                    setCompleted(isCompleted);
                    setCompletedForward(isCompletedForward);
                    // console.warn('useDataSource', dataSource, anchor);
                    if (anchor) {
                        setScrollTo({ scrollTo: anchor });
                    }
                    if (reset && !anchor && data.length) {
                        setScrollTo({ scrollTo: data[0].key });
                    }
                },
                onDataSourceItemAdded: (item: T, index: number) => {
                    let data = [...lastData];
                    data.splice(index, 0, item);
                    lastData = data;
                    setItems(data);
                },
                onDataSourceItemUpdated: (item: T, index: number) => {
                    let data = [...lastData];
                    data[index] = item;
                    lastData = data;
                    setItems(data);
                },
                onDataSourceItemRemoved: (item: T, index: number) => {
                    let data = [...lastData];
                    data.splice(index, 1);
                    lastData = data;
                    setItems(data);
                },
                onDataSourceItemMoved: (item: T, fromIndex: number, toIndex: number) => {
                    let data = [...lastData];
                    data.splice(fromIndex, 1);
                    data.splice(toIndex, 0, item);
                    lastData = data;
                    setItems(data);
                },
                onDataSourceLoadedMore: (ndata: T[], isCompleted: boolean) => {
                    let data = [...lastData, ...ndata];
                    lastData = data;
                    setItems(data);
                    setCompleted(isCompleted);
                },
                onDataSourceLoadedMoreForward: (ndata: T[], isCompleted: boolean) => {
                    let data = [...ndata, ...lastData];
                    lastData = data;
                    setItems(data);
                    setCompletedForward(isCompleted);
                },
                onDataSourceCompleted: () => {
                    setCompleted(true);
                },
                onDataSourceCompletedForward: () => {
                    // setCompletedForward(true);
                },
                onDataSourceScrollToKeyRequested: scrollTo => {
                    setScrollTo({ scrollTo });
                },
                onDataSourceScrollToTop: () => {
                    //
                }
            });
            return w;
        },
        [dataSource],
    );

    return [items, completed, completedForward, scrollToHolder];
}