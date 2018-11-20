import * as React from 'react';
import Glamorous from 'glamorous';
import { withGroupRoom, withGroupRoomMembers } from '../../../api/withGroupRoom';
import { withAlterChat } from '../../../api/withAlterChat';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatar } from 'openland-x/XAvatar';
import { XSubHeader } from 'openland-x/XSubHeader';
import { withRouter } from 'next/router';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { XButton } from 'openland-x/XButton';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView } from 'openland-x/XScrollView';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XFormField } from 'openland-x-forms/XFormField';
import { XTextArea } from 'openland-x/XTextArea';
import { XUserCard } from 'openland-x/cards/XUserCard';
import { XMenuItem } from 'openland-x/XMenuItem';
import { sanitizeIamgeRef } from 'openland-y-utils/sanitizeImageRef';
import { XOverflow } from '../../../components/Incubator/XOverflow';
import { LeaveChatComponent } from '../../../components/messenger/components/MessengerRootComponent';
import { RemoveMemberModal } from '../modals/membersComponent';
import { XCreateCard } from 'openland-x/cards/XCreateCard';
import {
    AddMemberForm,
    RoomEditComponent,
    GroupEditComponent
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
    EditButton
} from './OrganizationProfileComponent';
import {
    GroupRoomInfo_chat_GroupConversation,
    GroupRoomInfo_chat_ChannelConversation,
    GroupRoomMembersInfo_members_user,
    GroupRoomMembersInfo_members
} from 'openland-api/Types';

const HeaderMembers = Glamorous.div<{ online?: boolean }>(props => ({
    fontSize: 13,
    lineHeight: 1.23,
    color: props.online ? '#1790ff' : '#7F7F7F'
}));

const Header = (props: { chat: GroupRoomInfo_chat_GroupConversation | GroupRoomInfo_chat_ChannelConversation }) => {
    let chat = props.chat;
    let meOwner = (chat.myRole === 'member' || chat.myRole === 'owner');
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
                        <HeaderMembers>{chat.membersCount} members</HeaderMembers>
                        {chat.membersOnline > 0 && <HeaderMembers online={true}>{chat.membersOnline} online</HeaderMembers>}
                    </XHorizontal>
                </HeaderInfo>
                <HeaderTools separator={8}>
                    <XButton
                        text={meOwner ? 'View' : 'Request invite'}
                        style="primary"
                        path={meOwner ? '/mail/' + chat.id : '/directory/r/' + chat.id}
                    />
                    {meOwner && (
                        <>
                            <XOverflow
                                placement="bottom-end"
                                flat={true}
                                content={(
                                    <>
                                        <XMenuItem query={{ field: 'editChat', value: 'true' }}>Settings</XMenuItem>
                                        <XMenuItem query={{ field: 'leaveFromChat', value: chat.id }} style="danger">Leave chat</XMenuItem>
                                    </>
                                )}
                            />
                            <LeaveChatComponent />
                            {chat.__typename === 'GroupConversation' && (
                                <GroupEditComponent
                                    title={chat.title}
                                    description={chat.description}
                                    longDescription={chat.longDescription || undefined}
                                    photoRef={chat.photoRef}
                                    refetchVars={{ conversationId: chat.id }}
                                />
                            )}
                            {chat.__typename === 'ChannelConversation' && (
                                <RoomEditComponent
                                    title={chat.title}
                                    description={chat.description}
                                    longDescription={chat.longDescription}
                                    socialImageRef={null}
                                    photoRef={chat.photoRef}
                                    refetchVars={{ conversationId: chat.id }}
                                />
                            )}
                        </>
                    )}
                </HeaderTools>
            </XContentWrapper>
        </HeaderWrapper>
    );
};

const AboutPlaceholder = withAlterChat((props) => {
    let editTitle = (props as any).title;
    let editDescription = (props as any).description;
    let editPhotoRef = (props as any).photoRef;
    let editSocialImageRef = (props as any).socialImageRef;
    let editLongDescription = (props as any).longDescription;
    return (
        <XModalForm
            scrollableContent={true}
            target={(props as any).target}
            useTopCloser={true}
            title="Room settings"
            defaultAction={(data) => {
                let newTitle = data.input.title;
                let newDescription = data.input.description;
                let newPhoto = data.input.photoRef;
                let newSocialImage = data.input.socialImageRef;
                let newLongDescription = data.input.longDescription;

                props.alter({
                    variables: {
                        input: {
                            ...newTitle !== editTitle ? { title: newTitle } : {},
                            ...newDescription !== editDescription ? { description: newDescription } : {},
                            ...newLongDescription !== editLongDescription ? { longDescription: newLongDescription } : {},
                            ...newPhoto !== editPhotoRef ? { photoRef: newPhoto } : {},
                            ...newSocialImage !== editSocialImageRef ? { socialImageRef: newSocialImage } : {}
                        }
                    }
                });
            }}
            defaultData={{
                input: {
                    title: (props as any).title || '',
                    description: (props as any).description || '',
                    longDescription: (props as any).longDescription || '',
                    photoRef: sanitizeIamgeRef((props as any).photoRef),
                    socialImageRef: sanitizeIamgeRef((props as any).socialImageRef)
                }
            }}
        >
            <XVertical>
                <XFormLoadingContent>
                    <XFormField field="fields.input.description">
                        <XTextArea valueStoreKey="fields.input.description" placeholder="Description" resize={false} />
                    </XFormField>
                </XFormLoadingContent>
            </XVertical>
        </XModalForm>
    );
}) as React.ComponentType<{ target: any, title: string, photoRef: any, description: string | null, longDescription: string | null, socialImageRef: any, refetchVars: { conversationId: string } }>;

