import * as React from 'react';
import Glamorous from 'glamorous';
import { withAlterChat } from '../../../api/withAlterChat';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatar } from 'openland-x/XAvatar';
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
import { sanitizeIamgeRef } from 'openland-y-utils/sanitizeImageRef';
import { XOverflow } from '../../../components/Incubator/XOverflow';
import { LeaveChatComponent } from '../../../components/messenger/components/MessengerRootComponent';
import { RemoveMemberModal } from '../channel/components/membersComponent';
import { XCreateCard } from 'openland-x/cards/XCreateCard';
import {
    AddMemberForm,
    RoomEditComponent,
    RoomSetFeatured,
    RoomSetHidden,
} from '../../../components/messenger/MessengerComponent';
import {
    HeaderAvatar,
    HeaderTitle,
    HeaderInfo,
    HeaderTools,
    BackButton,
    Section,
    SectionContent,
    HeaderWrapper,
    OrganizationInfoWrapper,
    EditButton,
} from './OrganizationProfileComponent';
import {
    Room_room_SharedRoom,
    RoomFull_SharedRoom_members,
    RoomFull_SharedRoom_requests,
    SharedRoomKind,
} from 'openland-api/Types';
import { withRoom } from '../../../api/withRoom';
import { XSwitcher } from 'openland-x/XSwitcher';
import { withRoomMembersMgmt } from 'openland-web/api/withRoomRequestsMgmt';
import { XMutation } from 'openland-x/XMutation';
import { InviteMembersModal } from '../channel/components/inviteMembersModal';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { withRoomAdminTools } from 'openland-web/api/withRoomAdminTools';
import { withQueryLoader } from 'openland-web/components/withQueryLoader';

