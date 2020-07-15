import { ReadableDataSource, DataSourceItem, DataSourceWatcher, DataSource } from './DataSource';
import { WatchSubscription } from './Watcher';

export class DataSourceWindow<T extends DataSourceItem> implements ReadableDataSource<T> {
    private readonly _inner: ReadableDataSource<T>;
    private readonly _subscription: WatchSubscription;
    private readonly _proxy: DataSource<T>;
    private _innerCompleted = false;
    private _innerCompletedForward = false;
    private _isPassThrough = false;
    private _isPassThroughBackward = false;
    private _isPassThroughForward = false;
    private _innerInited = false;
    private _windowSize: number;

    private currentWindow = { start: 0, end: -1 };

    constructor(inner: ReadableDataSource<T>, windowSize: number) {
        this._inner = inner;
        this._proxy = new DataSource(() => { /*  */ }, () => { /*  */ });
        this._windowSize = windowSize;

        let inWindow = (index: number) => {
            return (index >= this.currentWindow.start) && (index <= this.currentWindow.end);
        };
        this._subscription = inner.watch({
            onDataSourceInited: (data: T[], completed: boolean, completedForward: boolean, anchor?: string, reset?: boolean) => {
                this._innerInited = true;
                this._innerCompleted = completed;
                this._innerCompletedForward = completedForward;

                this._isPassThrough = false;
                this._isPassThroughForward = false;
                this._isPassThroughBackward = false;
                if (data.length < windowSize) {
                    this.currentWindow = { start: 0, end: data.length - 1 };
                    this._proxy.initialize(data, completed, completedForward);
                    this._isPassThrough = true;
                    this._isPassThroughForward = true;
                    this._isPassThroughBackward = true;
                } else {
                    let start = Math.max(0, data.findIndex(i => i.key === anchor) - windowSize / 2);
                    let slice = data.slice(start, start + windowSize + 1);
                    this.currentWindow.start = start;
                    this.currentWindow.end = start + windowSize;
                    this._proxy.initialize(slice, completed && this.currentWindow.end === (data.length - 1), completedForward && this.currentWindow.start === 0, anchor, reset);
                }
            },
            onDataSourceItemAdded: (item: T, index: number, isAnchor?: boolean) => {
                if (this._isPassThrough || inWindow(index)) {
                    this._proxy.addItem(item, index + this.currentWindow.start, isAnchor);
                    this.currentWindow.end++;
                } else if (index < this.currentWindow.start) {
                    this.currentWindow.start++;
                    this.currentWindow.end++;
                }
            },
            onDataSourceItemUpdated: (item: T, index: number) => {
                if (this._isPassThrough || inWindow(index)) {
                    this._proxy.updateItem(item);
                }
            },
            onDataSourceItemRemoved: (item: T, index: number) => {
                if (this._isPassThrough || inWindow(index)) {
                    this._proxy.removeItem(item.key);
                    this.currentWindow.end--;
                } else if (index < this.currentWindow.start) {
                    this.currentWindow.start--;
                    this.currentWindow.end--;
                }
            },
            onDataSourceItemMoved: (item: T, fromIndex: number, toIndex: number) => {
                if ((inWindow(fromIndex) && inWindow(toIndex)) || this._isPassThrough) {
                    // Simple move
                    this._proxy.moveItem(item.key, toIndex + this.currentWindow.start);
                } else if (!inWindow(fromIndex) && !inWindow(toIndex)) {
                    // Ignore (out of window)
                } else if (inWindow(fromIndex)) {
                    // Remove
                    this._proxy.removeItem(item.key);
                    this.currentWindow.end--;
                } else if (inWindow(toIndex)) {
                    // Add
                    this._proxy.addItem(item, toIndex + this.currentWindow.start);
                    this.currentWindow.end++;
                }
            },

            onDataSourceLoadedMore: (data: T[], completed: boolean) => {
                this._innerCompleted = completed;
                if (this._isPassThroughBackward) {
                    this._proxy.loadedMore(data, completed);
                    this.currentWindow.end += data.length;
                }
            },
            onDataSourceLoadedMoreForward: (data: T[], completed: boolean) => {
                this._innerCompletedForward = completed;
                if (this._isPassThroughForward) {
                    this._proxy.loadedMoreForward(data, completed);
                    this.currentWindow.end += data.length;
                } else {
                    this.currentWindow.end += data.length;
                    this.currentWindow.start += data.length;
                }
            },
            onDataSourceCompleted: () => {
                this._innerCompleted = true;
                if (this._isPassThroughBackward) {
                    this._proxy.complete();
                }
            },
            onDataSourceCompletedForward: () => {
                this._innerCompletedForward = true;
                if (this._isPassThroughForward) {
                    this._proxy.complete();
                }
            },
            onDataSourceScrollToKeyRequested: (key: string) => {
                this._proxy.requestScrollToKey(key);
            },
            onDataSourceScrollToTop: () => {
                this._proxy.requestScrollToTop();
            }
        });
    }

    isCompleted = () => {
        return this._proxy.isCompleted();
    }

    isCompletedForward = () => {
        return this._proxy.isCompletedForward();
    }

    needMore() {
        if (!this._innerInited) {
            return;
        }
        if (this._isPassThroughBackward) {
            this._inner.needMore();
            return;
        }

        setTimeout(() => {
            let available = Math.min(this._windowSize, this._inner.getSize() - 1 - this.currentWindow.end);
            if (available > 0) {
                let toAdd: T[] = [];
                for (let i = 1; i <= available; i++) {
                    toAdd.push(this._inner.getAt(i + this.currentWindow.end));
                }
                this.currentWindow.end += available;
                if ((this._inner.getSize() - 1 - this.currentWindow.end) > 0) {
                    this._proxy.loadedMore(toAdd, false);
                } else {
                    this._proxy.loadedMore(toAdd, this._innerCompleted);
                }
            } else {
                this._isPassThroughBackward = true;
                this._isPassThrough = this._isPassThrough || this._isPassThroughForward;
                if (this._innerCompleted) {
                    this._proxy.complete();
                } else {
                    this._inner.needMore();
                }
            }
        }, 10);
    }

    needMoreForward() {
        if (!this._innerInited) {
            return;
        }
        if (this._isPassThroughForward) {
            this._inner.needMoreForward();
            return;
        }

        setTimeout(() => {
            let available = Math.min(this._windowSize, this.currentWindow.start);
            if (available > 0) {
                let toAdd: T[] = [];
                for (let i = 1; i <= available; i++) {
                    toAdd.push(this._inner.getAt(this.currentWindow.start - i));
                }
                toAdd.reverse();
                this.currentWindow.start -= available;
                if (this.currentWindow.start) {
                    this._proxy.loadedMoreForward(toAdd, false);
                } else {
                    this._proxy.loadedMoreForward(toAdd, this._innerCompletedForward);
                }
            } else {
                this._isPassThroughForward = true;
                this._isPassThrough = this._isPassThrough || this._isPassThroughBackward;
                if (this._innerCompletedForward) {
                    this._proxy.completeForward();
                } else {
                    this._inner.needMoreForward();
                }
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