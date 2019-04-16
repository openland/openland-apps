import * as React from 'react';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XSubHeader } from 'openland-x/XSubHeader';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { XButton } from 'openland-x/XButton';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XFormField } from 'openland-x-forms/XFormField';
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
} from 'openland-api/Types';
import { MutationFunc } from 'react-apollo';
import { XSwitcher } from 'openland-x/XSwitcher';
import { XMutation } from 'openland-x/XMutation';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XView } from 'react-mental';
import { XAvatar2 } from 'openland-x/XAvatar2';
import {
    RoomSetFeatured,
    RoomSetHidden,
} from 'openland-web/pages/main/profile/components/RoomControls';
import { RoomEditModal } from 'openland-web/fragments/chat/RoomEditModal';
import { AdvancedSettingsModal } from 'openland-web/fragments/chat/AdvancedSettingsModal';
import { tabs, tabsT } from '../tabs';
import { AddMembersModal } from 'openland-web/fragments/AddMembersModal';
import { getWelcomeMessageSenders } from 'openland-y-utils/getWelcomeMessageSenders';
import { checkCanSeeAdvancedSettings } from 'openland-y-utils/checkCanSeeAdvancedSettings';
import { useClient } from 'openland-web/utils/useClient';
import { XCommunityCard } from 'openland-x/cards/XCommunityCard';
import { AvatarModal } from './UserProfileComponent';
import Glamorous from 'glamorous';
import { canUseDOM } from '../../../../../openland-y-utils/canUseDOM';
import { XIcon } from '../../../../../openland-x/XIcon';
import { TextProfiles } from '../../../../../openland-text/TextProfiles';
import { useInfiniteScroll } from 'openland-web/hooks/useInfiniteScroll';

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
                                content={
                                    <>
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
                                            query={{
                                                field: 'leaveFromChat',
                                                value: chat.id,
                                            }}
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
                                    </>
                                }
                            />
                            <LeaveChatComponent />
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
                            />
                        </>
                    )}
                </HeaderTools>
            </XContentWrapper>
        </HeaderWrapper>
    );
};

const AboutPlaceholder = (props: { target: any; description: string | null; roomId: string }) => {
    let client = useClient();
    let editDescription = (props as any).description;
    return (
        <XModalForm
            scrollableContent={true}
            target={(props as any).target}
            useTopCloser={true}
            title="Add short description"
            defaultAction={async data => {
                let newDescription = data.input.description;

                await client.mutateRoomUpdate({
                    roomId: (props as any).roomId,
                    input: {
                        ...(newDescription !== editDescription
                            ? { description: newDescription }
                            : {}),
                    },
                });
            }}
            defaultData={{
                input: {
                    description: (props as any).description || '',
                },
            }}
        >
            <XVertical>
                <XFormLoadingContent>
                    <XFormField field="input.description">
                        <XTextArea
                            valueStoreKey="fields.input.description"
                            placeholder="Description"
                            resize={false}
                        />
                    </XFormField>
                </XFormLoadingContent>
            </XVertical>
        </XModalForm>
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
                            <AboutPlaceholder
                                roomId={chat.id}
                                description={chat.description}
                                target={<EditButton text="Add a short description" />}
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
    membersCount: number;
    requests?: RoomFull_SharedRoom_requests[] | null;
    chatId: string;
    isOwner: boolean;
    chatTitle: string;
    onDirectory?: boolean;
    isChannel: boolean;
}

const convertToDataSource = (data: any) => {
    return data.members.map(({ user }: any) => ({ ...user, key: user.id }));
};

const MembersProvider = ({
    membersCount,
    router,
    requests,
    isOwner,
    chatTitle,
    chatId,
    onDirectory,
    isChannel,
}: MembersProviderProps & XWithRouter) => {
    const client = useClient();
    const pageSize = 20;

    const { dataSource, renderLoading } = useInfiniteScroll({
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
                after: lastItem.id,
            });
        },
    });

    const members: any = [1];

    const renderItem = React.useMemo(() => {
        return (member: any) => {
            return <MemberCard key={member.id} member={{ user: member }} />;
        };
    }, []);

    if (members && members.length > 0) {
        let tab: tabsT =
            router.query.requests === '1' && (requests || []).length > 0
                ? tabs.requests
                : tabs.members;

        let sectionElems;
        if (tab === tabs.members) {
            sectionElems = (
                <>
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
                    <XView flexBasis={0} flexGrow={1} flexShrink={1} overflow="hidden">
                        <XListView
                            dataSource={dataSource}
                            itemHeight={72}
                            loadingHeight={60}
                            renderItem={renderItem}
                            renderLoading={renderLoading}
                        />
                    </XView>
                </>
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

                {/* <RemoveMemberModal members={members} roomId={chatId} roomTitle={chatTitle} /> */}
            </Section>
        );
    } else {
        return null;
    }
};

interface RoomGroupProfileInnerProps extends XWithRouter {
    chat: Room_room_SharedRoom;
    onDirectory?: boolean;
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

const RoomGroupProfileInner = ({
    chat,
    onDirectory,
    conversationId,
    router,
}: RoomGroupProfileInnerProps) => {
    return (
        <>
            <XDocumentHead title={chat.title} />
            <XView flexGrow={1} flexShrink={1}>
                <BackButton />
                <Header chat={chat} />
                <XScrollView3 flexGrow={1} flexShrink={1}>
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
                    <React.Suspense fallback={<XLoader loading={true} />}>
                        <MembersProvider
                            membersCount={chat.organization!!.membersCount}
                            router={router}
                            requests={chat.requests}
                            chatId={conversationId}
                            isOwner={chat.role === 'OWNER'}
                            chatTitle={chat.title}
                            onDirectory={onDirectory}
                            isChannel={chat.isChannel}
                        />
                    </React.Suspense>
                </XScrollView3>
            </XView>
        </>
    );
};

const RoomGroupProfileProvider = ({
    variables,
    onDirectory,
    conversationId,
}: {
    variables: { id: string };
    onDirectory?: boolean;
    conversationId: string;
}) => {
    let router = React.useContext(XRouterContext)!;
    const client = useClient();

    const data = client.useRoomWithoutMembers(variables);

    let chat = data.room as Room_room_SharedRoom;

    return chat ? (
        <RoomGroupProfileInner
            chat={chat}
            router={router}
            onDirectory={onDirectory}
            conversationId={conversationId}
        />
    ) : (
        <XLoader loading={true} />
    );
};

export const RoomProfile = (props: { conversationId: string; onDirectory?: boolean }) => (
    <React.Suspense fallback={<XLoader loading={true} />}>
        <RoomGroupProfileProvider
            variables={{ id: props.conversationId }}
            onDirectory={props.onDirectory}
            conversationId={props.conversationId}
        />
    </React.Suspense>
);
