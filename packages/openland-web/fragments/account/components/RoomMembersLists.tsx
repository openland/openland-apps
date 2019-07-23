import * as React from 'react';
import { css } from 'linaria';
import { RoomMembersPaginated, Room_room_SharedRoom_requests, RoomFull_SharedRoom_requests, Room_room_SharedRoom, SharedRoomKind } from 'openland-api/Types';
import { showModalBox } from 'openland-x/showModalBox';
import { XUserCard } from 'openland-x/cards/XUserCard';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XOverflow } from 'openland-web/components/XOverflow';
import { XListView } from 'openland-web/components/XListView';
import {
    RoomFull_SharedRoom_members,
    RoomMembersPaginated_members,
} from 'openland-api/Types';
import { XWithRole, useRole } from 'openland-x-permissions/XWithRole';
import { useClient } from 'openland-web/utils/useClient';
import { useInfiniteScroll } from 'openland-web/hooks/useInfiniteScroll';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { MakeFeaturedModal } from './modals';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XView } from 'react-mental';
import { XLoader } from 'openland-x/XLoader';
import { XMutation } from 'openland-x/XMutation';
import { XButton } from 'openland-x/XButton';
import { MutationFunc } from 'react-apollo';

const MemberCard = ({ member, chat }: { member: RoomFull_SharedRoom_members, chat: Room_room_SharedRoom }) => {
    return (
        <XUserCard
            user={member.user}
            badge={member.badge}
            role={member.role}
            customOwnerText="Group creator"
            customMenu={
                useRole('super-admin') || member.canKick || member.user.isYou ? (
                    <XOverflow
                        placement="bottom-end"
                        content={
                            <>
                                <XWithRole role="super-admin">
                                    <XMenuItem
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();

                                            showModalBox(
                                                { title: 'Member featuring' },
                                                ctx => <MakeFeaturedModal ctx={ctx} userId={member.user.id} roomId={chat.id} />
                                            );
                                        }}
                                    >
                                        {member.badge ? 'Edit featured status' : 'Make featured'}
                                    </XMenuItem>
                                </XWithRole>

                                <XMenuItem
                                    style="danger"
                                    query={{ field: 'remove', value: member.user.id }}
                                >
                                    {member.user.isYou ? 'Leave group' : 'Remove from group'}
                                </XMenuItem>
                            </>
                        }
                    />
                ) : null
            }
        />
    );
};

const RequestCard = ({
    member,
    chat,
}: {
    member: RoomFull_SharedRoom_requests;
    chat: Room_room_SharedRoom;
}) => {
    const client = useClient();

    const accept = async () => {
        await client.mutateRoomAddMember({
            roomId: chat.id,
            userId: member.user.id,
        });
    };
    const decline = async () => {
        await client.mutateRoomDeclineJoinReuest({
            roomId: chat.id,
            userId: member.user.id,
        });
    };

    return (
        <XUserCard
            user={member.user}
            customButton={
                <>
                    <XMutation mutation={accept as MutationFunc<{}>}>
                        <XButton style="primary" text="Accept" />
                    </XMutation>
                    <XMutation mutation={decline as MutationFunc<{}>}>
                        <XButton text="Decline" />
                    </XMutation>
                </>
            }
        />
    );
};

const itemsWrapperClassName = css`
    max-width: 832px;
    margin: 0 auto;
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
`;

const convertToDataSource = (data: RoomMembersPaginated) => {
    return data.members.map(member => ({
        ...member,
        key: member.user.id,
        canKick: member.canKick,
    }));
};

