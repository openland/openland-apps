import * as React from 'react';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { MessageComponent } from '../message/MessageComponent';
import { XScrollViewReversed } from 'openland-x/XScrollViewReversed';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { ModelMessage, isServerMessage } from 'openland-engines/messenger/types';
import { XButton } from 'openland-x/XButton';
import { MessageFull, UserShort, SharedRoomKind } from 'openland-api/Types';
import { EmptyBlock } from '../../../fragments/ChatEmptyComponent';
import { XResizeDetector } from 'openland-x/XResizeDetector';
import { EditPostProps } from '../../../fragments/MessengerRootComponent';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { DataSourceRender } from './DataSourceRender';

let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function dateFormat(date: number) {
    let now = new Date();
    let dt = date ? new Date(date) : new Date();
    let prefix = '';
    if (now.getFullYear() !== dt.getFullYear() + 1 && now.getFullYear() !== dt.getFullYear()) {
        prefix = dt.getFullYear().toString() + ', ';
    }
    if (
        now.getFullYear() === dt.getFullYear() &&
        now.getMonth() === dt.getMonth() &&
        now.getDate() === dt.getDate()
    ) {
        return 'Today';
    }
    return prefix + months[dt.getMonth()] + ' ' + dt.getDate() + 'th';
}

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

const MessagesWrapper = (props: { children?: any }) => (
    <div className={messagesWrapperClassName}>{props.children}</div>
);

const messagesWrapperEmptyClassName = css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    align-self: center;
    justify-content: center;
    flex-grow: 1;
    padding-top: 20px;
    padding-bottom: 0px;
    width: 100%;
    maxwidth: 930px;
    @media (min-width: 750px) {
        minwidth: 512px;
    }
`;

const MessagesWrapperEmpty = (props: { children?: any }) => (
    <div className={messagesWrapperEmptyClassName}>{props.children}</div>
);

interface MessageListProps {
    conversation: ConversationEngine;
    messages: ModelMessage[];
    conversationType?: SharedRoomKind | 'PRIVATE';
    inputShower?: (show: boolean) => void;
    me?: UserShort | null;
    conversationId: string;
    editPostHandler?: (data: EditPostProps) => void;
}

const getScrollElement = (src: any) => src;
const getScrollView = () => {
    return getScrollElement(
        document
            .getElementsByClassName('messages-wrapper')[0]
            .getElementsByClassName('simplebar-scroll-content')[0],
    );
};

let lastMessageId = '';

export class MessageListComponent extends React.PureComponent<MessageListProps> {
    private scroller = React.createRef<XScrollViewReversed>();
    unshifted = false;

    constructor(props: MessageListProps) {
        super(props);
    }

    scrollToBottom = () => {
        this.scroller.current!!.scrollToBottom();
    };

    componentWillUpdate(newprops: MessageListProps) {
        if (newprops.messages[0] !== this.props.messages[0]) {
            this.scroller.current!!.updateDimensions();
            this.unshifted = true;
        }
    }

    componentDidMount() {
        if (!canUseDOM) {
            return;
        }
        getScrollView().addEventListener('scroll', this.handleScroll, {
            passive: true,
        });
    }

    componentWillUnmount() {
        getScrollView().removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (e: any) => {
        if (lastMessageId !== '' && e.target.scrollTop < 50) {
            this.props.conversation.loadBefore(lastMessageId);
        }
    };

    componentDidUpdate() {
        if (this.unshifted) {
            this.scroller.current!!.restorePreviousScroll();
            this.unshifted = false;
        }
    }

    isEmpty = () => {
        return this.props.conversation.historyFullyLoaded && this.props.messages.length === 0;
    };

    resizeHandler = (width: number, height: number) => {
        if (canUseDOM && this.scroller && this.scroller.current) {
            this.scroller.current.restorePreviousScroll();
        }
    };

    render() {

        return (
            <>
                {this.isEmpty() && (
                    <XScrollViewReversed ref={this.scroller}>
                        <MessagesWrapperEmpty>
                            <EmptyBlock
                                conversationType={this.props.conversationType}
                                onClick={this.props.inputShower}
                            />
                        </MessagesWrapperEmpty>
                    </XScrollViewReversed>
                )}
                {!this.isEmpty() && (
                    <XResizeDetector
                        handleWidth={false}
                        handleHeight={true}
                        onResize={this.resizeHandler}
                    >

                        <DataSourceRender
                            dataSource={this.props.conversation.dataSource}
                            reverce={true}
                            wrapWith={(props: any) =>
                                <XScrollViewReversed
                                    ref={this.scroller}
                                    getScrollElement={(src: any) => src.children[0].children[0]}
                                >
                                    <div className={scrollWrapper}>
                                        <XView flexGrow={1} width="100%" position="absolute">
                                            <MessagesWrapper >
                                                {props.children}
                                            </MessagesWrapper>
                                        </XView>
                                    </div>
                                </XScrollViewReversed>
                            }
                            renderItem={i => {
                                if (i.type === 'message') {
                                    if (!i.isService) {
                                        return <MessageComponent key={i.key} message={i} conversation={this.props.conversation} />
                                    }
                                }
                                return <div key={i.key} />;
                            }}
                            renderLoading={() => <div key={'load'} />}
                        />
                    </XResizeDetector>
                )}
            </>
        );
    }
}
