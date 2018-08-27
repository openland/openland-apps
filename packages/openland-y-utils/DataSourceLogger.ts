import { DataSourceItem, DataSource, DataSourceWatcher } from './DataSource';

export class DataSourceLogger<T extends DataSourceItem> implements DataSourceWatcher<T> {

    readonly dataSource: DataSource<T>;
    readonly tag: string;

    constructor(tag: string, dataSource: DataSource<T>) {
        this.tag = tag;
        this.dataSource = dataSource;
        this.dataSource.watch(this);
    }

    onDataSourceInited = (data: T[]) => {
        console.log(this.tag, 'Inited with data', data);
    }

    onDataSourceItemAdded = (item: T, index: number) => {
        console.log(this.tag, 'Item added at ' + index, item);
    }
    onDataSourceItemRemoved = (item: T, index: number) => {
        console.log(this.tag, 'Item removed at ' + index, item);
    }
    onDataSourceItemUpdated = (item: T, index: number) => {
        console.log(this.tag, 'Item updated at ' + index, item);
    }
    onDataSourceItemMoved = (item: T, fromIndex: number, toIndex: number) => {
        console.log(this.tag, 'Item moved from ' + fromIndex + ' to ' + toIndex, item);
    }
}