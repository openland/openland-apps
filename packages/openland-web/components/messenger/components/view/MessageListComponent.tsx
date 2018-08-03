import * as ReactDOM from 'react-dom';
import * as React from 'react';
import Glamorous from 'glamorous';
import { MessageComponent } from './MessageComponent';
import { XScrollViewReversed } from 'openland-x/XScrollViewReversed';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { ModelMessage, isServerMessage } from 'openland-engines/messenger/types';
import { XButton } from 'openland-x/XButton';
import { MessageFullFragment } from 'openland-api/Types';

interface MessageListProps {
    conversation: ConversationEngine;
    messages: ModelMessage[];
    loadBefore: (id: string) => void;
}

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
    marginTop: 18,
    marginBottom: 12,
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
            fontWeight: 300,
            color: '#334562',
            opacity: 0.5,
        }
    }
});

const MessagesWrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingTop: '96px',
    paddingBottom: '24px',
    width: '100%'
});

export class MessageListComponent extends React.PureComponent<MessageListProps> {
    private scroller = React.createRef<XScrollViewReversed>();
    unshifted = false;

    scrollToBottom = () => {
        this.scroller.current!!.scrollToBottom();
    }

    componentWillUpdate(newprops: MessageListProps) {
        if (newprops.messages[0] !== this.props.messages[0]) {
            this.scroller.current!!.updateDimensions();
            this.unshifted = true;
        }
    }

    componentDidUpdate() {
        if (this.unshifted) {
            this.scroller.current!!.restorePreviousScroll();
            this.unshifted = false;
        }
    }

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
                // 10 sec
                if (prevMessageDate - date < 10000 && currentCollapsed < 10) {
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
                    />
                );
            }
        }

        let serverMessages = this.props.messages.filter(m => isServerMessage(m));
        let lastMessage = serverMessages[0];

        if (!this.props.conversation.historyFullyLoaded && lastMessage) {
            let id = (lastMessage as MessageFullFragment).id;
            messages.unshift(<XButton alignSelf="center" style="flat" key={'load_more_' + id} text="Load more" onClick={() => this.props.loadBefore(id)} />);
        }

        return (
            <XScrollViewReversed ref={this.scroller}>
                <MessagesWrapper>
                    {messages}
                </MessagesWrapper>
            </XScrollViewReversed>
        );
    }
}