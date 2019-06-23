import { DataSourceItem, DataSource } from './DataSource';

export class DataSourceAugmentor<T extends DataSourceItem, V> {
    private augmentations = new Map<string, V>();
    private source = new Map<string, T>();
    readonly dataSource: DataSource<T & Partial<V>>;

    constructor(src: DataSource<T>) {
        this.dataSource = new DataSource(() => {
            src.needMore();
        })
        src.watch({
            onDataSourceCompleted: () => {
                this.dataSource.complete();
            },
            onDataSourceInited: (items, completed) => {
                for (let i of items) {
                    this.source.set(i.key, i);
                }
                this.dataSource.initialize(items.map((v) => this.getItem(v.key)), completed);
            },
            onDataSourceItemAdded: (item, index) => {
                this.source.set(item.key, item);
                this.dataSource.addItem(this.getItem(item.key), index);
            },
            onDataSourceItemMoved: (item, fromIndex, toIndex) => {
                this.dataSource.moveItem(item.key, toIndex);
            },
            onDataSourceItemRemoved: (item, index) => {
                this.source.delete(item.key);
                this.dataSource.removeItem(item.key);
            },
            onDataSourceItemUpdated: (item, index) => {
                this.source.set(item.key, item);
                this.dataSource.updateItem(this.getItem(item.key));
            },
            onDataSourceLoadedMore: (items, completed) => {
                for (let i of items) {
                    this.source.set(i.key, i);
                }
                this.dataSource.loadedMore(items.map((v) => this.getItem(v.key)), completed);
            },
            onDataSourceScrollToKeyRequested: (key: string) => {
                this.dataSource.requestScrollToKey(key);
            }
        })
    }

    setAugmentation(key: string, value: V) {
        this.augmentations.set(key, value);
        let itm = this.dataSource.getItem(key);
        if (itm) {
            this.dataSource.updateItem(this.getItem(itm.key));
        }
    }

    removeAugmentation(key: string) {
        this.augmentations.delete(key)
        let itm = this.dataSource.getItem(key);
        if (itm) {
            this.dataSource.updateItem(this.getItem(itm.key));
        }
    }

    private getItem(key: string): T & Partial<V> {
        let src = this.source.get(key)!!;
        let aug = this.augmentations.get(src.key)
        if (aug) {
            return { ...src, ...aug };
        } else {
            return src as any; // ??
        }
    }
}