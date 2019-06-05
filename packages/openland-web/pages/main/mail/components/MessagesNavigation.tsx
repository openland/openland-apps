import * as React from 'react';
import { XView } from 'react-mental';
import { tabs, tabsT } from '../tabs';
import { XShortcuts } from 'openland-x/XShortcuts';
import { DialogListFragment } from 'openland-web/fragments/dialogs/DialogListFragment';
import { ConversationContainerWrapper } from 'openland-web/pages/main/mail/components/ConversationContainerWrapper';
import { ChatHeaderViewLoader } from 'openland-web/fragments/chat/ChatHeaderView';
import { Navigation } from 'openland-web/components/Navigation';
import { NewOptionsButton } from 'openland-web/components/NewOptionsButton';
import { XMemo } from 'openland-y-utils/XMemo';
import { ErrorPage } from 'openland-web/pages/root/ErrorPage';
import { XRoutingContext } from 'openland-x-routing/XRoutingContext';
import { GlobalSearch_items } from 'openland-api/Types';
import { CommentsNotifications } from '../CommentsNotifications';

const getId = (myPath: string, substring: string) => {
    if (!myPath.includes(substring)) {
        return null;
    }
    const result = myPath.split(substring)[1];
    if (result.includes('/')) {
        return null;
    }
    return result;
};

class ErrorBoundary extends React.Component<any, { error: any }> {
    static getDerivedStateFromError(error: any) {
        return { error };
    }

    constructor(props: any) {
        super(props);
        this.state = { error: null };
    }

    componentWillReceiveProps() {
        this.setState({
            error: null,
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorPage statusCode={null} message={this.state.error.message} />;
        }

        return this.props.children;
    }
}

export const MessagesNavigation = XMemo(
    ({
        path,
        cid,
        oid,
        uid,
        isCommentsNotifications,
    }: {
        cid?: string;
        oid?: string;
        uid?: string;
        path?: any;
        isCommentsNotifications: boolean;
    }) => {
        let tab: tabsT = tabs.empty;
        const [selectedChat, setSelectedChat] = React.useState<string | null>(null);

        const { replace } = React.useContext(XRoutingContext)!;

        let isCall = path.endsWith('/call');
        let isOrganizationInvite = path.includes('join') && !path.includes('joinChannel');
        let isRoomInvite = path.includes('joinChannel') || path.includes('invite');
        let isChat = path.includes('/mail');
        let isRoomProfile = path.includes('/mail/p/');
        const chatId =
            selectedChat || (!path.includes('/mail/new') && getId(path, '/mail/')) || cid;

        if (!cid) {
            tab = tabs.empty;
        }

        if (cid) {
            tab = tabs.conversation;
        }

        if (isOrganizationInvite) {
            tab = tabs.organizationInvite;
        }
        if (isRoomInvite) {
            tab = tabs.roomInvite;
        }

        if (isCall) {
            tab = tabs.conference;
        }

        if (oid) {
            tab = tabs.organization;
        }

        if (uid) {
            tab = tabs.user;
        }

        if (cid && isChat) {
            tab = tabs.chat;
        }

        if (cid && isRoomProfile) {
            tab = tabs.roomProfile;
        }

        let elem;
        if (!isCommentsNotifications) {
            elem = (
                <ConversationContainerWrapper
                    {...{ tab, conversationId: chatId, oid, uid, cid: chatId }}
                />
            );
        } else {
            elem = <CommentsNotifications />;
        }

        return (
            <>
                <XShortcuts
                    handlerMap={{
                        ESC: () => {
                            replace('/mail');
                        },
                    }}
                    keymap={{
                        ESC: 'esc',
                    }}
                >
                    <Navigation
                        title="Messages"
                        tab={tab}
                        menuRightContent={<NewOptionsButton />}
                        secondFragmentHeader={
                            <React.Suspense fallback={null}>
                                {chatId && !isRoomProfile && (
                                    <ChatHeaderViewLoader
                                        variables={{
                                            id: chatId,
                                        }}
                                    />
                                )}
                                <XView height={1} backgroundColor="rgba(220, 222, 228, 0.45)" />
                            </React.Suspense>
                        }
                        firstFragment={
                            <DialogListFragment
                                onSearchItemSelected={(item: GlobalSearch_items) => {
                                    setSelectedChat(item ? item.id : null);
                                }}
                            />
                        }
                        secondFragment={
                            <ErrorBoundary>
                                <React.Suspense fallback={null}>{elem}</React.Suspense>
                            </ErrorBoundary>
                        }
                    />
                </XShortcuts>
            </>
        );
    },
);
