import * as React from 'react';
import { ApolloClient } from 'apollo-client';
import { withApollo } from 'react-apollo';
import { ChatReadMutation } from 'openland-api/ChatReadMutation';
import { canUseDOM } from 'openland-x-utils/canUseDOM';

class MessengerReaderComponent extends React.PureComponent<{ conversationId: string, lastMessageId: string | null, client: ApolloClient<{}> }> {

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
            this.props.client.mutate({
                mutation: ChatReadMutation.document,
                variables: {
                    conversationId: this.props.conversationId,
                    messageId: this.props.lastMessageId
                }
            });
        }
    }

    render() {
        return null;
    }
}

export const MessengerReader = withApollo<{ conversationId: string, lastMessageId: string | null }>(MessengerReaderComponent);