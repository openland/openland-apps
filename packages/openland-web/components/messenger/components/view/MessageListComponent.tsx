import * as React from 'react';
import Glamorous from 'glamorous';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { MessageComponent } from './MessageComponent';
import { XScrollViewReversed } from 'openland-x/XScrollViewReversed';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { ModelMessage, isServerMessage } from 'openland-engines/messenger/types';
import { XButton } from 'openland-x/XButton';
import { MessageFullFragment, UserShortFragment } from 'openland-api/Types';
import { EmptyBlock } from './content/ChatEmptyComponent';

let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

function dateFormat(date: number) {
    let now = new Date();
    let dt = date ? new Date(date) : new Date();
    let prefix = '';
    if (now.getFullYear() !== dt.getFullYear()) {
        prefix = dt.getFullYear().toString() + ', ';
    }
    if (now.getFullYear() === dt.getFullYear() && now.getMonth() === dt.getMonth() && now.getDate() === dt.getDate()) {
        return 'Today';
    }
    return (prefix + months[dt.getMonth()] + ' ' + dt.getDate() + 'th');
}

const DateDivider = Glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'sticky',
    top: 8,
    zIndex: 1,
    marginTop: 24,
    marginBottom: 24,
    '& > div': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 2,
        paddingBottom: 2,
        '& > span': {
            fontSize: 12,
            fontWeight: 500,
            color: '#334562',
            opacity: 0.5,
            letterSpacing: -0.2
        }
    }
});

const MessagesWrapper = Glamorous.div<{ empty?: boolean }>(props => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: props.empty ? 'center' : undefined,
    alignItems: 'stretch',
    alignSelf: 'center',
    flexGrow: props.empty ? 1 : undefined,
    paddingTop: props.empty ? 20 : 96,
    paddingBottom: props.empty ? 0 : 40,
    width: '100%',
    maxWidth: 800
}));

interface MessageListProps {
    conversation: ConversationEngine;
    messages: ModelMessage[];
    loadBefore: (id: string) => void;
    conversationType?: string;
    inputShower?: (show: boolean) => void;
    me?: UserShortFragment | null;
}

const getScrollView = () => {
    return document.getElementsByClassName('messages-wrapper')[0].getElementsByClassName('simplebar-scroll-content')[0];
};

let lastMessageId = '';

export class MessageListComponent extends React.PureComponent<MessageListProps> {
    private scroller = React.createRef<XScrollViewReversed>();
    unshifted = false;

    constructor(props: MessageListProps) {
        super(props);
        // this.checkEmptyState();
    }

    scrollToBottom = () => {
        this.scroller.current!!.scrollToBottom();
    }

    componentWillUpdate(newprops: MessageListProps) {
        if (newprops.messages[0] !== this.props.messages[0]) {
            this.scroller.current!!.updateDimensions();
            this.unshifted = true;
        }
        // this.checkEmptyState();
    }

    componentDidMount() {
        if (!canUseDOM) {
            return;
        }
        getScrollView().addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        getScrollView().removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (e: any) => {
        if (lastMessageId !== '' && e.target.scrollTop < 50) {
            this.props.loadBefore(lastMessageId);
        }
    }

    componentDidUpdate() {
        if (this.unshifted) {
            this.scroller.current!!.restorePreviousScroll();
            this.unshifted = false;
        }
        // this.checkEmptyState();
    }

    isEmpty = () => {
        return this.props.conversation.historyFullyLoaded && this.props.messages.filter(m => m.message && !((m as any).isService)).length < 1;
    }

    // checkEmptyState = () => {
    //     if (this.props.inputShower) {
    //         this.props.inputShower(!(this.isEmpty() && this.props.conversationType === 'ChannelConversation'));
    //     }
    // }
    render() {

        let messages: any[] = [];
        let prevDate: string | undefined;
        let prevMessageDate: number | undefined = undefined;
        let prevMessageSender: string | undefined = undefined;
        let currentCollapsed = 0;
        let appendDateIfNeeded = (date: number) => {
            let dstr = dateFormat(date);
            if (dstr !== prevDate) {
                messages.push(<DateDivider key={'date-' + dstr}><div><span>{dstr}</span></div></DateDivider>);
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
                if ((delta * -1) > 3600000) {
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
        for (let m of this.props.messages) {
            let date = parseInt(m.date, 10);
            appendDateIfNeeded(date);
            if (isServerMessage(m)) {
                messages.push(
                    <MessageComponent
                        key={'message-' + m.id}
                        compact={shouldCompact(m.sender.id, date)}
                        sender={m.sender as any}
                        message={m}
                        conversation={this.props.conversation}
                        out={!!(this.props.me && this.props.me.id === m.sender.id)}
                    />
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
                    />
                );
            }
        }

        let serverMessages = this.props.messages.filter(m => isServerMessage(m));
        let lastMessage = serverMessages[0];

        lastMessageId = '';

        if (!this.props.conversation.historyFullyLoaded && lastMessage) {
            let id = (lastMessage as MessageFullFragment).id;
            lastMessageId = id;
            messages.unshift(<XButton alignSelf="center" style="flat" key={'load_more_' + id} text="Load more" loading={true} />);
        }

        return (
            <XScrollViewReversed ref={this.scroller}>
                <MessagesWrapper empty={this.isEmpty()}>

                    {this.isEmpty() && (
                        <EmptyBlock conversationType={this.props.conversationType} onClick={this.props.inputShower} />
                    )}
                    {!this.isEmpty() && messages}
                </MessagesWrapper>
            </XScrollViewReversed>
        );
    }
}