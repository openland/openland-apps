import * as React from 'react';
import Glamorous from 'glamorous';
import { css } from 'linaria';
import { MutationFunc } from 'react-apollo';
import { XView } from 'react-mental';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XSubHeader } from 'openland-x/XSubHeader';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { XButton } from 'openland-x/XButton';
import { XLoader } from 'openland-x/XLoader';
import { RoomMembersPaginated } from 'openland-api/Types';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { showModalBox } from 'openland-x/showModalBox';
import { XTextArea } from 'openland-x/XTextArea';
import { XUserCard } from 'openland-x/cards/XUserCard';
import { XMenuItem, XMenuItemSeparator } from 'openland-x/XMenuItem';
import { XOverflow } from 'openland-web/components/XOverflow';
import { LeaveChatComponent } from 'openland-web/fragments/MessengerRootComponent';
import { RemoveMemberModal } from 'openland-web/fragments/membersComponent';
import { XCreateCard } from 'openland-x/cards/XCreateCard';
import { XListView } from 'openland-web/components/XListView';
import {
    HeaderAvatar,
    HeaderTitle,
    HeaderInfo,
    HeaderTools,
    Section,
    SectionContent,
    HeaderWrapper,
    EditButton,
} from './OrganizationProfileComponent';
import {
    Room_room_SharedRoom,
    RoomFull_SharedRoom_members,
    RoomFull_SharedRoom_requests,
    RoomMembersPaginated_members,
} from 'openland-api/Types';
import { XSwitcher } from 'openland-x/XSwitcher';
import { XMutation } from 'openland-x/XMutation';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XAvatar2 } from 'openland-x/XAvatar2';
import {
    RoomSetFeatured,
    RoomSetHidden,
} from 'openland-web/pages/main/profile/components/RoomControls';
import { RoomEditModal } from 'openland-web/fragments/chat/RoomEditModal';
import { AdvancedSettingsModal } from 'openland-web/fragments/chat/AdvancedSettingsModal';
import { tabs, tabsT } from '../tabs';
import { AddMembersModal } from 'openland-web/fragments/AddMembersModal';
import { checkCanSeeAdvancedSettings } from 'openland-y-utils/checkCanSeeAdvancedSettings';
import { useClient } from 'openland-web/utils/useClient';
import { XCommunityCard } from 'openland-x/cards/XCommunityCard';
import { AvatarModal } from './UserProfileComponent';
import { canUseDOM } from '../../../../../openland-y-utils/canUseDOM';
import { XIcon } from '../../../../../openland-x/XIcon';
import { TextProfiles } from '../../../../../openland-text/TextProfiles';
import { useInfiniteScroll } from 'openland-web/hooks/useInfiniteScroll';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { XModalController } from 'openland-x/showModal';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XErrorMessage } from 'openland-x/XErrorMessage';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XModalFooter } from 'openland-web/components/XModalFooter';

const HeaderMembers = (props: { online?: boolean; children?: any }) => (
    <XView fontSize={13} lineHeight={1.23} color={props.online ? '#1790ff' : '#7F7F7F'}>
        {props.children}
    </XView>
);

export const AdminTools = (props: { id: string; variables: { id: string } }) => {
    let client = useClient();
    const data = client.useRoomSuper(props.variables);

    return (
        <>
            {data && data.roomSuper && (
                <RoomSetFeatured val={data.roomSuper!.featured} roomId={data.roomSuper.id} />
            )}
            {data && data.roomSuper && (
                <RoomSetHidden val={data.roomSuper!.listed} roomId={data.roomSuper.id} />
            )}
        </>
    );
};

