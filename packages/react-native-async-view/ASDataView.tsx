import * as React from 'react';
import { DataSourceItem, DataSource, DataSourceWatcher } from 'openland-y-utils/DataSource';
import { NativeDataView } from './platform/NativeDataView';
import { AsyncRenderer } from './internals/renderer';
import UUID from 'uuid/v4';
import { ASEventEmitter } from './platform/ASEventEmitter';

class ItemRenderHolder<T extends DataSourceItem> {
    item: T;
    currentState: any;
    private container: AsyncRenderer;
    private render: (src: T) => React.ReactElement<{}>;

    constructor(initial: T, render: (src: T) => React.ReactElement<{}>) {
        this.item = initial;
        this.render = render;
        this.container = new AsyncRenderer(() => { /* Do nothing for now */ }, render(initial));
        this.currentState = this.container.getState();
    }

    updateItem(item: T) {
        this.container.render(this.render(item));
        this.currentState = this.container.getState();
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

    constructor(dataSource: DataSource<T>, render: (src: T) => React.ReactElement<{}>) {
        this.render = render;
        this.dataSource = dataSource;
        this.dataSource.watch(this);

        // Register for load more events
        ASEventEmitter.registerOnLoadMore(this.key, () => { this.dataSource.needMore(); });
    }

    onDataSourceInited = (data: T[], completed: boolean) => {
        // Create initial items
        this.items = data.map((v) => new ItemRenderHolder(v, this.render));

        // Forward initial state to native
        let config = JSON.stringify(this.items.map((v) => ({
            key: v.item.key,
            config: JSON.stringify(v.currentState)
        })));
        NativeDataView.dataViewInit(this.key, config, completed);
    }
    onDataSourceItemAdded = (item: T, index: number) => {
        let holder = new ItemRenderHolder(item, this.render);

        // Insert item
        let itms = [...this.items];
        itms.splice(index, 0, holder);
        this.items = itms;

        // Forward to native
        NativeDataView.dataViewAddItem(this.key, item.key, JSON.stringify(holder.currentState), index);
    }
    onDataSourceItemRemoved = (item: T, index: number) => {
        // Remove item
        let itms = [...this.items];
        let removed = itms.splice(index, 1);
        removed[0].destroy();
        this.items = itms;

        // Forward to native
        NativeDataView.dataViewRemoveItem(this.key, item.key, index);
    }
    onDataSourceItemUpdated = (item: T, index: number) => {
        // Update item
        this.items[index].updateItem(item);

        // Forward to native
        NativeDataView.dataViewUpdateItem(this.key, item.key, JSON.stringify(this.items[index].currentState), index);
    }
    onDataSourceItemMoved = (item: T, fromIndex: number, toIndex: number) => {
        // Move item
        let itms = [...this.items];
        let r = itms.splice(fromIndex, 1);
        r[0].updateItem(item);
        itms.splice(toIndex, 0, r[0]);
        this.items = itms;

        // Forward to native
        NativeDataView.dataViewMoveItem(this.key, item.key, fromIndex, toIndex);
    }

    onDataSourceLoadedMore = (items: T[], completed: boolean) => {
        let added = items.map((v) => new ItemRenderHolder(v, this.render));
        this.items = [...this.items, ...added];

        // Forward initial state to native
        let config = JSON.stringify(added.map((v) => ({
            key: v.item.key,
            config: JSON.stringify(v.currentState)
        })));
        NativeDataView.dataViewLoadedMore(this.key, config, completed);
    } 

    onDataSourceCompleted = () => {
        //
    }
}