import * as React from 'react';
import { DataSourceItem, DataSource, DataSourceWatcher } from 'openland-y-utils/DataSource';
import { NativeDataView } from './platform/NativeDataView';
import { AsyncRenderer } from './internals/renderer';
import UUID from 'uuid/v4';
import { ASEventEmitter } from './platform/ASEventEmitter';
import { SQueue } from 'react-native-s/SQueue';
import { throttledMap } from 'react-native-s/SThrottler';
import { doSimpleHash } from 'openland-y-utils/hash';

class ItemRenderHolder<T extends DataSourceItem> {
    item: T;
    private _currentState: any;
    currentStateHash: number;
    readonly dataView: ASDataView<T>;

    private container: AsyncRenderer;
    private render: (src: T) => React.ReactElement<{}>;

    constructor(dataView: ASDataView<T>, initial: T, render: (src: T) => React.ReactElement<{}>) {
        this.dataView = dataView;
        this.item = initial;
        this.render = render;
        this.container = new AsyncRenderer(
            () => {
                let st = this.container.getState();
                let hs = doSimpleHash(JSON.stringify(st));
                if (this.currentStateHash !== hs) {
                    if (this.currentStateHash !== 0) {
                        dataView.onDataSourceItemRenderUpdated(this.item.key);
                    }
                    this.currentState = st;
                    this.currentStateHash = hs;
                }
            },
            render(initial)
        );
        this.currentState = this.container.getState();
        this.currentStateHash = doSimpleHash(JSON.stringify(this.currentState));
    }

    set currentState(val: any) {
        this._currentState = Object.assign({}, val); // clone the value so currentState does not get changed from external sources
                                                     // If you need to set an already cloned object or an object that will not be changed from outside,
                                                     // please create a separate method to set currentState directly, without cloning.
    }

    get currentState() {
        return this._currentState;
    }

    updateItem(item: T) {
        this.container.render(this.render(item));
    }

    destroy() {
        this.container.render(null);
    }
}

export class ASDataView<T extends DataSourceItem> implements DataSourceWatcher<T> {
    private readonly dataSource: DataSource<T>;
    private readonly render: (src: T) => (React.ReactElement<{}>);
    private items: ItemRenderHolder<T>[] = [];
    readonly key = UUID();
    private readonly queue = new SQueue();

    constructor(dataSource: DataSource<T>, render: (src: T, ) => React.ReactElement<{}>) {
        this.render = render;
        this.dataSource = dataSource;
        this.dataSource.watch(this);
        // Register for load more events
        ASEventEmitter.registerOnLoadMore(this.key, () => { this.dataSource.needMore(); });
        ASEventEmitter.registerOnLoadMoreForward(this.key, () => { this.dataSource.needMoreForward(); });
    }

    onDataSourceInited = (data: T[], completed: boolean, completedForward: boolean, anchor?: string) => {
        this.queue.push(async () => {
            // Create initial items
            let start = Date.now();
            this.items = await throttledMap(data, (v) => new ItemRenderHolder(this, v, this.render));
            // Forward initial state to native
            let config = JSON.stringify(await throttledMap(this.items, (v) => ({
                key: v.item.key,
                config: v.currentState
            })));
            console.log('DataSource inited in ' + (Date.now() - start) + ' ms');
            NativeDataView.dataViewInit(this.key, config, completed, completedForward, anchor);
        });
    }

    onDataSourceScrollToKeyRequested = (scrollToKey: string) => {
        NativeDataView.dataViewScrollToKeyReqested(this.key, scrollToKey);
    }

    onDataSourceScrollToTop = () => {
        NativeDataView.dataViewScrollToTopFunc(this.key);
    }

    onDataSourceItemAdded = (item: T, index: number, isAnchor: boolean) => {
        this.queue.push(async () => {
            let holder = new ItemRenderHolder(this, item, this.render);

            // Insert item
            let itms = [...this.items];
            itms.splice(index, 0, holder);
            this.items = itms;

            // Forward to native
            NativeDataView.dataViewAddItem(this.key, item.key, JSON.stringify(holder.currentState), index, isAnchor);
        });
    }
    onDataSourceItemRemoved = (item: T, index: number) => {
        this.queue.push(async () => {
            // Remove item
            let itms = [...this.items];
            let removed = itms.splice(index, 1);
            removed[0].destroy();
            this.items = itms;

            // Forward to native
            NativeDataView.dataViewRemoveItem(this.key, item.key, index);
        });
    }
    onDataSourceItemUpdated = (item: T, index: number) => {
        this.queue.push(async () => {
            // Update item
            this.items[index].updateItem(item);
        });
    }
    onDataSourceItemMoved = (item: T, fromIndex: number, toIndex: number) => {
        this.queue.push(async () => {
            // Move item
            let itms = [...this.items];
            let r = itms.splice(fromIndex, 1);
            r[0].updateItem(item);
            itms.splice(toIndex, 0, r[0]);
            this.items = itms;

            // Forward to native
            NativeDataView.dataViewMoveItem(this.key, item.key, fromIndex, toIndex);
        });
    }

    onDataSourceLoadedMore = (items: T[], completed: boolean) => {
        this.queue.push(async () => {
            let added = await throttledMap(items, (v) => new ItemRenderHolder(this, v, this.render));
            this.items = [...this.items, ...added];

            // Forward initial state to native
            let config = JSON.stringify(await throttledMap(added, (v) => ({
                key: v.item.key,
                config: v.currentState
            })));
            NativeDataView.dataViewLoadedMore(this.key, config, completed);
        });
    }

    onDataSourceLoadedMoreForward = (items: T[], completed: boolean) => {
        this.queue.push(async () => {
            let added = await throttledMap(items, (v) => new ItemRenderHolder(this, v, this.render));
            this.items = [...added, ...this.items];

            // Forward initial state to native
            let config = JSON.stringify(await throttledMap(added, (v) => ({
                key: v.item.key,
                config: v.currentState
            })));
            NativeDataView.dataViewLoadedMoreForward(this.key, config, completed);
        });
    }

    onDataSourceCompleted = () => {
        //
    }
    onDataSourceCompletedForward = () => {
        //
    }

    onDataSourceItemRenderUpdated = (key: string) => {
        this.queue.push(async () => {
            let index = this.items.findIndex((v) => v.item.key === key);
            NativeDataView.dataViewUpdateItem(this.key, key, JSON.stringify(this.items[index].currentState), index);
        });
    }
}