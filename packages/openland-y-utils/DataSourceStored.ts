import { DataSourceItem, DataSource } from "./DataSource";
import { KeyValueStore } from './KeyValueStore';
import { ExecutionQueue } from './ExecutionQueue';

export class DataSourceStored<T extends DataSourceItem> {
    readonly dataSource: DataSource<T>;
    readonly pageSize: number;
    private _index!: string[];
    private _queue: ExecutionQueue;
    private _loadMore: (cursor?: string) => Promise<{ cursor?: string, items: T[] }>

    constructor(name: string, storage: KeyValueStore, pageSize: number, loadMore: (cursor?: string) => Promise<{ cursor?: string, items: T[] }>) {
        this._queue = new ExecutionQueue();
        this._loadMore = loadMore;
        this.pageSize = pageSize;
        this.dataSource = new DataSource<T>(() => {
            //
        });
        this._queue.post(async () => {
            let index = await storage.readKey('ds.' + name + '.index');
            if (!index) {
                let items = await this._loadMore();

                // Write records
                for (let i of items.items) {
                    await storage.writeKey('ds.' + name + '.item.' + i.key, JSON.stringify(i))
                }

                // Write index
                await storage.writeKey('ds.' + name + '.index', JSON.stringify(items.items.map((v) => v.key)))

                // Write cursor
                if (items.cursor) {
                    await storage.writeKey('ds.' + name + '.cursor', items.cursor);
                    this.dataSource.initialize(items.items, false);
                } else {
                    await storage.writeKey('ds.' + name + '.cursor', null);
                    this.dataSource.initialize(items.items, true);
                }

                // Save local index
                this._index = items.items.map((v) => v.key);
            } else {

                // Read index
                this._index = JSON.parse(index) as string[];

                // Load items
                let items: T[] = [];
                for (let i of this._index) {
                    items.push(JSON.parse((await storage.readKey(i))!))
                }

                // Load cursor
                let cursor = await storage.readKey('ds.' + name + '.cursor');

                // Initialize DS
                if (cursor) {
                    this.dataSource.initialize(items, false);
                } else {
                    this.dataSource.initialize(items, true);
                }
            }
        });
    }
}