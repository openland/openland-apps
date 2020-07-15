import { DataSourceItem, DataSource, DataSourceWatcher } from './DataSource';

export class DataSourceLogger<T extends DataSourceItem> implements DataSourceWatcher<T> {

    readonly dataSource: DataSource<T>;
    readonly tag: string;

    constructor(tag: string, dataSource: DataSource<T>) {
        this.tag = tag;
        this.dataSource = dataSource;
        this.dataSource.watch(this);
    }

    onDataSourceInited = (data: T[], completed: boolean) => {
        console.log(this.tag, 'Inited with data (completed=' + completed + ')', data);
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
    onDataSourceLoadedMore = (items: T[], completed: boolean) => {
        console.log(this.tag, 'Loaded more with data (completed=' + completed + ')', items);
    }
    onDataSourceLoadedMoreForward = (items: T[], completed: boolean) => {
        console.log(this.tag, 'Loaded more forward with data (completed=' + completed + ')', items);
    }
    onDataSourceCompleted = () => {
        console.log(this.tag, 'Data source completed');
    }
    onDataSourceCompletedForward = () => {
        console.log(this.tag, 'Data source completed forward');
    }
    onDataSourceScrollToKeyRequested = (key: string) => {
        console.log(this.tag, 'Data source scroll requsested to key ' + key);
    }
    onDataSourceScrollToTop = () => {
        console.log(this.tag, 'Data source scroll to top ');
    }
}