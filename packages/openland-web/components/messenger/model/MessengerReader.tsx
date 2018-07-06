import * as React from 'react';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { MessengerContext, MessengerEngine } from '../MessengerEngine';

class MessengerReaderComponent extends React.PureComponent<{ conversationId: string, lastMessageId: string | null, engine: MessengerEngine }> {

    componentDidUpdate() {
        if (canUseDOM) {
            this.readChat();
        }
    }

    componentDidMount() {
        this.readChat();
    }

    readChat = () => {
        if (this.props.conversationId && this.props.lastMessageId) {
            this.props.engine.readConversation(this.props.conversationId, this.props.lastMessageId);
        }
    }

    render() {
        return null;
    }
}

export const MessengerReader = (props: { conversationId: string, lastMessageId: string | null }) => {
    return (
        <MessengerContext.Consumer>
            {(messenger) => (
                <MessengerReaderComponent engine={messenger} conversationId={props.conversationId} lastMessageId={props.lastMessageId} />
            )}
        </MessengerContext.Consumer>
    );
};