const Header = ({ chat }: { chat: Room_room_SharedRoom }) => {
    let meMember = chat.membership === 'MEMBER';
    let leaveText = 'Leave group';

    const canEdit = chat.canEdit;

    const canSeeAdvancedSettings = checkCanSeeAdvancedSettings({ chat });
    const sharedRoom = chat.__typename === 'SharedRoom' ? (chat as Room_room_SharedRoom) : null;
    const isChannel = !!(sharedRoom && sharedRoom.isChannel);
    return (
        <HeaderWrapper>
            <XContentWrapper withFlex={true}>
                <HeaderAvatar>
                    {!chat.photo.match('ph://') && (
                        <AvatarModal photo={chat.photo} title={chat.title} id={chat.id} />
                    )}
                    {chat.photo.match('ph://') && (
                        <XAvatar2 src={chat.photo} size={58} title={chat.title} id={chat.id} />
                    )}
                </HeaderAvatar>
                <HeaderInfo flexGrow={1} separator={3.5}>
                    <HeaderTitle>{chat.title}</HeaderTitle>
                    <XHorizontal separator={3.5}>
                        <HeaderMembers>{chat.membersCount} members</HeaderMembers>
                    </XHorizontal>
                </HeaderInfo>
                <HeaderTools separator={3}>
                    <XButton
                        text={meMember ? 'View' : 'Join group'}
                        style="primary"
                        path={meMember ? '/mail/' + chat.id : '/directory/r/' + chat.id}
                    />
                    {meMember && (
                        <>
                            <XOverflow
                                placement="bottom-end"
                                flat={true}
                                width={152}
                                content={
                                    <React.Suspense fallback={<XLoader loading={true} />}>
                                        <XWithRole role="super-admin" or={canEdit}>
                                            <XMenuItem
                                                query={{
                                                    field: 'editChat',
                                                    value: 'true',
                                                }}
                                            >
                                                Settings
                                            </XMenuItem>
                                        </XWithRole>

                                        <XMenuItem
                                            onClick={() =>
                                                showModalBox({ title: 'Leave the chat' }, ctx => (
                                                    <LeaveChatComponent id={chat.id} ctx={ctx} />
                                                ))
                                            }
                                            style="danger"
                                        >
                                            {leaveText}
                                        </XMenuItem>

                                        <XWithRole role="super-admin" or={canSeeAdvancedSettings}>
                                            <XMenuItemSeparator />
                                            <XMenuItem
                                                query={{
                                                    field: 'advancedSettings',
                                                    value: 'true',
                                                }}
                                            >
                                                Advanced settings
                                            </XMenuItem>
                                            <XWithRole role="super-admin">
                                                <AdminTools
                                                    id={chat.id}
                                                    variables={{ id: chat.id }}
                                                />
                                            </XWithRole>
                                        </XWithRole>
                                    </React.Suspense>
                                }
                            />
                            {chat.welcomeMessage && (
                                <AdvancedSettingsModal
                                    roomId={chat.id}
                                    socialImage={chat.socialImage}
                                    welcomeMessageText={chat.welcomeMessage!!.message}
                                    welcomeMessageSender={chat.welcomeMessage!!.sender}
                                    welcomeMessageIsOn={chat.welcomeMessage!!.isOn}
                                />
                            )}
                            <RoomEditModal
                                roomId={chat.id}
                                title={chat.title}
                                description={chat.description}
                                photo={chat.photo}
                                socialImage={chat.socialImage}
                                isChannel={isChannel}
                            />
                        </>
                    )}
                </HeaderTools>
            </XContentWrapper>
        </HeaderWrapper>
    );
};

const DescriptionModalContent = (props: {
    description: string | null;
    roomId: string;
    ctx: XModalController;
}) => {
    const client = useClient();
    const form = useForm();
    const editDescription = (props as any).description;
    const descriptionField = useField('input.description', editDescription, form);

    const createAction = () => {
        form.doAction(async () => {
            await client.mutateRoomUpdate({
                roomId: (props as any).roomId,
                input: {
                    ...(descriptionField.value !== editDescription
                        ? { description: descriptionField.value }
                        : {}),
                },
            });
            props.ctx.hide();
        });
    };

    return (
        <XView borderRadius={8}>
            {form.loading && <XLoader loading={form.loading} />}
            {form.error && <XErrorMessage message={form.error} />}
            <XModalContent>
                <XTextArea {...descriptionField.input} placeholder="Description" resize={false} />
            </XModalContent>
            <XModalFooter>
                <XButton text="Save" style="primary" size="large" onClick={createAction} />
            </XModalFooter>
        </XView>
    );
};

