import * as React from 'react';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { MessageComponent } from '../message/MessageComponent';
import { XScrollViewReversed } from 'openland-x/XScrollViewReversed';
import {
    ConversationEngine,
    DataSourceMessageItem,
    DataSourceDateItem,
} from 'openland-engines/messenger/ConversationEngine';
import { Loader } from 'openland-x/XButton';
import { UserShort, SharedRoomKind } from 'openland-api/Types';
import { EmptyBlock } from '../../../fragments/ChatEmptyComponent';
import { EditPostProps } from '../../../fragments/MessengerRootComponent';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { DataSourceRender } from './DataSourceRender';
import glamorous from 'glamorous';
import { getMessagesWrapperClassName } from './MessagesContainer';

let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const messagesWrapperClassName = css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-self: center;
    padding-top: 96px;
    padding-bottom: 40px;
    width: 100%;
    max-width: 930px;
    @media (min-width: 750px) {
        min-width: 512px;
    }
`;

const MessagesWrapper = ({ children }: { children?: any }) => (
    <div className={messagesWrapperClassName}>{children}</div>
);

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
    conversation: ConversationEngine;
    conversationType?: SharedRoomKind | 'PRIVATE';
    inputShower?: (show: boolean) => void;
    me?: UserShort | null;
    conversationId: string;
    editPostHandler?: (data: EditPostProps) => void;
    scrollPosition?: (data: number) => void;
}

const getScrollElement = (src: any) => {
    return src;
};

const getScrollView = (conversationId: string) => {
    const wrapperElement = document.getElementsByClassName(
        getMessagesWrapperClassName(conversationId),
    )[0];

    if (!wrapperElement) {
        return null;
    }

    const simpleBarElement = wrapperElement.getElementsByClassName('simplebar-scroll-content')[0];

    if (!simpleBarElement) {
        return null;
    }

    return getScrollElement(simpleBarElement);
};

const LoadingWrapper = glamorous.div({
    height: 50,
});

export class MessageListComponent extends React.PureComponent<MessageListProps> {
    private scroller = React.createRef<XScrollViewReversed>();
    unshifted = false;

    scrollToBottom = () => {
        this.scroller.current!!.scrollToBottom();
    };

    componentDidMount() {
        if (!canUseDOM) {
            return;
        }
        getScrollView(this.props.conversationId).addEventListener('scroll', this.handleScroll, {
            passive: true,
        });

        setTimeout(() => {
            const scrollViewElem = getScrollView(this.props.conversationId);
            if (scrollViewElem && scrollViewElem.scrollTop < 50) {
                this.props.conversation.loadBefore();
            }
        }, 1000);
    }

    componentWillUnmount() {
        getScrollView(this.props.conversationId).removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (e: any) => {
        if (e.target.scrollTop < 50) {
            this.props.conversation.loadBefore();
        }
    };

    isEmpty = () => {
        return (
            this.props.conversation.historyFullyLoaded &&
            this.props.conversation.getState().messages.length === 0
        );
    };

    resizeHandler = (width: number, height: number) => {
        if (canUseDOM && this.scroller && this.scroller.current) {
            this.scroller.current.restorePreviousScroll();
        }
    };

    renderMessage = (i: DataSourceMessageItem | DataSourceDateItem) => {
        if (i.type === 'message') {
            return (
                <MessageComponent
                    key={i.key}
                    message={i}
                    conversation={this.props.conversation}
                    editPostHandler={this.props.editPostHandler}
                    me={this.props.me}
                />
            );
        } else if (i.type === 'date') {
            let now = new Date();
            let date = 'Today';
            if (now.getFullYear() === i.year) {
                if (now.getMonth() !== i.month || now.getDate() !== i.date) {
                    date = months[i.month] + ' ' + i.date;
                }
            } else {
                date = i.year + ', ' + months[i.month] + ' ' + i.date;
            }
            return (
                <XView
                    key={'date-' + i.key}
                    justifyContent="center"
                    alignItems="center"
                    zIndex={1}
                    marginTop={24}
                    marginBottom={0}
                >
                    <XView
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor="#ffffff"
                        borderRadius={50}
                        paddingLeft={10}
                        paddingRight={10}
                        paddingTop={2}
                        paddingBottom={2}
                    >
                        <XView fontSize={13} color="#99A2B0">
                            {date}
                        </XView>
                    </XView>
                </XView>
            );
        }
        return <div />;
    };

    renderLoading = () => {
        return (
            <LoadingWrapper>
                <Loader style="flat" />
            </LoadingWrapper>
        );
    };

    dataSourceWrapper = React.memo((props: any) => {
        return (
            <>
                <XScrollViewReversed
                    ref={this.scroller}
                    flexGrow={1}
                    getScrollElement={getScrollElement}
                    scrollPosition={this.props.scrollPosition}
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
                </XScrollViewReversed>
            </>
        );
    });

    render() {
        return (
            <DataSourceRender
                dataSource={this.props.conversation.dataSource}
                reverce={true}
                wrapWith={this.dataSourceWrapper}
                renderItem={this.renderMessage}
                renderLoading={this.renderLoading}
            />
        );
    }
}
