import SQLite from 'react-native-sqlite-storage';
import { ExecutionQueue } from 'openland-y-utils/ExecutionQueue';

export class NativeKeyValue {

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

    async load(key: string): Promise<string | null> {
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

    async persist(key: string, value: string | null): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.queue.post(async () => {
                try {
                    if (value != null) {
                        await this.db.executeSql('INSERT INTO records(key, value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=?', [key, value, key]);
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
}