import * as React from 'react';
import Glamorous from 'glamorous';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { withApp } from '../../../components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { MessengerFragment } from '../../../fragments/MessengerFragment';
import { DialogListFragment } from '../../../fragments/dialogs/DialogListFragment';
import { ComposeFragment } from '../../../fragments/ComposeFragment';
import { RoomsExploreComponent } from '../../../fragments/RoomsExploreComponent';
import { MessengerEmptyFragment } from '../../../fragments/MessengerEmptyFragment';
import { RoomsInviteComponent } from '../../../fragments/RoomsInviteComponent';
import { OrganizationProfile } from '../profile/OrganizationProfileComponent';
import { RoomProfile } from '../profile/RoomProfileComponent';
import { UserProfile } from '../profile/UserProfileComponent';
import { withChannelInviteInfo } from '../../../api/withChannelInviteInfo';
import { XLoader } from 'openland-x/XLoader';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XThemeDefault } from 'openland-x/XTheme';
import { withRouter } from 'openland-x-routing/withRouter';
import { XRouter } from 'openland-x-routing/XRouter';
import {
    MessagesStateContext,
    MessagesStateContextProps,
} from '../../../components/messenger/components/MessagesStateContext';
import { MessageFull } from 'openland-api/Types';

export const ChatContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    maxHeight: '100%',
    width: '100%',
    flexGrow: 1,
    flexShrink: 0,
    overflow: 'hidden',
});

export const ConversationContainer = Glamorous.div({
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
    },
});

export const OrganizationProfileContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    flexShrink: 0,
});

export const RoomInviteFromLink = withChannelInviteInfo(
    props =>
        props.data && props.data.invite ? (
            props.data.invite.room.membership === 'MEMBER' ? (
                <XPageRedirect path={'/mail/' + props.data.invite.room.id} />
            ) : (
                    <RoomsInviteComponent
                        inviteLink={props.router.routeQuery.invite}
                        room={props.data.invite.room as any}
                        invite={props.data.invite}
                    />
                )
        ) : (
                <XLoader loading={true} />
            ),
);

interface MessagePageInnerState extends MessagesStateContextProps { }

class MessagePageInner extends React.Component<{ router: XRouter }, MessagePageInnerState> {
    constructor(props: { router: XRouter }) {
        super(props);

        this.state = {
            editMessageId: null,
            editMessage: null,
            forwardMessagesId: null,
            selectedMessages: new Set(),
            replyMessagesId: null,
            replyMessages: null,
            replyMessagesSender: null,
            useForwardMessages: false,
            useForwardPlaceholder: false,
            useForwardHeader: false,
            setEditMessage: this.setEditMessage,
            setForwardMessages: this.setForwardMessages,
            forwardMessages: this.forwardMessages,
            setReplyMessages: this.setReplyMessages,
            changeForwardConverstion: this.changeForwardConverstion,
            resetAll: this.resetAll,
            switchMessageSelect: this.switchMessageSelect,
        };
    }

    componentWillReceiveProps(nextProps: { router: XRouter }) {
        if (
            this.props.router.routeQuery.conversationId !==
            nextProps.router.routeQuery.conversationId &&
            !this.state.useForwardMessages
        ) {
            this.state.resetAll();
        }
    }

    private switchMessageSelect = (message: MessageFull) => {
        let res = new Set(this.state.selectedMessages);
        if (res.has(message)) {
            res.delete(message);
        } else {
            res.add(message);
        }
        this.setState({
            selectedMessages: res,
        });
    };

    private setEditMessage = (id: string | null, message: string | null) => {
        this.setState({
            editMessageId: id,
            editMessage: message,
        });
    };

    private setForwardMessages = (id: Set<string> | null) => {
        let useHeader = false;
        if (id && id.size > 0) {
            useHeader = true;
        }
        this.setState({
            forwardMessagesId: id,
            useForwardHeader: useHeader,
        });
    };

    private forwardMessages = () => {
        this.setState({
            useForwardMessages: true,
            useForwardPlaceholder: true,
            useForwardHeader: false,
        });
    };

    private setReplyMessages = (
        id: Set<string> | null,
        messages: Set<string> | null,
        sender: Set<string> | null,
    ) => {
        this.setState({
            replyMessagesId: id,
            replyMessages: messages,
            replyMessagesSender: sender,
            forwardMessagesId: null,
        });
    };

    private changeForwardConverstion = () => {
        this.setState({
            useForwardPlaceholder: false,
            useForwardHeader: false,
        });
    };

    private resetAll = () => {
        this.setState({
            editMessageId: null,
            editMessage: null,
            forwardMessagesId: null,
            selectedMessages: new Set(),
            replyMessagesId: null,
            replyMessages: null,
            replyMessagesSender: null,
            useForwardMessages: false,
            useForwardPlaceholder: false,
            useForwardHeader: false,
        });
    };

    render() {
        let { props, state } = this;

        let isCompose = props.router.path.endsWith('/new');
        let pageTitle = isCompose ? 'New chat' : undefined;

        if (!canUseDOM) {
            return (
                <>
                    <XDocumentHead title={pageTitle} />
                    <Scaffold>{}</Scaffold>
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

        let tab:
            | 'empty'
            | 'conversation'
            | 'compose'
            | 'rooms'
            | 'invite'
            | 'organization'
            | 'user'
            | 'conference'
            | 'chat' =
            'empty';

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
                        <MessagesStateContext.Provider value={this.state}>
                            <ChatContainer>
                                <DialogListFragment />

                                <ConversationContainer>
                                    {tab === 'compose' && <ComposeFragment />}
                                    {tab === 'empty' && <MessengerEmptyFragment />}
                                    {tab === 'conversation' && (<MessengerFragment id={props.router.routeQuery.conversationId} />)}
                                    {tab === 'rooms' && <RoomsExploreComponent />}
                                    {tab === 'invite' && <RoomInviteFromLink />}
                                    {tab === 'organization' && (
                                        <OrganizationProfileContainer>
                                            <OrganizationProfile organizationId={oid} />
                                        </OrganizationProfileContainer>
                                    )}
                                    {tab === 'user' && (
                                        <OrganizationProfileContainer>
                                            <UserProfile userId={uid} />
                                        </OrganizationProfileContainer>
                                    )}
                                    {tab === 'chat' && (
                                        <OrganizationProfileContainer>
                                            <RoomProfile conversationId={cid} />
                                        </OrganizationProfileContainer>
                                    )}
                                </ConversationContainer>
                            </ChatContainer>
                        </MessagesStateContext.Provider>
                    </Scaffold.Content>
                </Scaffold>
            </>
        );
    }
}

export default withApp(
    'Mail',
    'viewer',
    withRouter(
        withQueryLoader(props => {
            return <MessagePageInner router={props.router} />;
        }),
    ),
);
