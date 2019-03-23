import * as React from 'react';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XSubHeader } from 'openland-x/XSubHeader';
import { XWithRouter, withRouter } from 'openland-x-routing/withRouter';
import { XButton } from 'openland-x/XButton';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView2 } from 'openland-x/XScrollView2';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XFormField } from 'openland-x-forms/XFormField';
import { XTextArea } from 'openland-x/XTextArea';
import { XUserCard } from 'openland-x/cards/XUserCard';
import { XMenuItem, XMenuItemSeparator } from 'openland-x/XMenuItem';
import { XOverflow } from 'openland-web/components/XOverflow';
import { LeaveChatComponent } from 'openland-web/fragments/MessengerRootComponent';
import { RemoveMemberModal } from '../../../../fragments/membersComponent';
import { XCreateCard } from 'openland-x/cards/XCreateCard';
import {
    HeaderAvatar,
    HeaderTitle,
    HeaderInfo,
    HeaderTools,
    BackButton,
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
import { withRoom } from 'openland-web/api/withRoom';
import { XSwitcher } from 'openland-x/XSwitcher';
import { withRoomMembersMgmt } from 'openland-web/api/withRoomRequestsMgmt';
import { XMutation } from 'openland-x/XMutation';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { withRoomAdminTools } from 'openland-web/api/withRoomAdminTools';
import { withQueryLoader } from 'openland-web/components/withQueryLoader';
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
import { RoomAddMemberModal } from 'openland-web/fragments/chat/RoomAddMemberModal';
import { InviteMembersModal } from 'openland-web/fragments/inviteMembersModal';
import { getWelcomeMessageSenders } from 'openland-y-utils/getWelcomeMessageSenders';
import { checkCanSeeAdvancedSettings } from 'openland-y-utils/checkCanSeeAdvancedSettings';
import { useClient } from 'openland-web/utils/useClient';

const HeaderMembers = (props: { online?: boolean; children?: any }) => (
    <XView fontSize={13} lineHeight={1.23} color={props.online ? '#1790ff' : '#7F7F7F'}>
        {props.children}
    </XView>
);

export const AdminTools = withRoomAdminTools(
    withQueryLoader(props => (
        <>
            {props.data && props.data.roomSuper && (
                <RoomSetFeatured
                    val={props.data.roomSuper!.featured}
                    roomId={props.data.roomSuper.id}
                />
            )}
            {props.data && props.data.roomSuper && (
                <RoomSetHidden
                    val={props.data.roomSuper!.listed}
                    roomId={props.data.roomSuper.id}
                />
            )}
        </>
    )),
) as React.ComponentType<{ id: string; variables: { id: string } }>;

const Header = ({ chat }: { chat: Room_room_SharedRoom }) => {
    let meMember = chat.membership === 'MEMBER';
    let leaveText = 'Leave group';

    const canEdit = chat.canEdit;

    const canChangeAdvancedSettingsMembersUsers = getWelcomeMessageSenders({
        chat,
    });

    const canSeeAdvancedSettings = checkCanSeeAdvancedSettings({ chat });
    return (
        <HeaderWrapper>
            <XContentWrapper withFlex={true}>
                <HeaderAvatar>
                    <XAvatar2 src={chat.photo} size={58} title={chat.title} id={chat.id} />
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
                            <AdvancedSettingsModal
                                roomId={chat.id}
                                socialImage={chat.socialImage}
                                canChangeAdvancedSettingsMembersUsers={
                                    canChangeAdvancedSettingsMembersUsers
                                }
                                welcomeMessageText={chat.welcomeMessage!!.message}
                                welcomeMessageSender={chat.welcomeMessage!!.sender}
                                welcomeMessageIsOn={chat.welcomeMessage!!.isOn}
                            />
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

const AboutPlaceholder = (props: {
    target: any;
    description: string | null;
    roomId: string;
}) => {
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

const RequestCard = withRoomMembersMgmt(
    (props: { member: RoomFull_SharedRoom_requests; meOwner: boolean; roomId: string }) => {
        return (
            <XUserCard
                user={props.member.user}
                customButton={
                    <>
                        <XMutation
                            mutation={(props as any).accept}
                            variables={{
                                roomId: props.roomId,
                                userId: props.member.user.id,
                            }}
                        >
                            <XButton style="primary" text="Accept" />
                        </XMutation>
                        <XMutation
                            mutation={(props as any).decline}
                            variables={{
                                roomId: props.roomId,
                                userId: props.member.user.id,
                            }}
                        >
                            <XButton text="Decline" />
                        </XMutation>
                    </>
                }
            />
        );
    },
);

interface MembersProviderProps {
    members: RoomFull_SharedRoom_members[];
    requests?: RoomFull_SharedRoom_requests[] | null;
    chatId: string;
    isOwner: boolean;
    chatTitle: string;
    onDirectory?: boolean;
}

const MembersProvider = ({
    members,
    router,
    requests,
    isOwner,
    chatTitle,
    chatId,
    onDirectory,
}: MembersProviderProps & XWithRouter) => {
    if (members && members.length > 0) {
        let tab: tabsT =
            router.query.requests === '1' && (requests || []).length > 0
                ? tabs.requests
                : tabs.members;
        return (
            <Section separator={0}>
                {isOwner && (requests || []).length > 0 && (
                    <XSwitcher style="button">
                        <XSwitcher.Item query={{ field: 'requests' }} counter={members.length}>
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
                    <XSubHeader title={'Members'} counter={members.length} paddingBottom={0} />
                )}

                <SectionContent>
                    {tab === tabs.members && (
                        <>
                            <RoomAddMemberModal
                                roomId={chatId}
                                refetchVars={{
                                    roomId: chatId,
                                }}
                                linkInvitePath={
                                    onDirectory
                                        ? `/directory/p/${chatId}?inviteByLink=true`
                                        : `/mail/p/${chatId}?inviteByLink=true`
                                }
                            />
                            <XCreateCard
                                text="Add members"
                                query={{ field: 'inviteMembers', value: 'true' }}
                            />
                            <InviteMembersModal roomId={chatId} />
                            {members.map((member, i) => {
                                return <MemberCard key={i} member={member} />;
                            })}
                        </>
                    )}

                    {isOwner &&
                        tab === tabs.requests &&
                        requests &&
                        requests.map((req, i) => (
                            <RequestCard key={i} member={req} meOwner={isOwner} roomId={chatId} />
                        ))}
                </SectionContent>
                <RemoveMemberModal members={members} roomId={chatId} roomTitle={chatTitle} />
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

const RoomGroupProfileInner = ({
    chat,
    onDirectory,
    conversationId,
    router,
}: RoomGroupProfileInnerProps) => {
    return (
        <>
            <XDocumentHead title={chat.title} />
            <XView flexGrow={1}>
                <BackButton />
                <Header chat={chat} />
                <XScrollView2 flexGrow={1}>
                    <About chat={chat} />
                    <MembersProvider
                        router={router}
                        members={chat.members}
                        requests={chat.requests}
                        chatId={conversationId}
                        isOwner={chat.role === 'OWNER'}
                        chatTitle={chat.title}
                        onDirectory={onDirectory}
                    />
                </XScrollView2>
            </XView>
        </>
    );
};

const RoomGroupProfileProvider = withRoom(
    withRouter(props => {
        let chat = props.data.room as Room_room_SharedRoom;
        return chat ? (
            <RoomGroupProfileInner
                chat={chat}
                router={props.router}
                onDirectory={(props as any).onDirectory}
                conversationId={(props as any).conversationId}
            />
        ) : (
                <XLoader loading={true} />
            );
    }),
) as React.ComponentType<{
    variables: { id: string };
    onDirectory?: boolean;
    conversationId: string;
}>;

export const RoomProfile = (props: { conversationId: string; onDirectory?: boolean }) => (
    <RoomGroupProfileProvider
        variables={{ id: props.conversationId }}
        onDirectory={props.onDirectory}
        conversationId={props.conversationId}
    />
);
