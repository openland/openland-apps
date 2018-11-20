import * as React from 'react';
import Glamorous from 'glamorous';
import { SetTypingMutation } from 'openland-api';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XLoader } from 'openland-x/XLoader';
import {
  MessengerEngine,
  MessengerContext
} from 'openland-engines/MessengerEngine';
import {
  ConversationEngine,
  ConversationStateHandler
} from 'openland-engines/messenger/ConversationEngine';
import { ModelMessage } from 'openland-engines/messenger/types';
import { ConversationState } from 'openland-engines/messenger/ConversationState';
import { ForwardRefProviderComponent } from '../../ForwardingRefs';
import { MessageComposeComponent } from './view/MessageComposeComponent';
import {
  ConversationMessagesComponent,
  ConversationMessagesComponentInner
} from './ConversationMessagesComponent';
import { MessagesContainer } from './view/MessagesContainer';
import { UplaodCareUploading } from '../UploadCareUploading';

import { XText } from 'openland-x/XText';
import { withDeleteMessage } from '../../../api/withDeleteMessage';
import { withDeleteUrlAugmentation } from '../../../api/withDeleteUrlAugmentation';
import { withChatLeave } from '../../../api/withChatLeave';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import {
  MessagesStateContext,
  MessagesStateContextProps
} from './MessagesStateContext';

const ConversationContainer = Glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  flexBasis: '100%',
  overflow: 'hidden'
});

interface MessagesComponentProps {
  data: any;
  loading: boolean;
  messenger: MessengerEngine;
}

interface MessagesComponentState {
  conversationId: string | null;
  conversationType: string | null;
  hideInput: boolean;
  loading: boolean;
  messages: ModelMessage[];
}

const DeleteMessageComponent = withDeleteMessage(props => {
  let id = props.router.query.deleteMessage;
  return (
    <XModalForm
      title="Delete message"
      targetQuery="deleteMessage"
      submitBtnText="Delete"
      defaultAction={data => {
        props.deleteMessage({ variables: { messageId: id } });
      }}
      submitProps={{ succesText: 'Deleted!', style: 'danger' }}
    >
      <XText>
        Are you sure you want to delete this message? This cannot be undone.
      </XText>
    </XModalForm>
  );
});

const DeleteUrlAugmentationComponent = withDeleteUrlAugmentation(props => {
  let id = props.router.query.deleteUrlAugmentation;
  return (
    <XModalForm
      title="Delete url augmentation"
      targetQuery="deleteUrlAugmentation"
      submitBtnText="Delete"
      defaultAction={data => {
        props.deleteUrlAugmentation({ variables: { messageId: id } });
      }}
      submitProps={{ succesText: 'Deleted!', style: 'danger' }}
    >
      <XText>
        Are you sure you want to delete this url preview? This cannot be undone.
      </XText>
    </XModalForm>
  );
});

export const LeaveChatComponent = withChatLeave(props => {
  let id = props.router.query.leaveFromChat;
  return (
    <XModalForm
      title="Leave the chat"
      targetQuery="leaveFromChat"
      submitBtnText="Leave"
      defaultAction={data => {
        props.leaveFromChat({ variables: { conversationId: id } });
      }}
      submitProps={{ succesText: 'Done!', style: 'danger' }}
    >
      <XText>
        Are you sure you want to leave? You will need to request access to join
        it again in the future.
      </XText>
    </XModalForm>
  );
});