export const RoomMembersList = (props: { chat: Room_room_SharedRoom, beforeChildren: any }) => {
    const { chat, beforeChildren } = props;
    const client = useClient();
    const messenger = React.useContext(MessengerContext);
    const pageSize = 20;
    const { dataSource, renderLoading } = useInfiniteScroll<
        RoomMembersPaginated,
        RoomMembersPaginated_members & { key: string; canKick: boolean }
    >({
        convertToDataSource,
        initialLoadFunction: () => {
            return client.useRoomMembersPaginated(
                {
                    roomId: chat.id,
                    first: pageSize,
                },
                {
                    fetchPolicy: 'network-only',
                },
            );
        },
        queryOnNeedMore: async ({ getLastItem }: { getLastItem: () => any }) => {
            const lastItem = getLastItem();
            return await client.queryRoomMembersPaginated({
                roomId: chat.id,
                first: pageSize,
                after: lastItem.user.id,
            });
        },
    });

    React.useEffect(() => {
        return dataSource.watch({
            onDataSourceInited(members: RoomMembersPaginated_members[], completed: boolean) {
                members.map(u => u.user.id).map(messenger.getOnlines().onUserAppears);
            },
            onDataSourceItemAdded(item: RoomMembersPaginated_members, index: number) {
                messenger.getOnlines().onUserAppears(item.user.id);
            },
            onDataSourceLoadedMore(members: RoomMembersPaginated_members[], completed: boolean) {
                members.map(u => u.user.id).map(messenger.getOnlines().onUserAppears);
            },
            onDataSourceItemUpdated(item: RoomMembersPaginated_members, index: number) {
                // Nothing to do
            },
            onDataSourceItemRemoved(item: RoomMembersPaginated_members, index: number) {
                // Nothing to do
            },
            onDataSourceItemMoved(
                item: RoomMembersPaginated_members,
                fromIndex: number,
                toIndex: number,
            ) {
                // Nothing to do
            },
            onDataSourceCompleted() {
                // Nothing to do
            },
            onDataSourceScrollToKeyRequested() {
                //
            },
        });
    }, []);

    const renderItem = React.useMemo(() => {
        return (member: any) => {
            return (
                <div className={itemsWrapperClassName}>
                    <MemberCard key={member.id} chat={chat} member={member} />
                </div>
            );
        };
    }, []);

    return (
        <XListView
            dataSource={dataSource}
            itemHeight={72}
            loadingHeight={200}
            renderItem={renderItem}
            renderLoading={renderLoading}
            beforeChildren={beforeChildren}
        />
    );
};

const RoomFeaturedMembersInner = (props: { chat: Room_room_SharedRoom }) => {
    const { chat } = props;
    const client = useClient();
    const featuredMembers = client.useRoomFeaturedMembers({ roomId: chat.id }, { fetchPolicy: 'network-only' }).roomFeaturedMembers;

    return (
        <>
            {featuredMembers.map((member, i) => (
                <div className={itemsWrapperClassName}>
                    <MemberCard key={member.user.id} chat={chat} member={member} />
                </div>
            ))}
        </>
    );
};

export const RoomFeaturedMembersList = (props: { chat: Room_room_SharedRoom, beforeChildren: any }) => {
    const { chat, beforeChildren } = props;

    const renderLoading = (
        <XView height={50} justifyContent="center">
            <XLoader loading={true} />
        </XView>
    );

    return (
        <XScrollView3 flexGrow={1} flexShrink={1}>
            <XView flexDirection="column">
                {beforeChildren}
                <React.Suspense fallback={renderLoading}>
                    <RoomFeaturedMembersInner chat={chat} />
                </React.Suspense>
            </XView>
        </XScrollView3>
    );
};

export const RoomRequestsMembersList = (props: { chat: Room_room_SharedRoom, requests: Room_room_SharedRoom_requests[], beforeChildren: any }) => {
    const { chat, requests, beforeChildren } = props;

    return (
        <XScrollView3 flexGrow={1} flexShrink={1}>
            <XView flexDirection="column">
                {beforeChildren}
                {requests.map((req, i) => (
                    <div className={itemsWrapperClassName}>
                        <RequestCard key={i} member={req} chat={chat} />
                    </div>
                ))}
            </XView>
        </XScrollView3>
    );
};