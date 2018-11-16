import * as React from 'react';
import Glamorous from 'glamorous';
import UploadCare from 'uploadcare-widget';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { XRichTextInput } from 'openland-x/XRichTextInput';
import { XThemeDefault } from 'openland-x/XTheme';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { isServerMessage } from 'openland-engines/messenger/types';
import { getConfig } from '../../../../config';
import { MutationFunc } from 'react-apollo';
import { DropArea } from './DropArea';
import { ReplyView } from './ReplyView';
import { PostIntroModal } from './content/PostIntroModal';
import { withUserInfo, UserInfoComponentProps } from '../../../UserInfo';
import {
  MessagesStateContext,
  MessagesStateContextProps
} from '../MessagesStateContext';
import { withMessageState } from '../../../../api/withMessageState';
import { withGetDraftMessage } from '../../../../api/withMessageState';
import { AttachmentRaw } from './AttachmentRaw';
import {
  ReplyMessageVariables,
  ReplyMessage,
  SaveDraftMessageVariables,
  SaveDraftMessage
} from 'openland-api/Types';
import { global } from '../../../../globalSingleton';

const SendMessageWrapper = Glamorous.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'stretch',
  width: '100%',
  minHeight: 114,
  maxHeight: 330,
  backgroundColor: XThemeDefault.backyardColor,
  flexShrink: 0,
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 12,
  paddingBottom: 12,
  borderTopStyle: 'solid',
  borderTopWidth: '1px',
  borderTopColor: XThemeDefault.separatorColor
});

const SendMessageContent = Glamorous(XHorizontal)({
  width: '100%',
  maxWidth: 800,
  flexBasis: '100%',
  paddingLeft: 45,
  paddingRight: 45
});

const TextInputWrapper = Glamorous.div({
  flexGrow: 1,
  maxHeight: '100%',
  maxWidth: '100%',
  '& > div': {
    maxHeight: '100%',
    height: '100%',
    '& .DraftEditor-root': {
      overflow: 'auto',
      borderRadius: 10,
      backgroundColor: '#ffffff',
      border: 'solid 1px #ececec',
      minHeight: 40,
      maxHeight: 255,
      paddingTop: 9,
      paddingBottom: 9,
      paddingLeft: 16,
      paddingRight: 40
    }
  }
});
export interface MessageComposeComponentProps {
  conversationType?: string;
  conversationId?: string;
  conversation?: ConversationEngine;
  enabled?: boolean;
  onSend?: (text: string) => void;
  onSendFile?: (file: UploadCare.File) => void;
  onChange?: (text: string) => void;
}

interface MessageComposeWithDraft extends MessageComposeComponentProps {
  draft?: string | null;
}

interface MessageComposeComponentInnerProps
  extends MessageComposeComponentProps,
    XWithRouter,
    UserInfoComponentProps {
  messagesContext: MessagesStateContextProps;
  replyMessage: MutationFunc<ReplyMessage, Partial<ReplyMessageVariables>>;
  saveDraft: MutationFunc<SaveDraftMessage, Partial<SaveDraftMessageVariables>>;
  draft?: string | null;
}
interface MessageComposeComponentInnerState {
  dragOn: boolean;
  dragUnder: boolean;
  message: string;
  reply: {
    id: string;
    title: string;
    message: string;
  } | null;
}

// window.localStorage.setItem('conversation_draft_' + this.props.conversationId, src);

class MessageComposeComponentInner extends React.PureComponent<
  MessageComposeComponentInnerProps,
  MessageComposeComponentInnerState
