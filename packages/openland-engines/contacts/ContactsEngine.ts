import * as React from 'react';
import { DataSource, DataSourceItem } from 'openland-y-utils/DataSource';
import { MyContacts_myContacts_items_user } from 'openland-api/spacex.types';
import { MessengerEngine } from 'openland-engines/MessengerEngine';

type LocalUserStatus = 'deleted' | 'added';
type LocalUsersStatusMap = Map<string, LocalUserStatus>;

export type ContactDataSourceItem = MyContacts_myContacts_items_user & DataSourceItem;

export class ContactsEngine {
    private listeners: Set<((users: LocalUsersStatusMap) => void)> = new Set();
    localUsersStatusMap: LocalUsersStatusMap = new Map();
    engine: MessengerEngine;
    dataSource: DataSource<ContactDataSourceItem>;
    cursor: string | null = null;

    constructor(engine: MessengerEngine) {
        this.engine = engine;
        this.dataSource = new DataSource<ContactDataSourceItem>(() => { this.loadMore(); }, () => { /* */ });
    }

    start = async (count = 15) => {
        await this.loadMore(count);
    }

    clear = () => {
        this.dataSource.clear();
        this.cursor = null;
    }

    loadMore = async (count = 10) => {
        const { items, cursor } = (await this.engine.client.queryMyContacts({ first: count, after: this.cursor }, { fetchPolicy: 'network-only' })).myContacts;
        this.dataSource.loadedMore(items.map(x => ({ ...x.user, key: x.user.id })), !cursor);
        this.cursor = cursor;
    }

    private notify = () => {
        this.listeners.forEach(l => {
            l(this.localUsersStatusMap);
        });
    }

    private listen = (handle: (users: LocalUsersStatusMap) => void) => {
        this.listeners.add(handle);
        handle(this.localUsersStatusMap);
        return () => {
            this.listeners.delete(handle);
        };
    }

    addUser = (id: string) => {
        this.localUsersStatusMap.set(id, 'added');
        this.notify();
    }

    removeUser = (id: string) => {
        this.localUsersStatusMap.set(id, 'deleted');
        this.notify();
    }

    useIsUserContact = (userId: string, initialInContacts: boolean) => {
        const [localUsersStatusMap, setLocalUsersStatusMap] = React.useState(this.localUsersStatusMap);

        React.useEffect(() => {
            return this.listen(setLocalUsersStatusMap);
        }, []);

        const localStatus = localUsersStatusMap.get(userId);
        if (localStatus) {
            return localStatus === 'added';
        }
        return initialInContacts;
    }
}