const About = (props: { chat: Room_room_SharedRoom }) => {
    let chat = props.chat;

    const showAboutEdit = chat.canEdit;
    return (
        <>
            {chat.description && (
                <Section separator={0}>
                    <XSubHeader title="About" paddingBottom={0} />
                    <SectionContent>{chat.description}</SectionContent>
                </Section>
            )}
            {showAboutEdit &&
                (!chat.description && (
                    <Section separator={0}>
                        <XSubHeader title="About" paddingBottom={0} />
                        <SectionContent>
                            <EditButton
                                text="Add a short description"
                                onClick={() =>
                                    showModalBox({ title: 'Add short description' }, ctx => (
                                        <DescriptionModalContent
                                            roomId={chat.id}
                                            description={chat.description}
                                            ctx={ctx}
                                        />
                                    ))
                                }
                            />
                        </SectionContent>
                    </Section>
                ))}
        </>
    );
};

const MemberCard = ({ member }: { member: RoomFull_SharedRoom_members }) => {
    return (
        <XUserCard
            user={member.user}
            customMenu={
                member.canKick || member.user.isYou ? (
                    <XOverflow
                        placement="bottom-end"
                        flat={true}
                        content={
                            <XMenuItem
                                style="danger"
                                query={{ field: 'remove', value: member.user.id }}
                            >
                                {member.user.isYou ? 'Leave group' : 'Remove from group'}
                            </XMenuItem>
                        }
                    />
                ) : null
            }
        />
    );
};