const About = (props: { chat: GroupRoomInfo_chat_GroupConversation | GroupRoomInfo_chat_ChannelConversation }) => {
    let chat = props.chat;
    let meOwner = chat.myRole === 'member' || chat.myRole === 'owner';
    return (
        <>
            {chat.description && (
                <Section separator={0}>
                    <XSubHeader
                        title="About"
                        paddingBottom={0}
                    />
                    <SectionContent>
                        {chat.description}
                    </SectionContent>
                </Section>
            )}
            {!chat.description && meOwner && (
                <Section separator={0}>
                    <XSubHeader title="About" paddingBottom={0} />
                    <SectionContent>
                        <AboutPlaceholder 
                            title={chat.title} 
                            description={chat.description} 
                            longDescription={chat.longDescription} 
                            socialImageRef={(chat as any).socialImageRef || null} 
                            photoRef={chat.photoRef} 
                            refetchVars={{ conversationId: chat.id }}
                            target={<EditButton text="Add a short description" />}
                        />
                    </SectionContent>
                </Section>
            )}
        </>
    );
};

const MemberCard = (props: { member: GroupRoomMembersInfo_members_user, meOwner: boolean }) => {
    let overflowMenu = (
        <XOverflow
            placement="bottom-end"
            flat={true}
            content={<XMenuItem style="danger" query={{ field: 'remove', value: props.member.id }}>Remove from group</XMenuItem>}
        />
    );
    return (
        <XUserCard
            user={props.member}
            customMenu={props.meOwner ? overflowMenu : null}
        />
    );
};

interface MembersProviderProps {
    members: GroupRoomMembersInfo_members[];
    isRoom: boolean;
    chatId: string;
    meOwner: boolean;
    chatTitle: string;
}

const MembersProvider = (props: MembersProviderProps) => {
    let members = props.members;
    if (members && members.length > 0) {
        return (
            <Section separator={0}>
                <XSubHeader
                    title={'Members'}
                    counter={members.length}
                    paddingBottom={0}
                />
                <SectionContent>
                    {(props.isRoom && props.meOwner) && (
                        <XCreateCard query={{ field: 'addMember', value: 'true' }} text="Invite people" />
                    )}
                    {members.map((member, i) => (
                        <MemberCard key={i} member={member.user} meOwner={props.meOwner} />
                    ))}
                </SectionContent>
                {(props.isRoom && props.meOwner) && (
                    <AddMemberForm channelId={props.chatId} refetchVars={{ conversationId: props.chatId }} />
                )}
                {props.meOwner && (
                    <RemoveMemberModal
                        members={members}
                        refetchVars={{ channelId: props.chatId }}
                        channelId={props.chatId}
                        roomTitle={props.chatTitle}
                    />
                )}
            </Section>
        );
    } else {
        return null;
    }
};

const Members = withGroupRoomMembers((props) => {
    let members = props.data.members;
    return (
        members
            ? (
                <MembersProvider
                    members={members}
                    isRoom={(props as any).isRoom}
                    chatId={(props as any).chatId}
                    meOwner={(props as any).meOwner}
                    chatTitle={(props as any).chatTitle}
                />
            ) : <XLoader loading={true} />
    );
}) as React.ComponentType<{ variables: { conversationId: string }, isRoom: boolean, chatId: string, meOwner: boolean, chatTitle: string }>;

interface RoomGroupProfileInnerProps extends XWithRouter {
    chat: GroupRoomInfo_chat_GroupConversation | GroupRoomInfo_chat_ChannelConversation;
    handlePageTitle?: any;
    onDirectory?: boolean;
    conversationId: string;
}

class RoomGroupProfileInner extends React.Component<RoomGroupProfileInnerProps> {
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
    }

    render() {
        let chat = this.props.chat;
        return (
            <OrganizationInfoWrapper innerRef={this.handleRef}>
                <BackButton />
                <Header chat={chat} />
                <XScrollView height="calc(100% - 136px)">
                    <About chat={chat} />
                    <Members
                        variables={{ conversationId: this.props.conversationId }}
                        isRoom={chat.__typename === 'ChannelConversation'}
                        chatId={this.props.conversationId}
                        meOwner={chat.myRole === 'member' || chat.myRole === 'owner'}
                        chatTitle={chat.title}
                    />
                </XScrollView>
            </OrganizationInfoWrapper>
        );
    }
}

const RoomGroupProfileProvider = withGroupRoom(withRouter((props) => {
    let chat = props.data.chat as GroupRoomInfo_chat_GroupConversation | GroupRoomInfo_chat_ChannelConversation;
    return (
        chat
            ? (
                <RoomGroupProfileInner
                    chat={chat}
                    router={props.router}
                    handlePageTitle={(props as any).handlePageTitle}
                    onDirectory={(props as any).onDirectory}
                    conversationId={(props as any).conversationId}
                />
            )
            : <XLoader loading={true} />
    );
})) as React.ComponentType<{ variables: { conversationId: string }, onDirectory?: boolean; handlePageTitle?: any, conversationId: string }>;

export const RoomGroupProfile = (props: { conversationId: string, onDirectory?: boolean; handlePageTitle?: any }) => (
    <RoomGroupProfileProvider
        variables={{ conversationId: props.conversationId }}
        handlePageTitle={props.handlePageTitle}
        onDirectory={props.onDirectory}
        conversationId={props.conversationId}
    />
);