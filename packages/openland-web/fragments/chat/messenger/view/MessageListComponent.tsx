import * as React from 'react';
import { MessageComponent } from '../message/MessageComponent';
import { ServiceMessage } from '../message/ServiceMessage';
import {
    ConversationEngine,
    DataSourceDateItem,
    DataSourceNewDividerItem,
} from 'openland-engines/messenger/ConversationEngine';
import { UserShort, SharedRoomKind, RoomChat_room } from 'openland-api/Types';
import { css } from 'linaria';
import { DataSourceRender } from './DataSourceRender';
import { DataSource } from 'openland-y-utils/DataSource';
import {
    DataSourceWebMessageItem,
    buildMessagesDataSource,
} from '../data/WebMessageItemDataSource';
import { XScrollValues } from 'openland-x/XScrollView3';
import { XLoader } from 'openland-x/XLoader';
import { DateComponent } from './DateComponent';
import { NewMessageDividerComponent } from './NewMessageDividerComponent';
import { DataSourceWindow } from 'openland-y-utils/DataSourceWindow';
import { XScrollViewAnchored } from 'openland-x/XScrollViewAnchored';
import { EmptyBlock } from '../../components/ChatEmptyComponent';

const messagesWrapperClassName = css`
    padding-top: 96px;
    padding-bottom: 35px;
`;

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

const loaderClass = css`
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
`;

const dss = new Map<string, DataSource<DataSourceWebMessageItem | DataSourceDateItem>>();

export class MessageListComponent extends React.PureComponent<MessageListProps, { bottomAttached?: boolean }> {
    scroller = React.createRef<any>();
    innerScrollRef = React.createRef<HTMLDivElement>();
    private dataSource: DataSourceWindow<DataSourceWebMessageItem | DataSourceDateItem>;

    constructor(props: MessageListProps) {
        super(props);
        if (dss.has(props.conversationId)) {
            this.dataSource = new DataSourceWindow(dss.get(props.conversationId)!, 20, () => props.conversation.lastReadedDividerMessageId);
        } else {
            let b = buildMessagesDataSource(props.conversation.dataSource);
            dss.set(props.conversationId, b);
            this.dataSource = new DataSourceWindow(b, 20, () => props.conversation.lastReadedDividerMessageId);
        }
        this.state = { bottomAttached: false };
    }

    componentWillUnmount() {
        this.dataSource.destroy();
    }

    scrollToBottom = () => {
        if (this.scroller && this.scroller.current) {
            this.scroller.current.scrollToBottom();
        }
    }

    handlerScroll = (e: XScrollValues) => {
        if (e.scrollTop < 800 || ((e.scrollHeight === e.clientHeight) && !this.dataSource.isCompleted())) {
            this.dataSource.needMore();
        }
        let scrollBottom = e.scrollHeight - e.clientHeight - e.scrollTop;
        if (scrollBottom < 800) {
            this.dataSource.needMoreForward();
        }
        this.setState({ bottomAttached: scrollBottom <= 0 && this.dataSource.isCompletedForward() });
    }

    isEmpty = () => {
        return (
            this.props.conversation.historyFullyLoaded &&
            this.props.conversation.getState().messages.length === 0
        );
    }

    renderMessage = React.memo(
        (data: {
            item: DataSourceWebMessageItem | DataSourceDateItem | DataSourceNewDividerItem;
        }) => {
            if (data.item.type === 'message' && data.item.isService) {
                return <ServiceMessage message={data.item} />;
            } else if (data.item.type === 'message') {
                return <MessageComponent message={data.item} engine={this.props.conversation} />;
            } else if (data.item.type === 'date') {
                return <DateComponent item={data.item} />;
            } else if (data.item.type === 'new_divider') {
                return <NewMessageDividerComponent dividerKey={(data.item as any).dataKey} />;
            }
            return <div />;
        },
    );

    renderLoading = React.memo(() => {
        return (
            <div className={loaderClass}>
                <XLoader loading={true} transparentBackground={true} size="small" />
            </div>
        );
    });

    onScrollRequested = (target: number) => {
        if (this.innerScrollRef.current) {
            let targetNode = this.innerScrollRef.current.childNodes[target] as any;
            if (targetNode && targetNode.scrollIntoView && this.scroller.current) {
                this.scroller.current.scrollTo(targetNode);
            }
        }
    }

    dataSourceWrapper = (props: { children?: any }) => {
        if (this.isEmpty()) {
            return (
                <EmptyBlock
                    conversationType={this.props.conversationType}
                    onClick={this.props.inputShower}
                />
            );
        }
        return <XScrollViewAnchored
            bottomAttached={this.state.bottomAttached}
            flexGrow={1}
            flexShrink={1}
            justifyContent="flex-end"
            onScroll={this.handlerScroll}
            ref={this.scroller}
            innerRef={this.innerScrollRef}
            contentClassName={messagesWrapperClassName}
        >
            {props.children}
        </XScrollViewAnchored>;
    }

    render() {
        return (

            <DataSourceRender
                dataSource={this.dataSource}
                reverce={true}
                renderItem={this.renderMessage}
                renderLoading={this.renderLoading}
                onScrollToReqested={this.onScrollRequested}
                wrapWith={this.dataSourceWrapper}
            />
        );
    }
}
