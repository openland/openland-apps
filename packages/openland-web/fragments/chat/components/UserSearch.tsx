import * as React from 'react';
import { XView } from 'react-mental';

import { XScrollValues, XScrollView3 } from 'openland-x/XScrollView3';
import { useClient } from 'openland-api/useClient';
import { UUserView } from 'openland-web/components/unicorn/templates/UUserView';
import { CheckComponent } from 'openland-web/components/unicorn/UCheckbox';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { UserShort } from 'openland-api/spacex.types';
import { XLoader } from 'openland-x/XLoader';
import { debounce } from 'openland-y-utils/timer';

interface UserSearchForChatProps {
    query: string;
    entityId: string;
    onPick: (label: string, value: string) => void;
    selectedUsers: Map<string, string> | null;
    excludeMe?: boolean;
    isOrganization?: boolean;
    paddingBottom?: number;
}

const LOADING_HEIGHT = 200;

interface UserSearchData {
    node: UserShort & { isBanned: boolean, isMeBanned: boolean };
    isMember: boolean;
    inviteRestricted?: boolean;
    cursor: string;
}

interface UserSearchResponse {
    edges: UserSearchData[];
    pageInfo: {
        hasNextPage: boolean;
    };
}

const getCursor = (data: UserSearchResponse) => {
    if (data.pageInfo.hasNextPage && data.edges.length) {
        return data.edges[data.edges.length - 1].cursor;
    }

    return null;
};

export const UserSearch = (props: UserSearchForChatProps) => {
    const client = useClient();
    const { entityId, query, isOrganization } = props;
    const [data, setData] = React.useState<UserSearchData[] | null>(
        null,
    );
    const [loading, setLoading] = React.useState(false);
    const [after, setAfter] = React.useState<string | null>(null);
    const queryRef = React.useRef('');
    const userContext = React.useContext(UserInfoContext);
    const myId = userContext!!.user!!.id!!;

    React.useEffect(debounce(() => {
        (async () => {
            queryRef.current = query;
            setLoading(true);

            let loadedItems: UserSearchResponse;
            if (isOrganization) {
                loadedItems = (await client.queryUserSearchForOrganization({ orgId: entityId, query, first: 15 })).userSearchForOrg;
            } else {
                loadedItems = (await client.queryUserSearchForChat({ chatId: entityId, query, first: 15 })).userSearchForChat;
            }
            // avoid race condition
            if (queryRef.current !== query) {
                return;
            }

            setLoading(false);
            setAfter(getCursor(loadedItems));
            setData(loadedItems.edges);
        })();
    }, 300), [query]);

    const needMore = React.useCallback(async () => {
        if (loading || !after || queryRef.current.length === 0) {
            return;
        }

        queryRef.current = query;
        setLoading(true);

        let loadedItems: UserSearchResponse;
        if (isOrganization) {
            loadedItems = (await client.queryUserSearchForOrganization({ orgId: entityId, query, first: 15, after })).userSearchForOrg;
        } else {
            loadedItems = (await client.queryUserSearchForChat({ chatId: entityId, query, first: 15, after })).userSearchForChat;
        }
        // avoid race condition
        if (queryRef.current !== query) {
            return;
        }

        setAfter(getCursor(loadedItems));
        setLoading(false);
        setData(prevData => prevData!.concat(loadedItems.edges));
    }, [after, loading]);

    let onScroll = React.useCallback(
        (values: XScrollValues) => {
            let d = values.scrollHeight - (values.clientHeight + values.scrollTop);

            if (d < LOADING_HEIGHT) {
                needMore();
            }
        },
        [needMore],
    );

    return (
        <XScrollView3
            flexGrow={1}
            flexShrink={1}
            paddingBottom={props.paddingBottom}
            onScroll={onScroll}
            useDefaultScroll={true}
        >
            <XView marginTop={12} flexDirection="column" paddingHorizontal={12}>
                {data && data.map(({ node, isMember, inviteRestricted }) => {
                    if (props.excludeMe && myId === node.id) {
                        return null;
                    }
                    const selected = isMember || !!(props.selectedUsers && props.selectedUsers.has(node.id));
                    return (
                        <UUserView
                            key={node.id}
                            user={node}
                            onClick={() => props.onPick(node.name, node.id)}
                            rightElement={
                                <XView marginRight={8}>
                                    <CheckComponent squared={true} checked={selected} />
                                </XView>
                            }
                            disabled={(isMember || inviteRestricted) || (node.isBanned || node.isMeBanned)}
                        />
                    );
                })}
                {loading && (
                    <XView height={56} alignItems="center" justifyContent="center">
                        <XLoader loading={true} transparentBackground={true}/>
                    </XView>
                )}
            </XView>
        </XScrollView3>
    );
};