const MessagesComponent = class
  extends React.Component<MessagesComponentProps, MessagesComponentState>
  implements ConversationStateHandler {
  conversationMessagesComponentRef = React.createRef<
    ConversationMessagesComponentInner
  >();
  private conversation: ConversationEngine | null;
  messageText: string = '';
  unmounter: (() => void) | null = null;
  unmounter2: (() => void) | null = null;

  constructor(props: MessagesComponentProps) {
    super(props);

    this.conversation = null;
    this.state = {
      conversationId: null,
      conversationType: null,
      hideInput: false,
      messages: [],
      loading: true
    };
  }

  onMessageSend = () => {
    if (this.conversationMessagesComponentRef.current) {
      this.conversationMessagesComponentRef.current.scrollToBottom();
    }
  }

  onConversationUpdated = (state: ConversationState) => {
    this.setState({ loading: state.loading, messages: state.messages });
  }

  updateConversation = (data: any) => {
    if (this.unmounter) {
      this.unmounter();
    }
    if (this.unmounter2) {
      this.unmounter2();
    }

    const conversationId = data.chat.id;
    const conversationType = data.chat.__type;

    this.conversation = this.props.messenger.getConversation(
      conversationId
    );
    this.unmounter = this.conversation.engine.mountConversation(
      conversationId
    );
    this.unmounter2 = this.conversation.subscribe(this);

    if (!this.conversation) {
      throw Error('conversation should be defined here');
    }
    let convState = this.conversation.getState();

    this.setState({
      conversationId,
      conversationType,
      messages: convState.messages,
      loading: convState.loading
    });
  }

  componentWillUnmount() {
    if (this.unmounter) {
      this.unmounter();
    }
    if (this.unmounter2) {
      this.unmounter2();
    }
  }

  componentWillReceiveProps(props: MessagesComponentProps) {
    const data = props.data;
    if (!props.loading && data && data.chat && this.state.conversationId !== data.chat.id) {
      this.updateConversation(data);
    }
  }

  handleChange = async (text: string) => {
    let prevLength = this.messageText.length;
    let curLength = text.length;

    if (prevLength < curLength) {
      await this.props.messenger.client.client.mutate({
        mutation: SetTypingMutation.document,
        variables: {
          conversationId: this.state.conversationId
        }
      });
    }

    if (prevLength > 0 && curLength <= 0) {
      // UnSetTyping MUTATION
    }

    this.messageText = text;
  }

  handleSend = (text: string) => {
    if (!this.conversation) {
      throw Error('conversation should be defined here');
    }
    this.conversation.sendMessage(text);
  }

  handleSendFile = (file: UploadCare.File) => {
    if (!this.conversation) {
      throw Error('conversation should be defined here');
    }
    this.conversation.sendFile(new UplaodCareUploading(file));
  }

  handleShowIput = (show: boolean) => {
    this.setState({
      hideInput: !show
    });
  }

  render() {
    return (
      <ConversationContainer>
        <MessagesContainer>
          {!this.props.loading &&
            this.state.conversationId &&
            this.conversation && (
              <ForwardRefProviderComponent
                ref={this.conversationMessagesComponentRef}
              >
                <ConversationMessagesComponent
                  key={this.state.conversationId}
                  messages={this.state.messages}
                  loading={this.state.loading}
                  conversation={this.conversation}
                  conversationId={this.props.data.chat.id}
                  variables={{
                    conversationId: this.props.data.chat.id
                  }}
                  conversationType={this.state.conversationType}
                  inputShower={this.handleShowIput}
                />
              </ForwardRefProviderComponent>
            )}
        </MessagesContainer>
        {this.state.hideInput === false && (
          <MessageComposeComponent
            hidden={this.props.loading}
            conversation={this.conversation}
            onChange={this.handleChange}
            onSend={this.handleSend}
            onSendFile={this.handleSendFile}
            enabled={!this.props.loading}
            conversationType={this.state.conversationType}
            conversationId={this.state.conversationId}
            variables={{
              conversationId: this.state.conversationId
            }}
          />
        )}

        <DeleteUrlAugmentationComponent />
        <DeleteMessageComponent />
        <LeaveChatComponent />
      </ConversationContainer>
    );
  }
};

interface MessengerRootComponentProps {
  loading: boolean;
  data: any;
}

export class MessengerRootComponent extends React.Component<
  MessengerRootComponentProps,
  MessagesStateContextProps
> {
  constructor(props: MessengerRootComponentProps) {
    super(props);

    this.state = {
      editMessageId: null,
      editMessage: null,
      forwardMessagesId: null,
      conversationId: null,
      replyMessageId: null,
      replyMessage: null,
      replyMessageSender: null,
      setEditMessage: this.setEditMessage,
      setForwardMessages: this.setForwardMessages,
      setReplyMessage: this.setReplyMessage
    };
  }

  setEditMessage = (id: string | null, message: string | null) => {
    this.setState({
      editMessageId: id,
      editMessage: message
    });
  }

  setForwardMessages = (id: string[] | null, conversationId: string | null) => {
    this.setState({
      forwardMessagesId: id,
      conversationId: conversationId
    });
  }

  setReplyMessage = (
    id: string | null,
    message: string | null,
    sender: string | null,
    conversationId: string | null
  ) => {
    this.setState({
      replyMessageId: id,
      replyMessage: message,
      replyMessageSender: sender,
      conversationId: conversationId
    });
  }

  render() {
    // We are not allowing messenger to be rendered on server side: just preload history and that's all
    // const conversationId = this.props.data.chat.id;

    return (
      <ConversationContainer>
        {!canUseDOM &&
          (this.props.loading && (
            <MessagesContainer noClassName>
              <XLoader loading={!canUseDOM || this.props.loading} />
            </MessagesContainer>
          ))}
        {canUseDOM && (
          <MessagesStateContext.Provider value={this.state}>
            <MessengerContext.Consumer>
              {messenger => (
                <MessagesComponent
                  loading={this.props.loading}
                  data={this.props.data}
                  messenger={messenger}
                />
              )}
            </MessengerContext.Consumer>
          </MessagesStateContext.Provider>
        )}
      </ConversationContainer>
    );
  }
}
