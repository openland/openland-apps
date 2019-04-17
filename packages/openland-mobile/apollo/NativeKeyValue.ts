import SQLite from 'react-native-sqlite-storage';
import { ExecutionQueue } from 'openland-y-utils/ExecutionQueue';
import { KeyValueStore } from 'openland-y-utils/KeyValueStore';
import { AppStorage } from 'openland-mobile/utils/AppStorage';
import { Platform } from 'react-native';

export class NativeKeyValue implements KeyValueStore {

    private queue = new ExecutionQueue();
    private db!: SQLite.SQLiteDatabase;

    constructor(name: string) {
        this.queue.post(async () => {
            SQLite.enablePromise(true);
            SQLite.DEBUG(__DEV__);
            this.db = await SQLite.openDatabase({ name: name + '-' + AppStorage.storage, location: 'default' });
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
                        if (Platform.OS === 'android') {
                            await this.db.executeSql('REPLACE INTO records(key, value) VALUES(?,?)', [key, value]);
                        } else {
                            await this.db.executeSql('INSERT INTO records(key, value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=?', [key, value, value]);
                        }
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


// I / ReactNativeJS: SQLite.backgroundExecuteSqlBatch({ "dbargs": { "dbname": "engines" }, "executes": [{ "qid": 1111, "sql": "SELECT 1", "params": [] }, { "qid": 1111, "sql": "INSERT INTO records(key, value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=?", "params": ["ds.dialogs.item.4dmAE76O00FbQPpkZ7DJuJp041", "{\"haveMention\":false,\"isMuted\":false,\"kind\":\"PUBLIC\",\"isChannel\":true,\"title\":\"Reddit\",\"photo\":\"https://ucarecdn.com/99190019-726f-4bcc-9fb1-5caa84b504c8/-/crop/676x676/229,34/\",\"key\":\"4dmAE76O00FbQPpkZ7DJuJp041\",\"flexibleId\":\"4dmAE76O00FbQPpkZ7DJuJp041\",\"unread\":2,\"message\":\"https://reddit.com/be5v97\",\"fallback\":\"https://reddit.com/be5v97\",\"attachments\":[{\"id\":\"Rg3PvWQ7gBCm9ReMVW6ZTbE0Xd3WvPc6BEXLY6e4UryeQlyBg\",\"fallback\":\"r/gifs - Momma's had enough and lays down the law\",\"__typename\":\"MessageRichAttachment\"}],\"isOut\":false,\"sender\":\"😃CheckOut\",\"messageId\":\"rAOx907x1ZIlBBDA0wdnI1WXak\",\"date\":1555510131583,\"forward\":false,\"showSenderName\":true}", "{\"haveMention\":false,\"isMuted\":false,\"kind\":\"PUBLIC\",\"isChannel\":true,\"title\":\"Reddit\",\"photo\":\"https://ucarecdn.com/99190019-726f-4bcc-9fb1-5caa84b504c8/-/crop/676x676/229,34/\",\"key\":\"4dmAE76O00FbQPpkZ7DJuJp041\",\"flexibleId\":\"4dmAE76O00FbQPpkZ7DJuJp041\",\"unread\":2,\"message\":\"https://reddit.com/be5v97\",\"fallback\":\"https://reddit.com/be5v97\",\"attachments\":[{\"id\":\"Rg3PvWQ7gBCm9ReMVW6ZTbE0Xd3WvPc6BEXLY6e4UryeQlyBg\",\"fallback\":\"r/gifs - Momma's had enough and lays down the law\",\"__typename\":\"MessageRichAttachment\"}],\"isOut\":false,\"sender\":\"😃CheckOut\",\"messageId\":\"rAOx907x1ZIlBBDA0wdnI1WXak\",\"date\":1555510131583,\"forward\":false,\"showSenderName\":true}"] }] })
// 2019 - 04 - 17 17: 11: 50.582 8726 - 8862 / com.openland.app.debug E / SQLiteLog: (1) near "ON": syntax error
// 2019 - 04 - 17 17: 11: 50.586 8726 - 8862 / com.openland.app.debug E / unknown: SQLitePlugin: SQLitePlugin.executeSql[Batch](): failed
// android.database.sqlite.SQLiteException: near "ON": syntax error(code 1): , while compiling: INSERT INTO records(key, value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value =?
//     at android.database.sqlite.SQLiteConnection.nativePrepareStatement(Native Method)
// at android.database.sqlite.SQLiteConnection.acquirePreparedStatement(SQLiteConnection.java: 890)
// at android.database.sqlite.SQLiteConnection.prepare(SQLiteConnection.java: 501)
// at android.database.sqlite.SQLiteSession.prepare(SQLiteSession.java: 588)
// at android.database.sqlite.SQLiteProgram.<init>(SQLiteProgram.java: 58)
// at android.database.sqlite.SQLiteStatement.<init>(SQLiteStatement.java: 31)
// at android.database.sqlite.SQLiteDatabase.compileStatement(SQLiteDatabase.java: 1070)
// at org.pgsqlite.SQLitePlugin.executeSqlBatch(SQLitePlugin.java: 643)
// at org.pgsqlite.SQLitePlugin.access$100(SQLitePlugin.java: 49)
// at org.pgsqlite.SQLitePlugin$DBRunner.run(SQLitePlugin.java: 927)
// at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java: 1162)
// at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java: 636)
// at java.lang.Thread.run(Thread.java: 764)