import SQLite from 'react-native-sqlite-storage';
import { ExecutionQueue } from 'openland-y-utils/ExecutionQueue';
import { KeyValueStore } from 'openland-y-utils/KeyValueStore';

export class NativeKeyValue implements KeyValueStore {

    private queue = new ExecutionQueue();
    private db!: SQLite.SQLiteDatabase;

    constructor(name: string) {
        this.queue.post(async () => {
            SQLite.enablePromise(true);
            SQLite.DEBUG(__DEV__);
            this.db = await SQLite.openDatabase({ name, location: 'default' });
            await this.db.executeSql('CREATE TABLE IF NOT EXISTS records(key TEXT PRIMARY KEY, value TEXT);');
        })
    }

    async readKey(key: string): Promise<string | null> {
        return new Promise<string | null>((resolve, reject) => {
            this.queue.post(async () => {
                try {
                    let res = await this.db.executeSql('SELECT key, value FROM records WHERE key = ?;', [key]);
                    if (res.length > 0 && res[0].rows.length > 0) {
                        resolve(res[0].rows.item(0).value as string);
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    reject(e);
                }
            })
        })
    }

    async readKeys(keys: string[]): Promise<{ key: string, value: string | null }[]> {
        return new Promise<{ key: string, value: string | null }[]>((resolve, reject) => {
            this.queue.post(async () => {
                try {
                    // let r = await this.db.readTransaction(async (tx) => {
                    let res: { key: string, value: string | null }[] = [];
                    let d = await this.db.executeSql('SELECT key, value FROM records WHERE key in (' + keys.map(() => '?').join() + ');', keys);
                    outer: for (let k of keys) {
                        for (let j = 0; j < d.length; j++) {
                            let dr = d[j];
                            for (let i = 0; i < dr.rows.length; i++) {
                                let row = dr.rows.item(i);
                                if (row.key === k) {
                                    res.push({ key: k, value: row.value as string });
                                    continue outer;
                                }
                            }
                        }
                        res.push({ key: k, value: null });
                    }
                    resolve(res);
                    // });
                    // resolve(r);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }

    async writeKey(key: string, value: string | null): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.queue.post(async () => {
                try {
                    if (value != null) {
                        await this.db.executeSql('INSERT INTO records(key, value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=?', [key, value, value]);
                    } else {
                        await this.db.executeSql('DELETE FROM records WHERE key=?', [key]);
                    }
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    }

    async writeKeys(items: { key: string, value: string | null }[]) {
        for (let i of items) {
            this.writeKey(i.key, i.value);
        }
    }
}