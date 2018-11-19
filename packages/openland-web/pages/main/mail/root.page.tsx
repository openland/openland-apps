import * as React from 'react';
import Glamorous from 'glamorous';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { withApp } from '../../../components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { MessengerComponent } from '../../../components/messenger/MessengerComponent';
import { ChatsComponent } from '../../../components/messenger/ChatsComponent';
import { MessengerContainer } from '../../../components/messenger/MessengerContainer';
import { ComposeComponent } from '../../../components/messenger/ComposeComponent';
import { XButton } from 'openland-x/XButton';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { RoomsExploreComponent } from '../../../components/messenger/RoomsExploreComponent';
import { MessengerEmptyComponent } from '../../../components/messenger/MessengerEmptyComponent';
import { RoomsInviteComponent } from '../../../components/messenger/RoomsInviteComponent';
import { OrganizationProfile } from '../profile/OrganizationProfileComponent';
import { RoomGroupProfile } from '../profile/RoomGroupProfileComponent';
import { UserProfile } from '../profile/UserProfileComponent';
import { withChannelInviteInfo } from '../../../api/withChannelInviteInfo';
import { XLoader } from 'openland-x/XLoader';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import PlusIcon from '../../../components/icons/ic-add-medium-2.svg';
import { XFont } from 'openland-x/XFont';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XThemeDefault } from 'openland-x/XTheme';
import { withRouter } from 'openland-x-routing/withRouter';
import { XRouter } from 'openland-x-routing/XRouter';

export let ChatContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    maxHeight: '100%',
    width: '100%',
    flexGrow: 1,
    flexShrink: 0,
    overflow: 'hidden',
    position: 'absolute'
});

export let ChatListContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: 344,
    flexShrink: 0,
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: XThemeDefault.separatorColor,
    backgroundColor: XThemeDefault.backgroundColor,
    '@media (max-width: 1100px)': {
        width: 300
    },
    '@media (max-width: 950px)': {
        width: 230
    }
});

export let ConversationContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 0,
    height: '100%',
    maxHeight: '100vh',
    width: 'calc(100% - 344px)',
    backgroundColor: XThemeDefault.backgroundColor,
    justifyContent: 'center',
    position: 'relative',
    '@media (max-width: 1100px)': {
        width: 'calc(100% - 300px)',
    },
    '@media (max-width: 950px)': {
        width: 'calc(100% - 230px)',
    }
});

export const Header = Glamorous(XHorizontal)({
    height: 48,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 4,
    marginBottom: 3,
    flexShrink: 0,
});

export const Title = Glamorous.div({
    ...XFont.h600
});

export const OrganizationProfilContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    flexShrink: 0
});

export const RoomInviteFromLink = withChannelInviteInfo((props) => (
    props.data && props.data.invite
        ? props.data.invite.channel.myStatus === 'member'
            ? <XPageRedirect path={'/mail/' + props.data.invite.channel.id} />
            : <RoomsInviteComponent inviteLink={props.router.routeQuery.uuid} room={props.data.invite.channel} invite={props.data.invite} />
        : <XLoader loading={true} />
));

export const AddButton = Glamorous(XButton)({
    '& svg > g > path': {
        transition: 'all .2s'
    },
    '& svg > g > path:last-child': {
        fill: '#1790ff',
        opacity: 0.5
    }
});

class ChatListContainerWrapper extends React.PureComponent<{ emptyState: boolean }> {
    render() {
        const emptyState = this.props.emptyState;
        return (
            <ChatListContainer>
                <Header alignItems="center" justifyContent="space-between">
                    <Title>Messages</Title>
                    <AddButton
                        style="light"
                        path="/mail/new"
                        text="New"
                        icon={<PlusIcon />}
                        size="small"
                    />
                </Header>
                <ChatsComponent emptyState={emptyState} />
            </ChatListContainer>
        );
    }
}

class MessagePageInner extends React.PureComponent<{ router: XRouter }, { pageTitle: string | undefined }> {
    state = {
        pageTitle: undefined
    };

    handlePageTitle = (title?: string) => {
        this.setState({
            pageTitle: title
        });
    }

    render() {
        let { props, state } = this;

        let isCompose = props.router.path.endsWith('/new');
        let pageTitle = isCompose ? 'New chat' : state.pageTitle;

        if (!canUseDOM) {
            return (
                <>
                    <XDocumentHead title={pageTitle} />
                    <Scaffold>
                        {}
                    </Scaffold>
                </>
            );
        }

        let isRooms = props.router.path.endsWith('/channels');
        let isCall = props.router.path.endsWith('/call');
        let isInvite = props.router.path.includes('joinChannel');
        let isChat = props.router.path.includes('/p/');
        let cid = props.router.routeQuery.conversationId;
        let oid = props.router.routeQuery.organizationId;
        let uid = props.router.routeQuery.userId;

        let tab: 'empty' | 'conversation' | 'compose' | 'rooms' | 'invite' | 'organization' | 'user' | 'conference' | 'chat' = 'empty';

        if (isCompose) {
            tab = 'compose';
        }

        if (!isCompose && !cid) {
            tab = 'empty';
        }

        if (!isCompose && cid) {
            tab = 'conversation';
        }

        if (isInvite) {
            tab = 'invite';
        }

        if (isRooms) {
            tab = 'rooms';
        }

        if (isCall) {
            tab = 'conference';
        }

        if (oid) {
            tab = 'organization';
        }

        if (uid) {
            tab = 'user';
        }

        if (cid && isChat) {
            tab = 'chat';
        }

        if (tab === 'empty') {
            pageTitle = undefined;
        }

        return (
            <>
                <XDocumentHead title={pageTitle} />
                <Scaffold>
                    <Scaffold.Content padding={false} bottomOffset={false}>
                        <ChatContainer>
                            <ChatListContainerWrapper emptyState={tab === 'empty'} />

                            <ConversationContainer>
                                {tab === 'compose' && (
                                    <MessengerContainer>
                                        <ComposeComponent />
                                    </MessengerContainer>
                                )}
                                {tab === 'empty' && (
                                    <MessengerEmptyComponent />
                                )}
                                {tab === 'conversation' && (
                                    <MessengerComponent conversationId={props.router.routeQuery.conversationId} handlePageTitle={this.handlePageTitle} />
                                )}
                                {tab === 'rooms' && (
                                    <RoomsExploreComponent />
                                )}
                                {tab === 'invite' && (
                                    <RoomInviteFromLink />
                                )}
                                {tab === 'organization' && (
                                    <OrganizationProfilContainer>
                                        <OrganizationProfile organizationId={oid} handlePageTitle={this.handlePageTitle} />
                                    </OrganizationProfilContainer>
                                )}
                                {tab === 'user' && (
                                    <OrganizationProfilContainer>
                                        <UserProfile userId={uid} handlePageTitle={this.handlePageTitle} />
                                    </OrganizationProfilContainer>
                                )}
                                {tab === 'chat' && (
                                    <OrganizationProfilContainer>
                                        <RoomGroupProfile conversationId={cid} handlePageTitle={this.handlePageTitle} />
                                    </OrganizationProfilContainer>
                                )}
                            </ConversationContainer>
                        </ChatContainer>
                    </Scaffold.Content>
                </Scaffold>
            </>
        );
    }
}

export default withApp('Mail', 'viewer', withRouter(withQueryLoader((props) => {
    return <MessagePageInner router={props.router} />;
})));