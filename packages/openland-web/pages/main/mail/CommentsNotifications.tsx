import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { DataSourceRender } from 'openland-web/components/messenger/view/DataSourceRender';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView3, XScrollValues } from 'openland-x/XScrollView3';
import glamorous from 'glamorous';
import {
    DataSourceWebMessageItem,
    buildMessagesDataSource,
    DataSourceWebDateItem,
} from 'openland-web/components/messenger/data/WebMessageItemDataSource';
import { DataSourceDateItem } from 'openland-engines/messenger/ConversationEngine';
import { MessageComponent } from 'openland-web/components/messenger/message/MessageComponent';
import { openCommentsModal } from 'openland-web/components/messenger/message/content/comments/CommentsModalInner';
import { MessengerEmptyFragment } from 'openland-web/fragments/MessengerEmptyFragment';
import {
    NotificationCenterState,
    NotificationCenterStateHandler,
} from 'openland-engines/NotificationCenterState';
import { NotificationCenterEngine } from 'openland-engines/NotificationCenterEngine';
import { DataSource } from 'openland-y-utils/DataSource';

const wrapperClassName = css`
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    @media (min-width: 1150px) {
        width: 674px;
        padding-left: 0px;
        padding-right: 0px;
    }

    flex-grow: 1;
    flex-shrink: 1;
`;

const MessagesWrapper = ({ children }: { children: any }) => {
    return (
        <XView alignItems="center">
            <div className={wrapperClassName}>{children}</div>
        </XView>
    );
};

const LoadingWrapper = glamorous.div({
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
});

interface CommentsNotificationsProps {
    engine: NotificationCenterEngine;
}

interface CommentsNotificationsState {
    state: NotificationCenterState;
}

class CommentsNotificationsInner
    extends React.PureComponent<CommentsNotificationsProps, CommentsNotificationsState>
    implements NotificationCenterStateHandler {
    private unmount: (() => void) | null = null;
    private dataSource: DataSource<DataSourceWebMessageItem | DataSourceWebDateItem>;

    constructor(props: CommentsNotificationsProps) {
        super(props);

        this.dataSource = buildMessagesDataSource(this.props.engine.dataSource);
        this.state = {
            state: this.props.engine.getState(),
        };
    }

    componentWillMount() {
        this.unmount = this.props.engine.subscribe(this);
    }

    componentWillUnmount() {
        if (this.unmount) {
            this.unmount();
            this.unmount = null;
        }
    }

    onNotificationCenterUpdated(state: NotificationCenterState) {
        this.setState({ state });
    }

    private renderLoading = () => {
        return (
            <LoadingWrapper>
                <XLoader loading={true} />
            </LoadingWrapper>
        );
    };

    private handleScroll = (e: XScrollValues) => {
        if (e.scrollTop < 300) {
            this.dataSource.needMore();
        }
    };

    private dataSourceWrapper = (props: { children?: any }) => {
        return (
            <>
                <XScrollView3
                    useDefaultScroll
                    flexGrow={1}
                    flexShrink={1}
                    onScroll={this.handleScroll}
                >
                    <MessagesWrapper>{props.children}</MessagesWrapper>
                </XScrollView3>
            </>
        );
    };

    private renderMessage = (i: DataSourceWebMessageItem | DataSourceDateItem) => {
        const data = i as any;

        return (
            <MessageComponent
                message={data}
                replyQuoteText={data.replyQuoteTextEmojify || data.replyQuoteText}
                room={data.room}
                noSelector
                isCommentNotification
                onCommentNotificationsReplyClick={() => {
                    openCommentsModal({
                        messageId: data.peerRootId,
                        conversationId: data.room.id,
                        selectedCommentMessageId: data.id,
                    });
                }}
            />
        );
    };

    render() {
        const { state } = this.state;

        if (!state.loading && state.notifications.length <= 0) {
            return (
                <XView flexDirection="row" alignItems="center" flexGrow={1}>
                    <MessengerEmptyFragment text="Comments in threads you are involved in will be right here" />
                </XView>
            );
        }

        return (
            <XView paddingTop={24} flexGrow={1} flexShrink={1}>
                <MessagesWrapper>
                    <XView
                        opacity={0.9}
                        fontSize={18}
                        fontWeight={'600'}
                        lineHeight={1.33}
                        color="#000"
                    >
                        Comments
                    </XView>
                </MessagesWrapper>
                <DataSourceRender
                    dataSource={this.dataSource}
                    reverce={false}
                    wrapWith={this.dataSourceWrapper}
                    renderItem={this.renderMessage}
                    renderLoading={this.renderLoading}
                />
            </XView>
        );
    }
}

export const CommentsNotifications = () => {
    const messenger = React.useContext(MessengerContext);

    return <CommentsNotificationsInner engine={messenger.notificationCenter} />;
};