> {
  private input = React.createRef<XRichTextInput>();
  private wasFocused = false;

  constructor(props: MessageComposeComponentInnerProps) {
    super(props);
    this.state = {
      dragOn: false,
      dragUnder: false,
      message: '',
      reply: null
    };
  }

  private handleDrop = (e: any) => {
    e.preventDefault();

    this.setState({ dragOn: false, dragUnder: false });
    let file = e.dataTransfer.files[0];
    let ucFile = UploadCare.fileFrom('object', file);

    if (this.props.onSendFile) {
      this.props.onSendFile(ucFile);
    }
  }

  private handleDragOver = () => {
    this.setState({ dragUnder: true });
  }

  private handleDragLeave = (e: any) => {
    let file = e.dataTransfer.files[0];
    if (file === undefined) {
      this.setState({ dragOn: false });
    }
    this.setState({ dragUnder: false });
  }

  private handleAttach = () => {
    let dialog = UploadCare.openDialog(null, {
      publicKey: getConfig().uploadcareKey!!
    });
    dialog.done(r => {
      this.setState({ message: '', dragOn: false }, () => {
        if (this.props.onSendFile) {
          this.props.onSendFile(r);
        }
      });
    });
  }

  private handleSend = () => {
    const { onSend, messagesContext, replyMessage } = this.props;
    const { conversationId } = messagesContext;
    let { message, reply } = this.state;

    message = message.trim();

    if (message.length > 0) {
      if (reply && conversationId && message) {
        replyMessage({
          variables: { conversationId, message, replyMessages: [reply.id] }
        });
        this.closeReply();
      } else {
        if (onSend) {
          onSend(message);
        }
      }
      this.handleChange('');
    }
  }

  private handleChange = (message: string) => {
    this.setState({ message });
    this.props.saveDraft({
      variables: {
        conversationId: this.props.conversationId,
        message
      }
    });

    if (this.props.onChange) {
      this.props.onChange(message);
    }
  }

  private focusIfNeeded = () => {
    if (this.props.enabled !== false && !this.wasFocused) {
      this.wasFocused = true;
      if (this.input.current) {
        this.input.current.focus();
      }
    }
  }

  private handleWindowDragover = (e: any) => {
    e.preventDefault();
    this.setState({
      dragOn: true
    });
  }

  private handleWindowDrop = (e: any) => {
    e.preventDefault();
    this.setState({
      dragOn: false
    });
  }

  private closeReply = () => {
    this.props.messagesContext.setEditMessage(null, null);
    this.props.messagesContext.setReplyMessage(null, null, null, null);
    global.setIsEditMessage(false);
    this.setState((state: MessageComposeComponentInnerState) => ({
      ...state,
      reply: null
    }));
    if (this.input.current) {
      this.input.current!!.resetAndFocus();
    }
  }

  keydownHandler = (e: any) => {
    let { conversation, user, messagesContext } = this.props;
    let { message, reply } = this.state;
    let hasFocus =
      this.input.current &&
      this.input.current.state.editorState.getSelection().getHasFocus();

    const isArrowUp = e.code === 'ArrowUp' && !e.altKey && hasFocus;
    const isKeyE = e.code === 'KeyE' && e.ctrlKey;

    if (
      conversation &&
      message.length === 0 &&
      (isArrowUp || isKeyE) &&
      !reply
    ) {
      const messages = conversation.getState().messages;
      let filteredMessages = messages.filter(
        (m: any) =>
          isServerMessage(m) && m.message && user && m.sender.id === user.id
      );
      let lastMessage = filteredMessages[filteredMessages.length - 1];
      if (lastMessage && isServerMessage(lastMessage)) {
        e.preventDefault();
        messagesContext.setEditMessage(lastMessage.id, lastMessage.message);
        global.setIsEditMessage(true);
      }
    }
    if (e.code === 'Escape' && reply) {
      this.closeReply();
    }
  }

  componentDidMount() {
    this.focusIfNeeded();
    window.addEventListener('dragover', this.handleWindowDragover);
    window.addEventListener('drop', this.handleWindowDrop);
    window.addEventListener('keydown', this.keydownHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('dragover', this.handleWindowDragover);
    window.removeEventListener('drop', this.handleWindowDrop);
    window.removeEventListener('keydown', this.keydownHandler);
  }

  componentDidUpdate() {
    this.focusIfNeeded();
  }

  doesHaveReply = (nextProps: MessageComposeComponentInnerProps) => {
    let {
      replyMessage,
      replyMessageId,
      replyMessageSender,
      conversationId
    } = nextProps.messagesContext;

    return (
      replyMessage && replyMessageId && replyMessageSender && conversationId
    );
  }

  getReplyFromContext = (messagesContext: any) => {
    let { replyMessageId, replyMessage, replyMessageSender } = messagesContext;

    return {
      title: replyMessageSender,
      id: replyMessageId,
      message: replyMessage
    };
  }

  processReply = (nextProps: MessageComposeComponentInnerProps) => {
    let newState: any = {};
    let replyChecker = this.doesHaveReply(nextProps);

    if (replyChecker) {
      global.setIsEditMessage(true);
      newState = {
        ...newState,
        reply: this.getReplyFromContext(nextProps.messagesContext)
      };
      if (this.input.current) {
        this.input.current!!.resetAndFocus();
      }
    }

    return newState;
  }

  componentWillReceiveProps(nextProps: MessageComposeComponentInnerProps) {
    this.setState(state => {
      return {
        ...state,
        ...this.processReply(nextProps)
      };
    });
  }

  render() {
    let { message, reply } = this.state;

    let replyParams = null;
    if (reply) {
      replyParams = {
        ...reply,
        onCancel: this.closeReply
      };
    }

    return (
      <SendMessageWrapper>
        <DropArea
          onSendFile={this.props.onSendFile}
          handleDrop={this.handleDrop}
          handleDragOver={this.handleDragOver}
          handleDragLeave={this.handleDragLeave}
          dragOn={this.state.dragOn}
          dragUnder={this.state.dragUnder}
        />
        <SendMessageContent separator={4} alignItems="center">
          <XVertical separator={6} flexGrow={1} maxWidth="100%">
            {replyParams && <ReplyView {...replyParams} />}
            <TextInputWrapper>
              <XRichTextInput
                placeholder="Write a message..."
                flexGrow={1}
                onChange={this.handleChange}
                onSubmit={this.handleSend}
                ref={this.input}
                value={message}
              />
            </TextInputWrapper>
            <XHorizontal
              alignItems="center"
              justifyContent="space-between"
              flexGrow={1}
            >
              <AttachmentRaw
                enabled={this.props.enabled}
                handleAttach={this.handleAttach}
              />
              <XButton
                text="Send"
                style="primary"
                action={this.handleSend}
                iconRight="send"
                enabled={this.props.enabled}
              />
            </XHorizontal>
          </XVertical>
        </SendMessageContent>
        <PostIntroModal
          targetQuery="addItro"
          conversationId={this.props.conversationId || ''}
        />
      </SendMessageWrapper>
    );
  }
}

export const MessageComposeComponent = withMessageState(
  withUserInfo(props => (
    <MessagesStateContext.Consumer>
      {(state: MessagesStateContextProps) => (
        <MessageComposeComponentInner
          {...props}
          messagesContext={state}
          replyMessage={props.replyMessage}
          saveDraft={props.saveDraft}
          draft={props.draft}
        />
      )}
    </MessagesStateContext.Consumer>
  ))
) as React.ComponentType<MessageComposeWithDraft>;

export const MessageComposeComponentDraft = withGetDraftMessage(props => {
  return <MessageComposeComponent draft={props.data.message} {...props} />;
}) as React.ComponentType<
  MessageComposeComponentProps & { variables?: { conversationId?: string } }
>;
