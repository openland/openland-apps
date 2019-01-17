import * as React from 'react';
import Glamorous from 'glamorous';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { withQueryLoader } from 'openland-web/components/withQueryLoader';
import { Menu } from 'openland-web/components/MainLayout';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from 'openland-web/components/Scaffold';
import {
    MessagesStateContext,
    MessagesStateContextProps,
} from 'openland-web/components/messenger/MessagesStateContext';
import { MobileSidebarContext } from 'openland-web/components/Scaffold';
import { MessengerFragment } from 'openland-web/fragments/MessengerFragment';
import { DialogListFragment } from 'openland-web/fragments/dialogs/DialogListFragment';
import { ComposeFragment } from 'openland-web/fragments/ComposeFragment';
import { RoomsExploreComponent } from 'openland-web/fragments/RoomsExploreComponent';
import { MessengerEmptyFragment } from 'openland-web/fragments/MessengerEmptyFragment';
import { RoomsInviteComponent } from 'openland-web/fragments/RoomsInviteComponent';
import { OrganizationProfile } from '../profile/OrganizationProfileComponent';
import { RoomProfile } from '../profile/RoomProfileComponent';
import { UserProfile } from '../profile/UserProfileComponent';
import { withChannelInviteInfo } from 'openland-web/api/withChannelInviteInfo';
import { XLoader } from 'openland-x/XLoader';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XThemeDefault } from 'openland-x/XTheme';
import { withRouter } from 'openland-x-routing/withRouter';
import { XRouter } from 'openland-x-routing/XRouter';
import { MessageFull } from 'openland-api/Types';

export const ConversationContainer = Glamorous.div({
    justifyContent: 'center',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 0,
    minWidth: 0,
    overflow: 'hidden',
    backgroundColor: XThemeDefault.backgroundColor,
    maxWidth: 'calc(100% - 344px)',
    '@media (max-width: 1100px)': {
        width: 'calc(100% - 300px)',
        maxWidth: 'calc(100% - 300px)',
    },
    '@media (max-width: 950px)': {
        width: 'calc(100% - 230px)',
        maxWidth: 'calc(100% - 230px)',
    },
});

export const OrganizationProfileContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    flexShrink: 0,
});

export const RoomInviteFromLink = withChannelInviteInfo(props =>
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

interface MessagePageProps {
    router: XRouter;
    userId?: string;
    organizationId?: string;
}

const containerStyle = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 344px;
    flex-shrink: 0;
    border-right-width: 1px;
    border-right-style: solid;
    border-right-color: #ececec;
    @media (max-width: 1100px) {
        width: 300px;
    }
    @media (max-width: 950px) {
        width: 230px;
    }
`;

const DesktopDialogContainer = ({ children }: { children: any }) => {
    return <div className={containerStyle}>{children}</div>;
};

const MobileDialogContainer = ({ children }: { children: any }) => {
    return <XView width="100%">{children}</XView>;
};

const MessagePageInner = ({ tab, conversationId, oid, uid, cid }: any) => {
    const { isMobile } = React.useContext(MobileSidebarContext);

    const DialogContainer = isMobile ? MobileDialogContainer : DesktopDialogContainer;
    return (
        <XView
            flexDirection="row"
            flexGrow={1}
            flexShrink={0}
            overflow="hidden"
            alignItems="stretch"
            height="100vh"
            width="100%"
        >
            <DialogContainer>
                <DialogListFragment />
            </DialogContainer>
            {!isMobile && (
                <ConversationContainer>
                    {tab === 'compose' && <ComposeFragment />}
                    {tab === 'empty' && <MessengerEmptyFragment />}
                    {tab === 'conversation' && <MessengerFragment id={conversationId} />}
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
            )}
        </XView>
    );
};

class MessagePage extends React.PureComponent<MessagePageProps, MessagesStateContextProps> {
    constructor(props: MessagePageProps) {
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

    componentWillReceiveProps(nextProps: MessagePageProps) {
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
        let { props } = this;

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
        let oid = props.organizationId || props.router.routeQuery.organizationId;
        let uid = props.userId || props.router.routeQuery.userId;

        let tab:
            | 'empty'
            | 'conversation'
            | 'compose'
            | 'rooms'
            | 'invite'
            | 'organization'
            | 'user'
            | 'conference'
            | 'chat' = 'empty';

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
                            <MessagePageInner
                                tab={tab}
                                conversationId={props.router.routeQuery.conversationId}
                                oid={oid}
                                uid={uid}
                                cid={cid}
                            />
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
            return <MessagePage router={props.router} />;
        }),
    ),
);
