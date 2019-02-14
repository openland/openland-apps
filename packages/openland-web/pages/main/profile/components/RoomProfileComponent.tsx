import * as React from 'react';
import { withAlterChat } from '../../../../api/withAlterChat';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XSubHeader } from 'openland-x/XSubHeader';
import { withRouter } from 'next/router';
import { XWithRouter } from 'openland-x-routing/withRouter';
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
import { XOverflow } from '../../../../components/XOverflow';
import { LeaveChatComponent } from '../../../../fragments/MessengerRootComponent';
import { RemoveMemberModal } from '../../channel/components/membersComponent';
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
    SharedRoomKind,
} from 'openland-api/Types';
import { withRoom } from '../../../../api/withRoom';
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
import { tabs, tabsT } from '../tabs';
import { RoomAddMemberModal } from '../../../../fragments/chat/RoomAddMemberModal';

const HeaderMembers = (props: { online?: boolean; children?: any }) => (
    <XView fontSize={13} lineHeight={1.23} color={props.online ? '#1790ff' : '#7F7F7F'}>
        {props.children}
    </XView>
);

export const AdminTools = withRoomAdminTools(
    withQueryLoader(props => (
        <>
            {props.data &&
                props.data.roomSuper && (
                    <RoomSetFeatured
                        val={props.data.roomSuper!.featured}
                        roomId={props.data.roomSuper.id}
                    />
                )}
            {props.data &&
                props.data.roomSuper && (
                    <RoomSetHidden
                        val={props.data.roomSuper!.listed}
                        roomId={props.data.roomSuper.id}
                    />
                )}
        </>
    )),
) as React.ComponentType<{ id: string; variables: { id: string } }>;

const Header = (props: { chat: Room_room_SharedRoom }) => {
    let chat = props.chat;
    let meMember = chat.membership === 'MEMBER';
    let leaveText = chat.kind === 'GROUP' ? 'Leave group' : 'Leave room';
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
                        {/* {chat.membersOnline > 0 && <HeaderMembers online={true}>{chat.membersOnline} online</HeaderMembers>} */}
                    </XHorizontal>
                </HeaderInfo>
                <HeaderTools separator={3}>
                    <XButton
                        text={meMember ? 'View' : 'Request invite'}
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
                                        <XWithRole
                                            role="super-admin"
                                            or={chat.role === 'OWNER' || chat.role === 'ADMIN'}
                                        >
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
                                        <XWithRole role="super-admin">
                                            <XMenuItemSeparator />
                                            <AdminTools id={chat.id} variables={{ id: chat.id }} />
                                        </XWithRole>
                                    </>
                                }
                            />
                            <LeaveChatComponent />
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

const AboutPlaceholder = withAlterChat(props => {
    let editDescription = (props as any).description;
    return (
        <XModalForm
            scrollableContent={true}
            target={(props as any).target}
            useTopCloser={true}
            title="Add short description"
            defaultAction={data => {
                let newDescription = data.input.description;

                props.alter({
                    variables: {
                        roomId: (props as any).roomId,
                        input: {
                            ...(newDescription !== editDescription
                                ? { description: newDescription }
                                : {}),
                        },
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
}) as React.ComponentType<{
    target: any;
    description: string | null;
    roomId: string;
}>;

const About = (props: { chat: Room_room_SharedRoom }) => {
    let chat = props.chat;
    let meMember = chat.membership === 'MEMBER';
    let meAdmin = chat.role === 'ADMIN' || chat.role === 'OWNER';
    return (
        <>
            {chat.description && (
                <Section separator={0}>
                    <XSubHeader title="About" paddingBottom={0} />
                    <SectionContent>{chat.description}</SectionContent>
                </Section>
            )}
            {!chat.description &&
                meAdmin && (
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
                )}
        </>
    );
};

const MemberCard = (props: {
    member: RoomFull_SharedRoom_members;
    meOwner: boolean;
    isGroup: boolean;
}) => {
    let removeText = props.isGroup ? 'Remove from group' : 'Remove from room';

    if (props.member.user.isYou) {
        removeText = props.isGroup ? 'Leave group' : 'Leave room';
    }

    let overflowMenu = (
        <XOverflow
            placement="bottom-end"
            flat={true}
            content={
                <XMenuItem style="danger" query={{ field: 'remove', value: props.member.user.id }}>
                    {removeText}
                </XMenuItem>
            }
        />
    );
    return <XUserCard user={props.member.user} customMenu={props.meOwner ? overflowMenu : null} />;
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
    meOwner: boolean;
    chatTitle: string;
    kind: SharedRoomKind;
}

const MembersProvider = ({
    members,
    router,
    requests,
    meOwner,
    chatTitle,
    chatId,
    kind,
}: MembersProviderProps & XWithRouter) => {
    if (members && members.length > 0) {
        let tab: tabsT =
            router.query.requests === '1' && (requests || []).length > 0
                ? tabs.requests
                : tabs.members;
        return (
            <Section separator={0}>
                {meOwner &&
                    (requests || []).length > 0 && (
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
                {((requests || []).length === 0 || !meOwner) && (
                    <XSubHeader title={'Members'} counter={members.length} paddingBottom={0} />
                )}

                <SectionContent>
                    {tab === tabs.members && (
                        <>
                            <RoomAddMemberModal
                                roomId={chatId}
                                target={<XCreateCard text="Invite people" />}
                            />
                            {members.map((member, i) => (
                                <MemberCard
                                    key={i}
                                    member={member}
                                    meOwner={meOwner}
                                    isGroup={kind === 'GROUP'}
                                />
                            ))}
                        </>
                    )}

                    {meOwner &&
                        tab === tabs.requests &&
                        requests &&
                        requests.map((req, i) => (
                            <RequestCard key={i} member={req} meOwner={meOwner} roomId={chatId} />
                        ))}
                </SectionContent>
                {meOwner && (
                    <>
                        {/*<RoomAddMemberModal roomId={chatId} />*/}
                        <RemoveMemberModal
                            members={members}
                            roomId={chatId}
                            roomTitle={chatTitle}
                        />
                    </>
                )}
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

const RoomGroupProfileInner = (props: RoomGroupProfileInnerProps) => {
    let chat = props.chat;
    return (
        <>
            <XDocumentHead title={chat.title} />
            <XView flexGrow={1}>
                <BackButton />
                <Header chat={chat} />
                <XScrollView2 flexGrow={1}>
                    <About chat={chat} />
                    <MembersProvider
                        kind={chat.kind}
                        router={props.router}
                        members={chat.members}
                        requests={chat.requests}
                        chatId={props.conversationId}
                        meOwner={chat.membership === 'MEMBER'}
                        chatTitle={chat.title}
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
