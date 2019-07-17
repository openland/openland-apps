import * as React from 'react';
import Glamorous from 'glamorous';
import { XView } from 'react-mental';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XSubHeader } from 'openland-x/XSubHeader';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { XButton } from 'openland-x/XButton';
import { XLoader } from 'openland-x/XLoader';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { showModalBox } from 'openland-x/showModalBox';
import { XTextArea } from 'openland-x/XTextArea';
import { XMenuItem, XMenuItemSeparator } from 'openland-x/XMenuItem';
import { XOverflow } from 'openland-web/components/XOverflow';
import { LeaveChatComponent } from 'openland-web/fragments/chat/components/MessengerRootComponent';
import { XCreateCard } from 'openland-x/cards/XCreateCard';
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
import { Room_room_SharedRoom, RoomFull_SharedRoom_requests } from 'openland-api/Types';
import { XSwitcher } from 'openland-x/XSwitcher';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XAvatar2 } from 'openland-x/XAvatar2';
import {
    RoomSetFeatured,
    RoomSetHidden,
} from 'openland-web/fragments/account/components/RoomControls';
import { RoomEditModalBody } from 'openland-web/fragments/chat/RoomEditModal';
import { showAdvancedSettingsModal } from 'openland-web/fragments/chat/AdvancedSettingsModal';
import { AddMembersModal } from 'openland-web/fragments/chat/AddMembersModal';
import { checkCanSeeAdvancedSettings } from 'openland-y-utils/checkCanSeeAdvancedSettings';
import { useClient } from 'openland-web/utils/useClient';
import { XCommunityCard } from 'openland-x/cards/XCommunityCard';
import { AvatarModal } from './UserProfileComponent';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XIcon } from 'openland-x/XIcon';
import { TextProfiles } from 'openland-text/TextProfiles';
import { XModalController } from 'openland-x/showModal';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XErrorMessage } from 'openland-x/XErrorMessage';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import {
    RoomMembersList,
    RoomFeaturedMembersList,
    RoomRequestsMembersList,
} from './RoomMembersLists';

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
            {data &&
                data.roomSuper && (
                    <RoomSetFeatured val={data.roomSuper!.featured} roomId={data.roomSuper.id} />
                )}
            {data &&
                data.roomSuper && (
                    <RoomSetHidden val={data.roomSuper!.listed} roomId={data.roomSuper.id} />
                )}
        </>
    );
};

export type tabsT = 'featured' | 'requests' | 'members';

export const tabs: { [K in tabsT]: tabsT } = {
    featured: 'featured',
    requests: 'requests',
    members: 'members',
};

export const showRoomEditModal = (chat: Room_room_SharedRoom) => {
    const sharedRoom = chat.__typename === 'SharedRoom' ? (chat as Room_room_SharedRoom) : null;
    const isChannel = !!(sharedRoom && sharedRoom.isChannel);
    showModalBox(
        {
            title: isChannel ? 'Channel settings' : 'Group settings',
        },
        ctx => (
            <RoomEditModalBody
                roomId={chat.id}
                title={chat.title}
                photo={chat.photo}
                description={chat.description}
                socialImage={chat.socialImage}
                isChannel={isChannel}
                onClose={ctx.hide}
            />
        ),
    );
};

export const leaveChatModal = (chatId: string) =>
    showModalBox({ title: 'Leave chat' }, ctx => <LeaveChatComponent id={chatId} ctx={ctx} />);

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
                                width={152}
                                content={
                                    <React.Suspense fallback={<XLoader loading={true} />}>
                                        <XWithRole role="super-admin" or={canEdit}>
                                            <XMenuItem onClick={() => showRoomEditModal(chat)}>
                                                Settings
                                            </XMenuItem>
                                        </XWithRole>

                                        <XMenuItem
                                            onClick={() => leaveChatModal(chat.id)}
                                            style="danger"
                                        >
                                            {leaveText}
                                        </XMenuItem>

                                        <XWithRole role="super-admin" or={canSeeAdvancedSettings}>
                                            <XMenuItemSeparator />
                                            <XMenuItem
                                                onClick={() =>
                                                    showAdvancedSettingsModal({
                                                        roomId: chat.id,
                                                        socialImage: chat.socialImage,
                                                        welcomeMessageText: chat.welcomeMessage!!
                                                            .message,
                                                        welcomeMessageSender: chat.welcomeMessage!!
                                                            .sender,
                                                        welcomeMessageIsOn: chat.welcomeMessage!!
                                                            .isOn,
                                                    })
                                                }
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

export const showAddDescriptionModal = (chat: Room_room_SharedRoom) =>
    showModalBox({ title: 'Add short description' }, ctx => (
        <DescriptionModalContent roomId={chat.id} description={chat.description} ctx={ctx} />
    ));

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
                                onClick={() => showAddDescriptionModal(chat)}
                            />
                        </SectionContent>
                    </Section>
                ))}
        </>
    );
};

