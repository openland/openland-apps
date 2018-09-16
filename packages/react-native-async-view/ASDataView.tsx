import * as React from 'react';
import { DataSourceItem, DataSource, DataSourceWatcher } from 'openland-y-utils/DataSource';
import { NativeDataView } from './platform/NativeDataView';
import { AsyncRenderer } from './internals/renderer';
import UUID from 'uuid/v4';
import { ASEventEmitter } from './platform/ASEventEmitter';
import { SQueue } from 'react-native-s/SQueue';
import { throttledMap } from 'react-native-s/SThrottler';

class ItemRenderHolder<T extends DataSourceItem> {
    item: T;
    currentState: string;
    private container: AsyncRenderer;
    private render: (src: T) => React.ReactElement<{}>;
    private dataView: ASDataView<T>;

    constructor(dataView: ASDataView<T>, initial: T, render: (src: T) => React.ReactElement<{}>) {
        this.dataView = dataView;
        this.item = initial;
        this.render = render;
        this.container = new AsyncRenderer(
            () => {
                let st = JSON.stringify(this.container.getState());
                if (this.currentState !== st) {
                    this.currentState = st;
                    dataView.onDataSourceItemRenderUpdated(this.item.key);
                }
            },
            render(initial));
        this.currentState = JSON.stringify(this.container.getState());
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
    private readonly render: (src: T) => React.ReactElement<{}>;
    private items: ItemRenderHolder<T>[] = [];
    readonly key = UUID();
    private readonly queue = new SQueue();

    constructor(dataSource: DataSource<T>, render: (src: T) => React.ReactElement<{}>) {
        this.render = render;
        this.dataSource = dataSource;
        this.dataSource.watch(this);

        // Register for load more events
        ASEventEmitter.registerOnLoadMore(this.key, () => { this.dataSource.needMore(); });
    }

    onDataSourceInited = (data: T[], completed: boolean) => {
        this.queue.push(async () => {
            // Create initial items
            this.items = await throttledMap(data, (v) => new ItemRenderHolder(this, v, this.render));

            // Forward initial state to native
            let config = JSON.stringify(await throttledMap(this.items, (v) => ({
                key: v.item.key,
                config: v.currentState
            })));
            NativeDataView.dataViewInit(this.key, config, completed);
        });
    }
    onDataSourceItemAdded = (item: T, index: number) => {
        this.queue.push(async () => {
            let holder = new ItemRenderHolder(this, item, this.render);

            // Insert item
            let itms = [...this.items];
            itms.splice(index, 0, holder);
            this.items = itms;

            // Forward to native
            NativeDataView.dataViewAddItem(this.key, item.key, holder.currentState, index);
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

    onDataSourceCompleted = () => {
        //
    }

    onDataSourceItemRenderUpdated = (key: string) => {
        this.queue.push(async () => {
            let index = this.items.findIndex((v) => v.item.key === key);
            NativeDataView.dataViewUpdateItem(this.key, key, this.items[index].currentState, index);
        });
    }
}