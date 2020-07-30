import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { withApp } from 'openland-mobile/components/withApp';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { SFlatList } from 'react-native-s/SFlatList';
import { SDeferred } from 'react-native-s/SDeferred';
import { UserShort, RoomMemberRole, OrganizationMemberRole, UserBadge } from 'openland-api/spacex.types';
import { GlobalSearchMembers } from '../components/globalSearch/GlobalSearchMembers';
import { UserView } from '../components/UserView';

export type RoomMemberType = {
    user: UserShort,
    role: RoomMemberRole,
    badge: UserBadge | null,
    canKick: boolean,
};

export type OrgMemberType = {
    user: UserShort,
    role: OrganizationMemberRole,
};

export type RoomLongPressHanlder = (
    member: RoomMemberType,
    callbacks: {
        onRoleChange: (memberId: string, role: RoomMemberRole) => void,
        onKick: (memberId: string) => void
    }
) => void;

export type OrgLongPressHanlder = (
    member: OrgMemberType,
    callbacks: {
        onRoleChange: (memberId: string, role: OrganizationMemberRole) => void,
        onKick: (memberId: string) => void
    }
) => void;

const RoomMembersSearchPageInner = React.memo((props: {
    roomId: string,
    membersCount: number,
    refetchCounter: number,
    initialMembers: RoomMemberType[],
    onPress: (member: RoomMemberType) => void,
    onLongPress: RoomLongPressHanlder,
}) => {
    const { roomId, membersCount, initialMembers, refetchCounter, onPress, onLongPress } = props;
    const client = getClient();
    const [items, setItems] = React.useState<RoomMemberType[]>(initialMembers);
    const [loading, setLoading] = React.useState(false);

    const onRoleChange = (memberId: string, role: RoomMemberRole) => {
        setItems(prev => prev.map(member => member.user.id === memberId ? ({ ...member, role }) : member));
    };
    const onKick = (memberId: string) => {
        setItems(prev => prev.filter(member => member.user.id !== memberId));
    };

    const loadInitialMembers = async () => {
        setLoading(true);
        const { members } = (await client.queryRoomMembersPaginated(
            { roomId, first: 15 },
            { fetchPolicy: 'network-only' }
        ));
        setItems(members);
        setLoading(false);
    };
    React.useEffect(() => {
        if (initialMembers.length === 0) {
            loadInitialMembers();
        }
    }, []);

    React.useEffect(() => {
        if (refetchCounter) {
            loadInitialMembers();
        }
    }, [refetchCounter]);

    const hasNextPageRef = React.useRef(true);

    const handleLoadMore = async () => {
        if (!hasNextPageRef.current) {
            return;
        }
        if (!loading && items.length < (membersCount || 0)) {
            setLoading(true);
            const { members } = (await client.queryRoomMembersPaginated(
                { roomId, first: 10, after: items.length === 0 ? undefined : items[items.length - 1].user.id },
                { fetchPolicy: 'network-only' }
            ));
            setItems(prev => prev.concat(members));
            setLoading(false);
            if (members.length === 0) {
                hasNextPageRef.current = false;
            }
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
                    memberRole={item.role}
                    user={item.user}
                    badge={item.badge}
                    showOrganization={true}
                    onPress={() => onPress(item)}
                    onLongPress={() => onLongPress(item, { onKick, onRoleChange })}
                />
            )}
        />
    );
});

const OrgMembersSearchPageInner = React.memo((props: {
    orgId: string,
    membersCount: number,
    refetchCounter: number,
    initialMembers: OrgMemberType[],
    onPress: (member: OrgMemberType) => void,
    onLongPress: OrgLongPressHanlder,
}) => {
    const { orgId, membersCount, initialMembers, refetchCounter, onPress, onLongPress } = props;
    const client = getClient();
    const [items, setItems] = React.useState<OrgMemberType[]>(initialMembers);
    const [loading, setLoading] = React.useState(false);

    const onRoleChange = (memberId: string, role: OrganizationMemberRole) => {
        setItems(prev => prev.map(member => member.user.id === memberId ? ({ ...member, role }) : member));
    };
    const onKick = (memberId: string) => {
        setItems(prev => prev.filter(member => member.user.id !== memberId));
    };

    const loadInitialMembers = async () => {
        setLoading(true);
        const { members } = (await client.queryOrganizationMembers(
            { organizationId: orgId, first: 15 },
            { fetchPolicy: 'network-only' }
        )).organization;
        setItems(members);
        setLoading(false);
    };
    React.useEffect(() => {
        if (initialMembers.length === 0) {
            loadInitialMembers();
        }
    }, []);

    React.useEffect(() => {
        if (refetchCounter) {
            loadInitialMembers();
        }
    }, [refetchCounter]);

    const hasNextPageRef = React.useRef(true);

    const handleLoadMore = async () => {
        if (!hasNextPageRef.current) {
            return;
        }
        if (!loading && items.length < (membersCount || 0)) {
            setLoading(true);
            const { members } = (await client.queryOrganizationMembers(
                { organizationId: orgId, first: 10, after: items.length === 0 ? undefined : items[items.length - 1].user.id },
                { fetchPolicy: 'network-only' }
            )).organization;
            setItems(prev => prev.concat(members));
            setLoading(false);
            if (members.length === 0) {
                hasNextPageRef.current = false;
            }
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
                    memberRole={item.role}
                    showOrganization={true}
                    onPress={() => onPress(item)}
                    onLongPress={() => onLongPress(item, { onRoleChange, onKick })}
                />
            )}
        />
    );
});

const MembersSearchPage = React.memo((props: PageProps) => {
    const onRoomMemberLongPress = props.router.params.onLongPress as (member: RoomMemberType) => void;
    const onOrgMemberLongPress = props.router.params.onLongPress as (member: OrgMemberType) => void;
    const [refetchCounter, setRefetchCounter] = React.useState(0);

    return (
        <>
            <SHeader title="Members" searchPlaceholder="Search members" />

            <SSearchControler
                searchRender={(p) => (
                    <GlobalSearchMembers
                        query={p.query}
                        router={props.router}
                        onRefetch={() => setRefetchCounter(x => x + 1)}
                    />
                )}
            >
                <React.Suspense fallback={<ZLoader />}>
                    <SDeferred>
                        {props.router.params.roomId ? (
                            <RoomMembersSearchPageInner
                                roomId={props.router.params.roomId as string}
                                membersCount={props.router.params.membersCount as number}
                                initialMembers={props.router.params.initialMembers as RoomMemberType[]}
                                onPress={props.router.params.onPress as (member: RoomMemberType) => void}
                                onLongPress={onRoomMemberLongPress}
                                refetchCounter={refetchCounter}
                            />
                        ) : props.router.params.orgId ? (
                            <OrgMembersSearchPageInner
                                orgId={props.router.params.orgId as string}
                                refetchCounter={refetchCounter}
                                membersCount={props.router.params.membersCount as number}
                                initialMembers={props.router.params.initialMembers as OrgMemberType[]}
                                onPress={props.router.params.onPress as (member: OrgMemberType) => void}
                                onLongPress={onOrgMemberLongPress}
                            />
                        ) : null}
                    </SDeferred>
                </React.Suspense>
            </SSearchControler>
        </>
    );
});

export const MembersSearch = withApp(MembersSearchPage);