interface MembersProviderProps {
    roomTitle: string;
    membersCount: number;
    featuredMembersCount: number;
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
    featuredMembersCount,
}: MembersProviderProps & XWithRouter) => {
    if (membersCount <= 0) {
        return null;
    }

    const requestMembers = requests || [];
    const isRequests = router.query.tab === 'requests' && requestMembers.length > 0 && isOwner;
    const isFeatured = router.query.tab === 'featured' && featuredMembersCount > 0;
    const tab: tabsT = isRequests ? tabs.requests : isFeatured ? tabs.featured : tabs.members;

    const showTabs = featuredMembersCount > 0 || (requestMembers.length > 0 && isOwner);

    return (
        <Section separator={0} flexGrow={1}>
            {showTabs && (
                <XSwitcher style="button">
                    <XSwitcher.Item query={{ field: 'tab' }} counter={membersCount}>
                        Members
                    </XSwitcher.Item>
                    {featuredMembersCount > 0 && (
                        <XSwitcher.Item
                            query={{ field: 'tab', value: 'featured' }}
                            counter={featuredMembersCount}
                        >
                            Featured
                        </XSwitcher.Item>
                    )}
                    {requestMembers.length > 0 &&
                        isOwner && (
                            <XSwitcher.Item
                                query={{ field: 'tab', value: 'requests' }}
                                counter={requestMembers.length}
                            >
                                Requests
                            </XSwitcher.Item>
                        )}
                </XSwitcher>
            )}
            {!showTabs && <XSubHeader title="Members" counter={membersCount} paddingBottom={0} />}

            <SectionContent
                noPaddingBottom
                withFlex
                flexDirection="column"
                flexGrow={1}
                flexShrink={1}
            >
                {tab === tabs.members && (
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
                )}
            </SectionContent>
        </Section>
    );
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
                membersCount={chat.membersCount || 0}
                featuredMembersCount={chat.featuredMembersCount}
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

const RoomGroupProfileProvider = (props: { chatId: string }) => {
    const { chatId } = props;
    const router = React.useContext(XRouterContext)!;
    const client = useClient();
    const data = client.useRoomWithoutMembers({ id: chatId });

    let chat = data.room as Room_room_SharedRoom;

    if (!chat) {
        return <XLoader loading={true} />;
    }

    const isOwner = chat.role === 'OWNER';
    const requestMembers = chat.requests || [];
    const isRequests = router.query.tab === 'requests' && requestMembers.length > 0 && isOwner;
    const isFeatured = router.query.tab === 'featured' && chat.featuredMembersCount > 0;
    const tab: tabsT = isRequests ? tabs.requests : isFeatured ? tabs.featured : tabs.members;

    const beforeItems = (
        <RoomGroupProfileInner chat={chat} router={router} conversationId={chatId} />
    );

    return (
        <>
            <XDocumentHead title={chat.title} />
            <XView flexGrow={1} flexShrink={1}>
                <BackButton />
                <Header chat={chat} />

                {tab === tabs.members && (
                    <RoomMembersList chat={chat} beforeChildren={beforeItems} />
                )}

                {tab === tabs.featured && (
                    <RoomFeaturedMembersList chat={chat} beforeChildren={beforeItems} />
                )}

                {tab === tabs.requests && (
                    <RoomRequestsMembersList
                        chat={chat}
                        requests={requestMembers}
                        beforeChildren={beforeItems}
                    />
                )}
            </XView>
        </>
    );
};

export const RoomProfile = (props: { conversationId: string }) => (
    <React.Suspense fallback={<XLoader loading={true} />}>
        <RoomGroupProfileProvider chatId={props.conversationId} />
    </React.Suspense>
);
