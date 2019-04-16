import { DataSourceItem, DataSource } from "./DataSource";
import { KeyValueStore } from './KeyValueStore';
import { ExecutionQueue } from './ExecutionQueue';
import { createLogger } from 'mental-log';
import { currentTimeMillis } from './currentTime';

const log = createLogger('datasource');

export interface DataSourceStoredProvider<T extends DataSourceItem> {
    onStarted: (state: string) => void;
    loadMore: (cursor?: string) => Promise<{ state: string, cursor?: string, items: T[] }>
}

export class DataSourceStored<T extends DataSourceItem> {
    private readonly _wireVersion = 3;
    readonly dataSource: DataSource<T>;
    readonly pageSize: number;
    readonly name: string;
    private _cursor?: string;
    private _state!: string;
    private _index!: string[];
    private _queue: ExecutionQueue;
    private _provider: DataSourceStoredProvider<T>
    private _inited = false;
    private _loadingMore = false;
    private _storage: KeyValueStore;
    private _pendingUpdates = new Map<string, T>();

    constructor(name: string, storage: KeyValueStore, pageSize: number, provider: DataSourceStoredProvider<T>) {
        this._queue = new ExecutionQueue();
        this._provider = provider;
        this.name = name;
        this.pageSize = pageSize;
        this.dataSource = new DataSource<T>(() => { this.needMore(); });
        this._storage = storage;
        this._queue.post(async () => {
            let start = currentTimeMillis();
            let ver = await storage.readKey('ds.' + name + '.version');
            let state = await storage.readKey('ds.' + name + '.state');
            let index = await storage.readKey('ds.' + name + '.index');
            let items: T[];
            if (!index || !state || !ver || (parseInt(ver, 10) !== this._wireVersion)) {
                log.log(this.name + '| Download initial data');
                let data = await this._provider.loadMore();

                // Write records
                for (let i of data.items) {
                    await storage.writeKey('ds.' + name + '.item.' + i.key, JSON.stringify(i))
                }

                // Write index
                await storage.writeKey('ds.' + name + '.index', JSON.stringify(data.items.map((v) => v.key)))

                // Write cursor
                if (data.cursor) {
                    await storage.writeKey('ds.' + name + '.cursor', data.cursor);
                    this._cursor = data.cursor;
                } else {
                    await storage.writeKey('ds.' + name + '.cursor', null);
                    this._cursor = undefined;
                }
                items = data.items;

                // Write state
                await storage.writeKey('ds.' + name + '.state', data.state);
                this._state = data.state;

                // Write version
                await storage.writeKey('ds.' + name + '.version', this._wireVersion.toString());

                // Save local index
                this._index = data.items.map((v) => v.key);
            } else {
                log.log(this.name + '| Loading initial data from storage');

                // Read index
                this._index = JSON.parse(index) as string[];

                // Load items
                items = [];
                for (let i of this._index) {
                    items.push(JSON.parse((await storage.readKey('ds.' + name + '.item.' + i))!));
                }

                // Load cursor
                let cursor = await storage.readKey('ds.' + name + '.cursor');

                // Initialize DS
                if (cursor) {
                    this._cursor = cursor;
                } else {
                    this._cursor = undefined;
                }

                this._state = state;
            }
            this._provider.onStarted(this._state);

            this._inited = true; // Mark inited before data source loading to avoid "loading" hanging
            this.dataSource.initialize(items, !this._cursor);
            log.log(this.name + '| Inited in ' + (currentTimeMillis() - start) + ' ms');
        });
    }

    updateState = async (state: string) => {
        await this._queue.sync(async () => {
            await this._storage.writeKey('ds.' + this.name + '.state', state);
            this._state = state;
        });
    }

    hasItem = async (key: string) => {
        return await this._queue.sync(async () => {
            return !!this._index.find((v) => v === key);
        });
    }

    removeItem = async (key: string) => {
        await this._queue.sync(async () => {
            this._index = this._index.filter((v) => v !== key);
            await this._storage.writeKey('ds.' + this.name + '.index', JSON.stringify(this._index))
            this.dataSource.removeItem(key);
        });
    }

    getItem = async (id: string) => {
        return await this._queue.sync(async () => {
            let v = await this._storage.readKey('ds.' + this.name + '.item.' + id);
            if (v) {
                return JSON.parse(v) as T;
            } else {
                return null;
            }
        });
    }

    updateItem = async (item: T) => {
        await this._queue.sync(async () => {
            await this._storage.writeKey('ds.' + this.name + '.item.' + item.key, JSON.stringify(item));
            this.dataSource.updateItem(item);
        });
    }

    moveItem = async (key: string, index: number) => {
        await this._queue.sync(async () => {
            let i = this._index.findIndex(v => v === key);
            if (i >= 0) {
                if (i === index) {
                    return;
                }
                if (index >= this._index.length) {
                    throw Error('Invalid Index');
                }
                if (index < 0) {
                    throw Error('Invalid Index');
                }
                let res = [...this._index];
                let ex = res[i];
                res.splice(i, 1);
                res.splice(index, 0, ex);
                this._index = res;
                await this._storage.writeKey('ds.' + this.name + '.index', JSON.stringify(this._index))
            } else {
                throw Error('Trying to move non-existent item');
            }

            this.dataSource.moveItem(key, index);
        });
    }

    addItem = async (item: T, index: number) => {
        await this._queue.sync(async () => {
            // Write record
            await this._storage.writeKey('ds.' + this.name + '.item.' + item.key, JSON.stringify(item))

            // Write index
            if (index > this._index.length) {
                throw Error('Invalid Index');
            }
            if (index < 0) {
                throw Error('Invalid Index');
            }
            let r = [...this._index];
            r.splice(index, 0, item.key);
            this._index = r;
            await this._storage.writeKey('ds.' + this.name + '.index', JSON.stringify(this._index))

            this.dataSource.addItem(item, index);
        });
    }

    private needMore = () => {
        log.log(this.name + '| Need more');
        if (!this._inited) {
            return;
        }
        if (this._loadingMore) {
            return;
        }
        if (!this._cursor) {
            return;
        }
        this._loadingMore = true;
        this._queue.post(async () => {
            const cursor = this._cursor;
            let data = await this._provider.loadMore(cursor);

            // Write records
            for (let i of data.items) {
                await this._storage.writeKey('ds.' + this.name + '.item.' + i.key, JSON.stringify(i))
            }

            // Update Index
            let index = [...this._index];
            for (let d of data.items) {
                if (index.indexOf(d.key) >= 0) {
                    continue;
                }
                index.push(d.key);
            }
            this._index = index;
            await this._storage.writeKey('ds.' + this.name + '.index', JSON.stringify(this._index))

            // Write cursor and datasource
            if (data.cursor) {
                await this._storage.writeKey('ds.' + this.name + '.cursor', data.cursor);
                this._cursor = data.cursor;
                this.dataSource.loadedMore(data.items, false);
            } else {
                await this._storage.writeKey('ds.' + this.name + '.cursor', null);
                this._cursor = undefined;
                this.dataSource.loadedMore(data.items, true);
            }

            this._loadingMore = false;
        });
    }
}