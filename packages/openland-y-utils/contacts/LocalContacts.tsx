import * as React from 'react';
import { sequenceWatcher } from 'openland-api/sequenceWatcher';
import { MyContactsUpdates, UserShort } from 'openland-api/spacex.types';
import { useClient } from 'openland-api/useClient';

type LocalContactStatus = 'added' | 'removed';
type LocalContactsStatusMap = { [id: string]: LocalContactStatus };
type UpdateListener = (updates: { addedUsers: UserShort[], removedUsers: UserShort[] }) => void;

type LocalContactsProviderState = {
    localContactsStatusMap: LocalContactsStatusMap,
    listenUpdates: (handler: UpdateListener) => void,
};

const LocalContactsContext = React.createContext<LocalContactsProviderState>({ localContactsStatusMap: {}, listenUpdates: () => { /* */ } });

export const LocalContactsProvider = React.memo((props: { children: any }) => {
    const [localContactsStatusMap, setLocalContactsStatusMap] = React.useState<LocalContactsStatusMap>({});
    const client = useClient();

    const listenersRef = React.useRef<UpdateListener[]>([]);

    const listenUpdates = (handler: UpdateListener) => {
        listenersRef.current = [...listenersRef.current, handler];
        return () => {
            listenersRef.current = listenersRef.current.filter(x => x !== handler);
        };
    };
    const unsubscribeRef = React.useRef<any>();

    const startSubscription = async () => {
        let { state: initialState } = (await client.queryMyContactsState({ fetchPolicy: 'network-only' })).myContactsState;
        unsubscribeRef.current = sequenceWatcher<MyContactsUpdates>(initialState, ((state, handler) => client.subscribeMyContactsUpdates({ state: state! }, handler)), ({ myContactsUpdates }) => {
            let removedUsers = myContactsUpdates.updates
                .filter(y => y.__typename === 'ContactRemoved')
                .map(x => x.contact.user);
            let addedUsers = myContactsUpdates.updates
                .filter(y => y.__typename === 'ContactAdded')
                .map(x => x.contact.user);

            listenersRef.current.forEach(l => {
                l({ removedUsers, addedUsers });
            });

            let newContacts = myContactsUpdates.updates.map(x => ({ [x.contact.user.id]: x.__typename === 'ContactAdded' ? 'added' : 'removed' }));

            setLocalContactsStatusMap(prev => Object.assign({}, prev, ...newContacts));

            return myContactsUpdates.state;
        });
    };

    React.useEffect(() => {
        startSubscription();
        return () => {
            unsubscribeRef.current?.();
        };
    }, []);

    return (
        <LocalContactsContext.Provider value={{ localContactsStatusMap, listenUpdates }} >
            {props.children}
        </LocalContactsContext.Provider>
    );
});

export const useLocalContacts = () => {
    return React.useContext(LocalContactsContext);
};

export const useLocalContact = (userId: string, initialInContacts: boolean) => {
    const { localContactsStatusMap } = useLocalContacts();

    const localStatus = localContactsStatusMap[userId];
    const isContact = localStatus ? localStatus === 'added' : initialInContacts;

    return { isContact };
};
