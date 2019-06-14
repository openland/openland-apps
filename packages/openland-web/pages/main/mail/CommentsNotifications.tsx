import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { DataSourceRender } from 'openland-web/components/messenger/view/DataSourceRender';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView3 } from 'openland-x/XScrollView3';
import glamorous from 'glamorous';
import {
    DataSourceWebMessageItem,
    buildMessagesDataSource,
} from 'openland-web/components/messenger/data/WebMessageItemDataSource';
import { DataSourceDateItem } from 'openland-engines/messenger/ConversationEngine';
import { MessageComponent } from 'openland-web/components/messenger/message/MessageComponent';
import { openCommentsModal } from 'openland-web/components/messenger/message/content/comments/CommentsModalInner';

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

export const CommentsNotifications = () => {
    const messenger = React.useContext(MessengerContext);
    const dataSource = buildMessagesDataSource(messenger.notificationCenter.dataSource);

    const renderLoading = React.memo(() => {
        return (
            <LoadingWrapper>
                <XLoader loading={true} />
            </LoadingWrapper>
        );
    });

    const dataSourceWrapper = React.memo((props: any) => {
        return (
            <>
                <XScrollView3 useDefaultScroll flexGrow={1} flexShrink={1}>
                    <MessagesWrapper>{props.children}</MessagesWrapper>
                </XScrollView3>
            </>
        );
    });

    const renderMessage = React.memo((i: DataSourceWebMessageItem | DataSourceDateItem) => {
        const data = i as any;
        return (
            <MessageComponent
                message={data}
                replyQuoteText={data.replyQuoteText}
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
    });

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
                dataSource={dataSource}
                reverce={true}
                wrapWith={dataSourceWrapper}
                renderItem={renderMessage}
                renderLoading={renderLoading}
            />
        </XView>
    );
};
