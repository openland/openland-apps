import * as React from 'react';
import { MessageListComponent } from './view/MessageListComponent';
import { XLoader } from 'openland-x/XLoader';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { ModelMessage } from 'openland-engines/messenger/types';
import { TypingComponent } from './TypingComponent';
import { withUserInfo } from '../../UserInfo';
import { withChatHistory } from '../../../api/withChatHistory';
import { withRefComponent } from '../../ForwardingRefs';

interface ConversationMessagesComponentProps {
  conversation: ConversationEngine;
  conversationId: string;
  conversationType?: string;
  loading: boolean;
  messages: ModelMessage[];
  inputShower?: (show: boolean) => void;
  user: any;
}
export class ConversationMessagesComponentInner extends React.PureComponent<
  ConversationMessagesComponentProps
> {
  messagesList = React.createRef<MessageListComponent>();

  scrollToBottom = () => {
    if (this.messagesList.current) {
      this.messagesList.current.scrollToBottom();
    }
  }

  loadBefore = (id: string) => {
    this.props.conversation.loadBefore(id);
  }

  render() {
    return (
      <>
        {!this.props.loading && (
          <MessageListComponent
            me={this.props.user}
            loadBefore={this.loadBefore}
            conversation={this.props.conversation}
            conversationType={this.props.conversationType}
            messages={this.props.messages}
            inputShower={this.props.inputShower}
            ref={this.messagesList}
            conversationId={this.props.conversationId}
          />
        )}
        <XLoader loading={this.props.loading} />
        <TypingComponent chatId={this.props.conversationId} />
      </>
    );
  }
}
export const ConversationMessagesComponent = withUserInfo(withChatHistory(
  withRefComponent(ConversationMessagesComponentInner) as any
) as any) as any;