const RequestCard = ({
    member,
    roomId,
}: {
    member: RoomFull_SharedRoom_requests;
    roomId: string;
}) => {
    const client = useClient();

    const accept = async () => {
        await client.mutateRoomAddMember({
            roomId,
            userId: member.user.id,
        });
    };
    const decline = async () => {
        await client.mutateRoomDeclineJoinReuest({
            roomId,
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

interface MembersProviderProps {
    roomTitle: string;
    membersCount: number | null;
    requests?: RoomFull_SharedRoom_requests[] | null;
    chatId: string;
    isOwner: boolean;
    isChannel: boolean;
}

const MembersProvider = ({
    roomTitle,
    membersCount,
    router,
    requests,
    isOwner,
    chatId,
    isChannel,
}: MembersProviderProps & XWithRouter) => {
    if (membersCount && membersCount > 0) {
        let tab: tabsT =
            router.query.requests === '1' && (requests || []).length > 0
                ? tabs.requests
                : tabs.members;

        let sectionElems;
        if (tab === tabs.members) {
            sectionElems = (
                <XView flexGrow={1} flexShrink={1}>
                    <AddMembersModal
                        id={chatId}
                        isRoom={true}
                        isChannel={isChannel}
                        isOrganization={false}
                    />
                    <XCreateCard
                        text="Add members"
                        query={{ field: 'inviteMembers', value: 'true' }}
                    />
                </XView>
            );
        } else {
            sectionElems =
                isOwner &&
                requests &&
                requests.map((req, i) => <RequestCard key={i} member={req} roomId={chatId} />);
        }

        return (
            <Section separator={0} flexGrow={1}>
                {isOwner && (requests || []).length > 0 && (
                    <XSwitcher style="button">
                        <XSwitcher.Item query={{ field: 'requests' }} counter={membersCount}>
                            Members
                        </XSwitcher.Item>
                        <XSwitcher.Item
                            query={{ field: 'requests', value: '1' }}
                            counter={requests!.length}
                        >
                            Requests
                        </XSwitcher.Item>
                    </XSwitcher>
                )}
                {((requests || []).length === 0 || !isOwner) && (
                    <XSubHeader title={'Members'} counter={membersCount} paddingBottom={0} />
                )}
                <SectionContent
                    noPaddingBottom
                    withFlex
                    flexDirection="column"
                    flexGrow={1}
                    flexShrink={1}
                >
                    {sectionElems}
                </SectionContent>

                <RemoveMemberModal roomId={chatId} roomTitle={roomTitle} />
            </Section>
        );
    } else {
        return null;
    }
};

interface RoomGroupProfileInnerProps extends XWithRouter {
    chat: Room_room_SharedRoom;
    conversationId: string;
}

const BackWrapper = Glamorous.div({
    background: '#f9f9f9',
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    cursor: 'pointer',
    flexShrink: 0,
});

const BackInner = Glamorous(XContentWrapper)({
    alignItems: 'center',
    paddingTop: 13,
    paddingBottom: 12,
    '& i': {
        fontSize: 20,
        marginRight: 6,
        marginLeft: -7,
        color: 'rgba(0, 0, 0, 0.3)',
    },
    '& span': {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: 0,
        color: 'rgba(0, 0, 0, 0.8)',
    },
});

const BackButton = () => (
    <BackWrapper onClick={() => (canUseDOM ? window.history.back() : null)}>
        <BackInner withFlex={true}>
            <XIcon icon="chevron_left" />
            <span>{TextProfiles.backButton}</span>
        </BackInner>
    </BackWrapper>
);

const RoomGroupProfileInner = ({ chat, conversationId, router }: RoomGroupProfileInnerProps) => {
    return (
        <XView flexGrow={1} flexShrink={1}>
            <About chat={chat} />
            {chat.organization && (
                <XView
                    flexDirection="column"
                    flexShrink={0}
                    paddingHorizontal={16}
                    maxWidth={832}
                    width="100%"
                    alignSelf="center"
                    paddingTop={chat.description ? undefined : 22}
                >
                    <XView fontSize={16} color="#000" marginBottom={12}>
                        {chat.organization.isCommunity ? 'Community' : 'Organization'}
                    </XView>
                    <XCommunityCard community={chat.organization} />
                </XView>
            )}
            <MembersProvider
                membersCount={chat.membersCount}
                roomTitle={chat.title}
                router={router}
                requests={chat.requests}
                chatId={conversationId}
                isOwner={chat.role === 'OWNER'}
                isChannel={chat.isChannel}
            />
        </XView>
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

const RoomGroupProfileProvider = ({
    variables,
    conversationId,
}: {
    variables: { id: string };
    conversationId: string;
}) => {
    let router = React.useContext(XRouterContext)!;
    const client = useClient();
    const messenger = React.useContext(MessengerContext);

    const data = client.useRoomWithoutMembers(variables);

    let chat = data.room as Room_room_SharedRoom;

    if (!chat) {
        return <XLoader loading={true} />;
    }

    const chatId = chat.id;

    const pageSize = 20;

    const { dataSource, renderLoading } = useInfiniteScroll<
        RoomMembersPaginated,
        RoomMembersPaginated_members & { key: string; canKick: boolean }
    >({
        convertToDataSource,
        initialLoadFunction: () => {
            return client.useRoomMembersPaginated(
                {
                    roomId: chatId,
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
                roomId: chatId,
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
        });
    }, []);

    const renderItem = React.useMemo(() => {
        return (member: any) => {
            return (
                <div className={itemsWrapperClassName}>
                    <MemberCard key={member.id} member={member} />
                </div>
            );
        };
    }, []);

    return (
        <>
            <XDocumentHead title={chat.title} />
            <XView flexGrow={1} flexShrink={1}>
                <BackButton />
                <Header chat={chat} />

                <XListView
                    dataSource={dataSource}
                    itemHeight={72}
                    loadingHeight={200}
                    renderItem={renderItem}
                    renderLoading={renderLoading}
                    beforeChildren={
                        <RoomGroupProfileInner
                            chat={chat}
                            router={router}
                            conversationId={conversationId}
                        />
                    }
                />
            </XView>
        </>
    );
};

export const RoomProfile = (props: { conversationId: string }) => (
    <React.Suspense fallback={<XLoader loading={true} />}>
        <RoomGroupProfileProvider
            variables={{ id: props.conversationId }}
            conversationId={props.conversationId}
        />
    </React.Suspense>
);
