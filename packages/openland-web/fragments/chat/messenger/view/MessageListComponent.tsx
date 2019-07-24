import * as React from 'react';
import { MessageComponent } from '../message/MessageComponent';
import {
    ConversationEngine,
    DataSourceDateItem,
    DataSourceNewDividerItem,
} from 'openland-engines/messenger/ConversationEngine';
import { UserShort, SharedRoomKind, RoomChat_room } from 'openland-api/Types';
import { EmptyBlock } from 'openland-web/fragments/chat/components/ChatEmptyComponent';
import { css, cx } from 'linaria';
import { DataSourceRender, ScrollTo } from './DataSourceRender';
import glamorous from 'glamorous';
import { DataSource } from 'openland-y-utils/DataSource';
import {
    DataSourceWebMessageItem,
    buildMessagesDataSource,
} from '../data/WebMessageItemDataSource';
import { XScrollViewReverse2 } from 'openland-x/XScrollViewReversed2';
import { XScrollValues } from 'openland-x/XScrollView3';
import { XLoader } from 'openland-x/XLoader';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { DateComponent } from './DateComponent';
import { NewMessageDividerComponent } from './NewMessageDividerComponent';

const messagesWrapperClassName = css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    align-self: center;
    width: 100%;
    max-width: 1040px;
    padding-top: 96px;
    padding-bottom: 35px;
`;

const mobileMessageWrapperClassName = css`
    padding-left: 0;
    padding-right: 0;
`;

const MessagesWrapper = React.memo(({ children }: { children?: any }) => {
    const isMobile = React.useContext(IsMobileContext);
    return (
        <div className={cx(messagesWrapperClassName, isMobile && mobileMessageWrapperClassName)}>
            {children}
        </div>
    );
});

const messagesWrapperEmptyClassName = css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    align-self: center;
    justify-content: center;
    flex-grow: 1;
    padding-bottom: 0px;
    width: 100%;
    max-width: 930px;
    @media (min-width: 750px) {
        min-width: 512px;
    }
`;

const MessagesWrapperEmpty = (props: { children?: any }) => (
    <div className={messagesWrapperEmptyClassName}>{props.children}</div>
);

interface MessageListProps {
    isChannel: boolean;
    conversation: ConversationEngine;
    conversationType?: SharedRoomKind | 'PRIVATE';
    inputShower?: (show: boolean) => void;
    me?: UserShort | null;
    conversationId: string;
    scrollPosition?: (data: number) => void;
    isActive?: boolean;
    room: RoomChat_room;
}

const LoadingWrapper = glamorous.div({
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
});

const dss = new Map<string, DataSource<DataSourceWebMessageItem | DataSourceDateItem>>();

export class MessageListComponent extends React.PureComponent<MessageListProps> {
    scroller = React.createRef<any>();
    private dataSource: DataSource<DataSourceWebMessageItem | DataSourceDateItem>;

    constructor(props: MessageListProps) {
        super(props);
        if (dss.has(props.conversationId)) {
            this.dataSource = dss.get(props.conversationId)!;
        } else {
            let b = buildMessagesDataSource(props.conversation.dataSource);
            dss.set(props.conversationId, b);
            this.dataSource = b;
        }
    }

    scrollToBottom = () => {
        if (this.scroller && this.scroller.current) {
            this.scroller.current.scrollToBottom();
        }
    }

    handlerScroll = (e: XScrollValues) => {
        if (e.scrollTop < 300) {
            this.props.conversation.loadBefore();
        }
    }

    isEmpty = () => {
        return (
            this.props.conversation.historyFullyLoaded &&
            this.props.conversation.getState().messages.length === 0
        );
    }

    renderMessage = React.memo(
        (
            data: { item: (DataSourceWebMessageItem | DataSourceDateItem | DataSourceNewDividerItem) },
        ) => {
            if (data.item.type === 'message') {
                return (
                    <MessageComponent
                        message={data.item}
                        engine={this.props.conversation}
                    />
                );
            } else if (data.item.type === 'date') {
                return <DateComponent item={data.item} />;
            } else if (data.item.type === 'new_divider') {
                return <NewMessageDividerComponent dividerKey={(data.item as any).dataKey} scrollTo={{ key: '' }} />;
            }
            return <div />;
        },
    );

    renderLoading = React.memo(() => {
        return (
            <LoadingWrapper>
                <XLoader loading={true} size="small" />
            </LoadingWrapper>
        );
    });

    dataSourceWrapper = React.memo((props: any) => (
        <XScrollViewReverse2
            flexGrow={1}
            flexShrink={1}
            justifyContent="flex-end"
            onScroll={this.handlerScroll}
            ref={this.scroller}
        >
            {this.isEmpty() && (
                <MessagesWrapperEmpty>
                    <EmptyBlock
                        conversationType={this.props.conversationType}
                        onClick={this.props.inputShower}
                    />
                </MessagesWrapperEmpty>
            )}

            {!this.isEmpty() && <MessagesWrapper>{props.children}</MessagesWrapper>}
        </XScrollViewReverse2>
    ));

    render() {
        return (
            <DataSourceRender
                dataSource={this.dataSource}
                reverce={true}
                wrapWith={this.dataSourceWrapper}
                renderItem={this.renderMessage}
                renderLoading={this.renderLoading}
            />
        );
    }
}
