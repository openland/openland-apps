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

let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function dateFormat(date: number) {
    let now = new Date();
    let dt = date ? new Date(date) : new Date();
    let prefix = '';
    if ((now.getFullYear() !== (dt.getFullYear() + 1)) && (now.getFullYear() !== dt.getFullYear())) {
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

const MessagesWrapper = (props: { children?: any }) => (
    <XView
        flexDirection="column"
        alignItems="stretch"
        alignSelf="center"
        paddingTop={96}
        paddingBottom={40}
        width="100%"
        maxWidth={930}
    >
        {props.children}
    </XView>
);

const MessagesWrapperEmpty = (props: { children?: any }) => (
    <XView
        flexDirection="column"
        alignItems="stretch"
        alignSelf="center"
        justifyContent="center"
        flexGrow={1}
        paddingTop={20}
        paddingBottom={0}
        width="100%"
        maxWidth={930}
    >
        {props.children}
    </XView>
);

const scrollWrapper = css`
    display: flex;
    flex-grow: 1;
    position: relative;
    overflow: scroll;
`;

interface MessageListProps {
    conversation: ConversationEngine;
    messages: ModelMessage[];
    conversationType?: SharedRoomKind | 'PRIVATE';
    inputShower?: (show: boolean) => void;
    me?: UserShort | null;
    conversationId: string;
    editPostHandler?: (data: EditPostProps) => void;
}

const getScrollView = () => {
    return document
        .getElementsByClassName('messages-wrapper')[0]
        .getElementsByClassName('simplebar-scroll-content')[0].children[0].children[0];
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
        console.log(e.target.scrollTop);
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
        let messages: any[] = [];
        let prevDate: string | undefined;
        let prevMessageDate: number | undefined = undefined;
        let prevMessageSender: string | undefined = undefined;
        let currentCollapsed = 0;
        let appendDateIfNeeded = (date: number) => {
            let dstr = dateFormat(date);
            if (dstr !== prevDate) {
                messages.push(
                    <XView
                        key={'date-' + dstr}
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
                                {dstr}
                            </XView>
                        </XView>
                    </XView>,
                );
                prevDate = dstr;
                prevMessageDate = undefined;
                prevMessageSender = undefined;
                currentCollapsed = 0;
            }
        };
        let shouldCompact = (sender: string, date: number) => {
            if (prevMessageSender === sender && prevMessageDate !== undefined) {
                let delta = prevMessageDate - date;

                // 1 hour
                if (delta * -1 > 3600000) {
                    prevMessageDate = date;
                    currentCollapsed = 0;
                    return false;
                }
                // 10 sec
                if (delta < 10000 && currentCollapsed < 10) {
                    prevMessageDate = date;
                    currentCollapsed++;
                    return true;
                }
            }
            prevMessageDate = date;
            prevMessageSender = sender;
            currentCollapsed = 0;
            return false;
        };

        for (let i = 0; i < this.props.messages.length; i++) {
            const prevMessage = i === 0 ? null : this.props.messages[i - 1];
            const isPrevMessageService = prevMessage && prevMessage.isService;
            const m = this.props.messages[i];
            let date = parseInt(m.date, 10);
            appendDateIfNeeded(date);
            if (isServerMessage(m)) {
                messages.push(
                    <MessageComponent
                        key={'message-' + m.id}
                        compact={shouldCompact(m.sender.id, date) && !isPrevMessageService}
                        sender={m.sender as any}
                        message={m}
                        conversation={this.props.conversation}
                        out={!!(this.props.me && this.props.me.id === m.sender.id)}
                        me={this.props.me}
                        conversationType={this.props.conversationType}
                        conversationId={this.props.conversationId}
                        editPostHandler={this.props.editPostHandler}
                    />,
                );
            } else {
                messages.push(
                    <MessageComponent
                        key={'pending-' + m.key}
                        compact={shouldCompact(this.props.conversation.engine.user.id, date)}
                        sender={this.props.conversation.engine.user}
                        message={m}
                        conversation={this.props.conversation}
                        out={true}
                        me={this.props.me}
                        conversationType={this.props.conversationType}
                        conversationId={this.props.conversationId}
                        editPostHandler={this.props.editPostHandler}
                    />,
                );
            }
        }

        let serverMessages = this.props.messages.filter(m => isServerMessage(m));
        let lastMessage = serverMessages[0];

        lastMessageId = '';

        if (!this.props.conversation.historyFullyLoaded && lastMessage) {
            let id = (lastMessage as MessageFull).id;
            lastMessageId = id;
            messages.unshift(
                <XButton
                    alignSelf="center"
                    style="flat"
                    key={'load_more_' + id}
                    text="Load more"
                    loading={true}
                />,
            );
        }

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
                        <XScrollViewReversed
                            ref={this.scroller}
                            getScrollElement={(src: any) => src.children[0].children[0]}
                        >
                            <div className={scrollWrapper} id="chat">
                                <XView flexGrow={1} width="100%" position="absolute">
                                    <MessagesWrapper>{messages}</MessagesWrapper>
                                </XView>
                            </div>
                        </XScrollViewReversed>
                    </XResizeDetector>
                )}
            </>
        );
    }
}
