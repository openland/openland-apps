import * as React from 'react';

type LocalUserStatus = 'deleted' | 'added';
type LocalUsersStatusMap = Map<string, LocalUserStatus>;

export class ContactsEngine {
    private listeners: Set<((users: LocalUsersStatusMap) => void)> = new Set();
    localUsersStatusMap: LocalUsersStatusMap = new Map();

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
