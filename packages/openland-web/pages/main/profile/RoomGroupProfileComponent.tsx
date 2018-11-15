import * as React from 'react';
import Glamorous from 'glamorous';
import { withGroupRoom } from '../../../api/withGroupRoom';
import { XVertical } from 'openland-x-layout/XVertical';
import { XAvatar } from 'openland-x/XAvatar';
import { XSubHeader } from 'openland-x/XSubHeader';
import { XIcon } from 'openland-x/XIcon';
import { withRouter } from 'next/router';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView } from 'openland-x/XScrollView';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import {
    GroupRoomInfo_chat_GroupConversation,
    GroupRoomInfo_chat_ChannelConversation
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
                <HeaderInfo flexGrow={1} separator={0}>
                    <HeaderTitle>{chat.title}</HeaderTitle>
                </HeaderInfo>
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

const OrgInfoWrapper = Glamorous.div({
    overflow: 'hidden',
    height: '100%'
});

interface OrganizationProfileInnerProps extends XWithRouter {
    chat: GroupRoomInfo_chat_GroupConversation | GroupRoomInfo_chat_ChannelConversation;
    handlePageTitle?: any;
    onDirectory?: boolean;
}

class RoomGroupProfileInner extends React.Component<OrganizationProfileInnerProps> {
    pageTitle: string | undefined = undefined;

    constructor(props: OrganizationProfileInnerProps) {
        super(props);

        if (this.props.handlePageTitle) {
            this.pageTitle = props.chat.title;
            this.props.handlePageTitle(this.pageTitle);
        }
    }

    componentWillReceiveProps(newProps: OrganizationProfileInnerProps) {
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
                    {/* <Members chat={chat} /> */}
                </XScrollView>
            </OrgInfoWrapper>
        );
    }
}

const OrganizationProvider = withGroupRoom(withRouter((props) => {
    
    let chat = props.data.chat as GroupRoomInfo_chat_GroupConversation | GroupRoomInfo_chat_ChannelConversation;

    return (
        chat
            ? (
                <RoomGroupProfileInner
                    chat={chat}
                    router={props.router}
                    handlePageTitle={(props as any).handlePageTitle}
                    onDirectory={(props as any).onDirectory}
                />
            )
            : <XLoader loading={true} />
    )
})) as React.ComponentType<{ variables: { conversationId: string }, onDirectory?: boolean; handlePageTitle?: any }>;

export const RoomGroupProfile = (props: { conversationId: string, onDirectory?: boolean; handlePageTitle?: any }) => (
    <OrganizationProvider
        variables={{ conversationId: props.conversationId }}
        handlePageTitle={props.handlePageTitle}
        onDirectory={props.onDirectory}
    />
);