import * as React from 'react';
import Glamorous from 'glamorous';
import { MessageComponent } from '../content/MessageComponent';
import { UserShortFragment, MessageFullFragment } from 'openland-api/Types';
import { PendingMessage } from '../Model';
import { XVertical } from 'openland-x-layout/XVertical';
import { XScrollViewReversed } from 'openland-x/XScrollViewReversed';

interface MessageListProps {
    me: UserShortFragment;
    messages: MessageFullFragment[];
    pending: PendingMessage[];
    onRetry: (key: string) => void;
    onCancel: (key: string) => void;
}

function dateFormat(date?: number) {
    let dt = date ? new Date(date) : new Date();
    return (dt.getFullYear() + ' ,' + dt.getMonth() + ' ' + dt.getDate());
}

const DateDivider = Glamorous.div({
    display: 'flex',
    fontSize: '14px',
    fontWeight: 300,
    justifyContent: 'center',
    alignItems: 'center'
});

const MessagesWrapper = Glamorous(XVertical)({
    paddingTop: '96px',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingBottom: '24px'
});

export class MessageListComponent extends React.PureComponent<MessageListProps> {

    private scroller = React.createRef<XScrollViewReversed>();

    scrollToBottom = () => {
        this.scroller.current!!.scrollToBottom();
    }

    render() {
        let messages: any[] = [];
        let prevDate: string | undefined;
        let appendDateIfNeeded = (date?: number) => {
            let dstr = dateFormat(date);
            if (dstr !== prevDate) {
                messages.push(<DateDivider key={'date-' + dstr}>{dstr}</DateDivider>);
                prevDate = dstr;
            }
        };
        let existingKeys = new Set<string>();
        for (let m of [...this.props.messages].reverse()) {
            appendDateIfNeeded(parseInt(m.date, 10));
            messages.push(
                <MessageComponent
                    key={'message-' + m.id}
                    compact={false}
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
        for (let m of this.props.pending) {
            if (existingKeys.has(m.key)) {
                continue;
            }
            appendDateIfNeeded();
            messages.push(
                <MessageComponent
                    key={'pending-' + m.key}
                    compact={false}
                    sender={this.props.me}
                    message={m}
                    onCancel={this.props.onCancel}
                    onRetry={this.props.onRetry}
                />
            );
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