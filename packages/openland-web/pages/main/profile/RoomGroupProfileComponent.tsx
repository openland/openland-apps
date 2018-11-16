import * as React from 'react';
import Glamorous from 'glamorous';
import { withGroupRoom } from '../../../api/withGroupRoom';
import { withGroupRoomMembers } from '../../../api/withGroupRoom';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XAvatar } from 'openland-x/XAvatar';
import { XSubHeader } from 'openland-x/XSubHeader';
import { XIcon } from 'openland-x/XIcon';
import { withRouter } from 'next/router';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { XButton, XButtonProps } from 'openland-x/XButton';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView } from 'openland-x/XScrollView';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XMoreCards } from 'openland-x/cards/XMoreCards';
import { XUserCard } from 'openland-x/cards/XUserCard';
import {
    GroupRoomInfo_chat_GroupConversation,
    GroupRoomInfo_chat_ChannelConversation,
    GroupRoomMembersInfo_members_user,
    GroupRoomMembersInfo_members
} from 'openland-api/Types';

const BackWrapper = Glamorous.div({
    background: '#f9f9f9',
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    cursor: 'pointer',
});

const BackInner = Glamorous(XContentWrapper)({
    alignItems: 'center',
    paddingTop: 13,
    paddingBottom: 12,
    '& i': {
        fontSize: 20,
        marginRight: 6,
        marginLeft: -7,
        color: 'rgba(0, 0, 0, 0.3)'
    },
    '& span': {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: 0,
        color: 'rgba(0, 0, 0, 0.8)'
    }
});

export const BackButton = () => (
    <BackWrapper onClick={() => (canUseDOM ? window.history.back() : null)}>
        <BackInner withFlex={true}>
            <XIcon icon="chevron_left" />
            <span>Back</span>
        </BackInner>
    </BackWrapper>
);

export const HeaderWrapper = Glamorous.div({
    borderBottom: '1px solid #ececec',
    paddingTop: 16,
    paddingBottom: 16
});

const HeaderAvatar = Glamorous.div({
    paddingRight: 18
});

const HeaderInfo = Glamorous(XVertical)({
    paddingTop: 1,
    justifyContent: 'center'
});

const HeaderTitle = Glamorous.div({
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: '20px',
    color: '#000000'
});

const HeaderMembers = Glamorous.div<{online?: boolean}>(props => ({
    fontSize: 13,
    lineHeight: 1.23,
    color: props.online ? '#1790ff' : '#7F7F7F'
}));

const HeaderTools = Glamorous(XHorizontal)({
    paddingTop: 13
});

export const Section = Glamorous(XVertical)({
    paddingTop: 5,
    borderBottom: '1px solid #ececec',
    '&:last-child': {
        borderBottom: 'none'
    }
});

export const SectionContent = Glamorous(XContentWrapper)({
    paddingTop: 7,
    paddingBottom: 24,
    fontSize: 14,
    lineHeight: '22px',
    letterSpacing: 0,
    color: '#000000'
});

const Header = (props: { chat: GroupRoomInfo_chat_GroupConversation | GroupRoomInfo_chat_ChannelConversation }) => {
    let chat = props.chat;

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
                    {chat.myRole !== 'member' ? (
                        <XButton
                            text="Request invite"
                            style="primary"
                            path={'/directory/r/' + chat.id}
                        />
                    ) : (
                        <XButton
                            text="View"
                            style="primary"
                            path={'/mail/' + chat.id}
                        />
                    )}
                </HeaderTools>
            </XContentWrapper>
        </HeaderWrapper>
    );
};

const About = (props: { chat: GroupRoomInfo_chat_GroupConversation | GroupRoomInfo_chat_ChannelConversation }) => {
    let chat = props.chat;
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
        </>
    );
};

const MemberCard = (props: {member: GroupRoomMembersInfo_members_user}) => {
    return (
        <XUserCard
            user={props.member}
        />
    );
};

const MembersProvider = (props: { members: GroupRoomMembersInfo_members[]; }) => {
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
                    <XMoreCards>
                        {members.map((member, i) => (
                            <MemberCard key={i} member={member.user} />
                        ))}
                    </XMoreCards>
                </SectionContent>
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
            ? <MembersProvider members={members}/>
            : <XLoader loading={true} />
    );
}) as React.ComponentType<{ variables: { conversationId: string } }>;

const OrgInfoWrapper = Glamorous.div({
    overflow: 'hidden',
    height: '100%'
});

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
            <OrgInfoWrapper innerRef={this.handleRef}>
                <BackButton />
                <Header chat={chat} />
                <XScrollView height="calc(100% - 136px)">
                    <About chat={chat} />
                    <Members variables={{conversationId: this.props.conversationId}} />
                </XScrollView>
            </OrgInfoWrapper>
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