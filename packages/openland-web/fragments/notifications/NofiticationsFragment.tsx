import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import {
    DataSourceRender,
    ScrollTo,
} from 'openland-web/fragments/chat/messenger/view/DataSourceRender';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView3, XScrollValues } from 'openland-x/XScrollView3';
import glamorous from 'glamorous';
import {
    DataSourceWebMessageItem,
    buildMessagesDataSource,
    DataSourceWebDateItem,
} from 'openland-web/fragments/chat/messenger/data/WebMessageItemDataSource';
import { DataSourceDateItem } from 'openland-engines/messenger/ConversationEngine';
import { MessageComponent } from 'openland-web/fragments/chat/messenger/message/MessageComponent';
import { openCommentsModal } from 'openland-web/fragments/chat/messenger/message/content/comments/CommentsModalInner';
import { MessengerEmptyFragment } from 'openland-web/fragments/chat/MessengerEmptyFragment';
import { NotificationCenterEngine } from 'openland-engines/NotificationCenterEngine';
import { DataSource } from 'openland-y-utils/DataSource';
import { UHeader } from 'openland-unicorn/UHeader';

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

class CommentsNotificationsInner extends React.PureComponent<
    CommentsNotificationsProps,
    { dataSourceGeneration: number }
    > {
    private unmount?: () => void;
    private unmount1?: () => void;
    private dataSource: DataSource<DataSourceWebMessageItem | DataSourceWebDateItem>;

    constructor(props: CommentsNotificationsProps) {
        super(props);

        this.dataSource = buildMessagesDataSource(this.props.engine.dataSource);
        this.state = { dataSourceGeneration: 0 };
    }

    componentWillMount() {
        this.unmount = this.props.engine.subscribe();
        this.unmount1 = this.dataSource.dumbWatch(() =>
            this.setState({ dataSourceGeneration: this.state.dataSourceGeneration + 1 }),
        );
    }

    componentWillUnmount() {
        if (this.unmount) {
            this.unmount();
        }
        if (this.unmount1) {
            this.unmount1();
        }
    }

    private renderLoading = () => {
        return (
            <LoadingWrapper>
                <XLoader loading={true} />
            </LoadingWrapper>
        );
    }

    private handleScroll = (e: XScrollValues) => {
        if (e.scrollTop < 300) {
            this.dataSource.needMore();
        }
    }

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
    }

    private renderMessage = (i: (DataSourceWebMessageItem | DataSourceDateItem) & ScrollTo) => {
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
    }

    render() {
        if (!this.dataSource.isInited()) {
            return (
                <XView flexGrow={1} flexShrink={0}>
                    <XLoader loading={true} />
                </XView>
            );
        }
        if (this.dataSource.getSize() === 0 && this.dataSource.isInited()) {
            return (
                <XView flexDirection="row" alignItems="center" flexGrow={1}>
                    <MessengerEmptyFragment text="Comments in threads you are involved in will be right here" />
                </XView>
            );
        }

        return (
            <>
                <UHeader title="Notifications" />
                <XView paddingTop={24} flexGrow={1} flexShrink={1}>
                    <DataSourceRender
                        dataSource={this.dataSource}
                        reverce={false}
                        wrapWith={this.dataSourceWrapper}
                        renderItem={this.renderMessage}
                        renderLoading={this.renderLoading}
                    />
                </XView>
            </>
        );
    }
}

export const NotificationsFragment = React.memo(() => {
    const messenger = React.useContext(MessengerContext);

    return <CommentsNotificationsInner engine={messenger.notificationCenter} />;
});
