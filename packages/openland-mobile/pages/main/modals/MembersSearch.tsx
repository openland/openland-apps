import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { withApp } from 'openland-mobile/components/withApp';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { SFlatList } from 'react-native-s/SFlatList';
import { SDeferred } from 'react-native-s/SDeferred';
import { UserShort } from 'openland-api/spacex.types';
import { GlobalSearchMembers } from '../components/globalSearch/GlobaSearchMembers';
import { UserView } from '../components/UserView';

export type MemberType = {
    user: UserShort,
};

const MembersSearchPageInner = React.memo((props: PageProps) => {
    const roomId = props.router.params.roomId as string;
    const membersCount = props.router.params.membersCount as number;
    const initialMembers = (props.router.params.initialMembers || []) as MemberType[];
    // const isGroup = props.router.params.isGroup as boolean;
    const client = getClient();
    const [items, setItems] = React.useState<MemberType[]>(initialMembers);
    const [loading, setLoading] = React.useState(false);

    const loadInitialMembers = async () => {
        setLoading(true);
        const { members } = (await client.queryRoomMembersPaginated(
            { roomId, first: 15 },
            { fetchPolicy: 'network-only' }
        ));
        setItems(prev => prev.concat(members));
        setLoading(false);
    };
    React.useEffect(() => {
        if (initialMembers.length === 0) {
            loadInitialMembers();
        }
    }, []);

    const handleLoadMore = async () => {
        if (!loading && items.length < (membersCount || 0)) {
            setLoading(true);
            const { members } = (await client.queryRoomMembersPaginated(
                { roomId, first: 10, after: items.length === 0 ? undefined : items[items.length - 1].user.id },
                { fetchPolicy: 'network-only' }
            ));
            setItems(prev => prev.concat(members));
            setLoading(false);
        }
    };

    return (
        <SFlatList
            data={items}
            onEndReached={handleLoadMore}
            refreshing={loading}
            keyExtractor={(item, index) => index + '-' + item.user.id}
            renderItem={({ item }) => (
                <UserView
                    user={item.user}
                    showOrganization={true}
                    onPress={() => props.router.push('ProfileUser', { id: item.user.id })}
                />
            )}
        />
    );
});

const MembersSearchPage = React.memo((props: PageProps) => {
    // const handleContactLongPress = React.useCallback((user: MyContacts_myContacts_items_user) => {
    //     const builder = ActionSheet.builder();
    //     builder.cancelable(false);
    //     builder.action(
    //         'Send message',
    //         () => props.router.push('Conversation', { id: user.id }),
    //         false,
    //         require('assets/ic-message-24.png'),
    //     );

    //     builder.show(true);
    // }, []);

    return (
        <>
            <SHeader title="Members" />

            <SSearchControler
                searchRender={(p) => (
                    <GlobalSearchMembers
                        query={p.query}
                        router={props.router}
                    />
                )}
            >
                <React.Suspense fallback={<ZLoader />}>
                    <SDeferred>
                        <MembersSearchPageInner {...props} />
                    </SDeferred>
                </React.Suspense>
            </SSearchControler>
        </>
    );
});

export const MembersSearch = withApp(MembersSearchPage);