const HeaderMembers = Glamorous.div<{ online?: boolean }>(props => ({
    fontSize: 13,
    lineHeight: 1.23,
    color: props.online ? '#1790ff' : '#7F7F7F',
}));

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
    return (
        <HeaderWrapper>
            <XContentWrapper withFlex={true}>
                <HeaderAvatar>
                    <XAvatar
                        cloudImageUuid={chat.photo || undefined}
                        size="l-medium"
                        style="organization"
                        objectName={chat.title}
                        objectId={chat.id}
                    />
                </HeaderAvatar>
                <HeaderInfo flexGrow={1} separator={3.5}>
                    <HeaderTitle>{chat.title}</HeaderTitle>
                    <XHorizontal separator={3.5}>
                        <HeaderMembers>
                            {chat.membersCount} members
                        </HeaderMembers>
                        {/* {chat.membersOnline > 0 && <HeaderMembers online={true}>{chat.membersOnline} online</HeaderMembers>} */}
                    </XHorizontal>
                </HeaderInfo>
                <HeaderTools separator={8}>
                    <XButton
                        text={meMember ? 'View' : 'Request invite'}
                        style="primary"
                        path={
                            meMember
                                ? '/mail/' + chat.id
                                : '/directory/r/' + chat.id
                        }
                    />
                    {meMember && (
                        <>
                            <XOverflow
                                placement="bottom-end"
                                flat={true}
                                content={
                                    <>
                                        {(chat.role === 'OWNER' ||
                                            chat.role === 'ADMIN') && (
                                            <XMenuItem
                                                query={{
                                                    field: 'editChat',
                                                    value: 'true',
                                                }}
                                            >
                                                Settings
                                            </XMenuItem>
                                        )}
                                        <XMenuItem
                                            query={{
                                                field: 'leaveFromChat',
                                                value: chat.id,
                                            }}
                                            style="danger"
                                        >
                                            Leave room
                                        </XMenuItem>
                                        <XWithRole role="super-admin">
                                            <XMenuItemSeparator />
                                            <AdminTools
                                                id={chat.id}
                                                variables={{ id: chat.id }}
                                            />
                                        </XWithRole>
                                    </>
                                }
                            />
                            <LeaveChatComponent />
                            <RoomEditComponent
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
                                target={
                                    <EditButton text="Add a short description" />
                                }
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
}) => {
    let overflowMenu = (
        <XOverflow
            placement="bottom-end"
            flat={true}
            content={
                <XMenuItem
                    style="danger"
                    query={{ field: 'remove', value: props.member.user.id }}
                >
                    Remove from group
                </XMenuItem>
            }
        />
    );
    return (
        <XUserCard
            user={props.member.user}
            customMenu={props.meOwner ? overflowMenu : null}
        />
    );
};

const RequestCard = withRoomMembersMgmt(
    (props: {
        member: RoomFull_SharedRoom_requests;
        meOwner: boolean;
        roomId: string;
    }) => {
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

const MembersProvider = (props: MembersProviderProps & XWithRouter) => {
    let members = props.members;
    if (members && members.length > 0) {
        let tab: 'requests' | 'members' =
            props.router.query.requests === '1' &&
            (props.requests || []).length > 0
                ? 'requests'
                : 'members';
        return (
            <Section separator={0}>
                {props.meOwner &&
                    (props.requests || []).length > 0 && (
                        <XSwitcher style="button">
                            <XSwitcher.Item
                                query={{ field: 'requests' }}
                                counter={props.members.length}
                            >
                                Members
                            </XSwitcher.Item>
                            <XSwitcher.Item
                                query={{ field: 'requests', value: '1' }}
                                counter={props.requests!.length}
                            >
                                Requests
                            </XSwitcher.Item>
                        </XSwitcher>
                    )}
                {((props.requests || []).length === 0 || !props.meOwner) && (
                    <XSubHeader
                        title={'Members'}
                        counter={members.length}
                        paddingBottom={0}
                    />
                )}

                <SectionContent>
                    {tab === 'members' && (
                        <>
                            {props.kind === 'PUBLIC' && (
                                <InviteMembersModal
                                    channelTitle={props.chatTitle}
                                    roomId={props.chatId}
                                    target={
                                        <XCreateCard text="Invite people" />
                                    }
                                />
                            )}

                            {members.map((member, i) => (
                                <MemberCard
                                    key={i}
                                    member={member}
                                    meOwner={props.meOwner}
                                />
                            ))}
                        </>
                    )}

                    {props.meOwner &&
                        tab === 'requests' &&
                        props.requests &&
                        props.requests.map((req, i) => (
                            <RequestCard
                                key={i}
                                member={req}
                                meOwner={props.meOwner}
                                roomId={props.chatId}
                            />
                        ))}
                </SectionContent>
                {props.meOwner && (
                    <>
                        <AddMemberForm roomId={props.chatId} />
                        <RemoveMemberModal
                            members={members}
                            roomId={props.chatId}
                            roomTitle={props.chatTitle}
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
    handlePageTitle?: any;
    onDirectory?: boolean;
    conversationId: string;
}

class RoomGroupProfileInner extends React.Component<
    RoomGroupProfileInnerProps
> {
    pageTitle: string | undefined = undefined;

    constructor(props: RoomGroupProfileInnerProps) {
        super(props);

        if (this.props.handlePageTitle) {
            this.pageTitle = props.chat.title;
            this.props.handlePageTitle(this.pageTitle);
        }
    }

    componentWillReceiveProps(newProps: RoomGroupProfileInnerProps) {
        if (newProps.handlePageTitle) {
            let title = newProps.chat.title;

            if (title !== this.pageTitle) {
                this.pageTitle = title;
                newProps.handlePageTitle(title);
            }
        }
    }

    handleRef = (ref?: any) => {
        if (!ref && this.props.onDirectory) {
            if (this.props.handlePageTitle) {
                this.pageTitle = undefined;
                this.props.handlePageTitle(undefined);
            }
        }
    };

    render() {
        let chat = this.props.chat;
        return (
            <OrganizationInfoWrapper innerRef={this.handleRef}>
                <BackButton />
                <Header chat={chat} />
                <XScrollView2 height="calc(100% - 136px)">
                    <About chat={chat} />
                    <MembersProvider
                        kind={chat.kind}
                        router={this.props.router}
                        members={chat.members}
                        requests={chat.requests}
                        chatId={this.props.conversationId}
                        meOwner={chat.membership === 'MEMBER'}
                        chatTitle={chat.title}
                    />
                </XScrollView2>
            </OrganizationInfoWrapper>
        );
    }
}

const RoomGroupProfileProvider = withRoom(
    withRouter(props => {
        let chat = props.data.room as Room_room_SharedRoom;
        return chat ? (
            <RoomGroupProfileInner
                chat={chat}
                router={props.router}
                handlePageTitle={(props as any).handlePageTitle}
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
    handlePageTitle?: any;
    conversationId: string;
}>;

export const RoomProfile = (props: {
    conversationId: string;
    onDirectory?: boolean;
    handlePageTitle?: any;
}) => (
    <RoomGroupProfileProvider
        variables={{ id: props.conversationId }}
        handlePageTitle={props.handlePageTitle}
        onDirectory={props.onDirectory}
        conversationId={props.conversationId}
    />
);
