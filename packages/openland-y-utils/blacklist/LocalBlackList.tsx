import * as React from 'react';
import { sequenceWatcher } from 'openland-api/sequenceWatcher';
import { BlackListUpdates } from 'openland-api/spacex.types';
import { useClient } from 'openland-api/useClient';

type LocalBlackListContextState = {
    meBanned: Set<string>;
    myBans: Set<string>;
};

const LocalBlackListContext = React.createContext<LocalBlackListContextState>({
    meBanned: new Set<string>(),
    myBans: new Set<string>(),
});

export const LocalBlackListProvider = React.memo((props: { children: any }) => {
    const [meBanned, setMeBanned] = React.useState<Set<string>>(new Set());
    const [myBans, setMyBans] = React.useState<Set<string>>(new Set());

    const client = useClient();
    const myId = client.useAccount().me?.id;

    const subscribeRef = React.useRef<any>();

    const subscribe = async () => {
        const { state: initialState } = (
            await client.queryBlackListUpdatesState({ fetchPolicy: 'network-only' })
        ).blackListUpdatesState;
        subscribeRef.current = sequenceWatcher<BlackListUpdates>(
            initialState,
            (state, handler) => client.subscribeBlackListUpdates({ fromState: state! }, handler),
            ({ blackListUpdates }) => {
                blackListUpdates.updates.map((i) => {
                    if (i.__typename === 'BlackListAdded') {
                        if (i.bannedBy.id === myId) {
                            setMyBans((prev) => {
                                const newState = new Set(prev);
                                newState.add(i.bannedUser.id);
                                return newState;
                            });
                        } else {
                            setMeBanned((prev) => {
                                const newState = new Set(prev);
                                newState.add(i.bannedBy.id);
                                return newState;
                            });
                        }
                    }
                    if (i.__typename === 'BlackListRemoved') {
                        if (i.bannedBy.id === myId) {
                            setMyBans((prev) => {
                                const newState = new Set(prev);
                                newState.delete(i.bannedUser.id);
                                return newState;
                            });
                        } else {
                            setMeBanned((prev) => {
                                const newState = new Set(prev);
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
    initialIsBanned: boolean,
    initialIsMeBanned: boolean,
) => {
    const { meBanned, myBans } = useBlackList();
    const isBanned = myBans.has(uId) ? true : initialIsBanned;
    const isMeBanned = meBanned.has(uId) ? true : initialIsMeBanned;

    return { isBanned, isMeBanned };
};
