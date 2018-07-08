import * as React from 'react';
import Glamorous from 'glamorous';
import { MessageComponent } from './MessageComponent';
import { MessageFullFragment } from 'openland-api/Types';
import { PendingMessage } from '../model/types';
import { XScrollViewReversed } from 'openland-x/XScrollViewReversed';
import { ConversationEngine } from '../model/ConversationEngine';

interface MessageListProps {
    conversation: ConversationEngine;
    messages: MessageFullFragment[];
    pending: PendingMessage[];
    onRetry: (key: string) => void;
    onCancel: (key: string) => void;
}

function dateFormat(date: number) {
    let dt = date ? new Date(date) : new Date();
    return (dt.getFullYear() + ' ,' + dt.getMonth() + ' ' + dt.getDate());
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
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingBottom: '24px',
    width: '100%',
    // '& > .full-message + .full-message': {
    //     marginBottom: 12
    // },
    // '& > .full-message + .compact-message': {
    //     marginBottom: 0
    // },
    // '& > .compact-message + .full-message': {
    //     marginBottom: 12
    // }
});

export class MessageListComponent extends React.PureComponent<MessageListProps> {

    private scroller = React.createRef<XScrollViewReversed>();

    scrollToBottom = () => {
        this.scroller.current!!.scrollToBottom();
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
        let existingKeys = new Set<string>();
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
            messages.push(
                <MessageComponent
                    key={'message-' + m.id}
                    compact={shouldCompact(m.sender.id, date)}
                    sender={m.sender as any}
                    message={m}
                    onCancel={this.props.onCancel}
                    onRetry={this.props.onRetry}
                />
            );
            if (m.repeatKey) {
                existingKeys.add(m.repeatKey);
            }
        }
        if (this.props.pending.length > 0) {
            let now = new Date().getTime();
            appendDateIfNeeded(now);
            let shouldCollapse = shouldCompact(this.props.conversation.engine.user.id, now);
            for (let m of this.props.pending) {
                if (existingKeys.has(m.key)) {
                    continue;
                }
                messages.push(
                    <MessageComponent
                        key={'pending-' + m.key}
                        compact={shouldCollapse}
                        sender={this.props.conversation.engine.user}
                        message={m}
                        onCancel={this.props.onCancel}
                        onRetry={this.props.onRetry}
                    />
                );
                if (!shouldCollapse) {
                    shouldCollapse = true;
                }
            }
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