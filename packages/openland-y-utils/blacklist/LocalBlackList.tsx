import * as React from 'react';
import { sequenceWatcher } from 'openland-api/sequenceWatcher';
import { BlackListUpdates, UserShort } from 'openland-api/spacex.types';
import { useClient } from 'openland-api/useClient';

export type LocalBlackListContextState = {
    meBanned: Map<string, UserShort>;
    myBans: Map<string, UserShort>;
};

const LocalBlackListContext = React.createContext<LocalBlackListContextState>({
    meBanned: new Map(),
    myBans: new Map(),
});

export const LocalBlackListProvider = React.memo((props: { children: any }) => {
    const [meBanned, setMeBanned] = React.useState<Map<string, UserShort>>(new Map());
    const [myBans, setMyBans] = React.useState<Map<string, UserShort>>(new Map());

    const client = useClient();
    const subscribeRef = React.useRef<any>();

    const init = async () => {
        const { myBlackList: initialBlackList } = await client.queryMyBlackList({
            fetchPolicy: 'network-only',
        });
        const initialMyBans = new Map();
        const initialMeBanned = new Map();
        initialBlackList.filter((i) => i.isBanned).map((i) => initialMyBans.set(i.id, i));
        initialBlackList.filter((i) => i.isMeBanned).map((i) => initialMeBanned.set(i.id, i));
        setMyBans(initialMyBans);
        setMeBanned(initialMeBanned);
    };

    const subscribe = async () => {
        await init();
        const me = (await client.queryAccount()).me;
        const { state: initialState } = (
            await client.queryBlackListUpdatesState({ fetchPolicy: 'network-only' })
        ).blackListUpdatesState;
        subscribeRef.current = sequenceWatcher<BlackListUpdates>(
            initialState,
            (state, handler) => client.subscribeBlackListUpdates({ fromState: state! }, handler),
            ({ blackListUpdates }) => {
                blackListUpdates.updates.map((i) => {
                    if (i.__typename === 'BlackListAdded') {
                        if (i.bannedBy.id === me?.id) {
                            setMyBans((prev) => {
                                const newState = new Map(prev);
                                newState.set(i.bannedUser.id, i.bannedUser);
                                return newState;
                            });
                        } else {
                            setMeBanned((prev) => {
                                const newState = new Map(prev);
                                newState.set(i.bannedBy.id, i.bannedUser);
                                return newState;
                            });
                        }
                    }
                    if (i.__typename === 'BlackListRemoved') {
                        if (i.bannedBy.id === me?.id) {
                            setMyBans((prev) => {
                                const newState = new Map(prev);
                                newState.delete(i.bannedUser.id);
                                return newState;
                            });
                        } else {
                            setMeBanned((prev) => {
                                const newState = new Map(prev);
                                newState.delete(i.bannedBy.id);
                                return newState;
                            });
                        }
                    }
                });
                return blackListUpdates.state;
            },
        );
    };

    React.useEffect(() => {
        subscribe();
        return () => {
            subscribeRef.current?.();
        };
    }, []);

    return (
        <LocalBlackListContext.Provider value={{ meBanned, myBans }}>
            {props.children}
        </LocalBlackListContext.Provider>
    );
});

export const useBlackList = () => {
    return React.useContext(LocalBlackListContext);
};

export const useUserBanInfo = (
    uId: string,
    initialIsBanned?: boolean,
    initialIsMeBanned?: boolean,
) => {
    const { meBanned, myBans } = useBlackList();
    const isBanned = myBans.has(uId) ? true : !!initialIsBanned;
    const isMeBanned = meBanned.has(uId) ? true : !!initialIsMeBanned;

    return { isBanned, isMeBanned };
};
