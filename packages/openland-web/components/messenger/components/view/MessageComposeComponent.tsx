import * as React from 'react';
import Glamorous from 'glamorous';
import UploadCare from 'uploadcare-widget';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { XRichTextInput } from 'openland-x/XRichTextInput';
import { XModal } from 'openland-x-modal/XModal';
import { XThemeDefault } from 'openland-x/XTheme';
import { XLink } from 'openland-x/XLink';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { ChatEditMessageVariables, ChatEditMessage } from 'openland-api/Types';
import { isServerMessage } from 'openland-engines/messenger/types';
import { getConfig } from '../../../../config';
import { withEditMessage } from '../../../../api/withEditMessage';
import { MutationFunc } from 'react-apollo';
import PhotoIcon from '../icons/ic-photo-2.svg';
import FileIcon from '../icons/ic-file-3.svg';
import UloadIc from '../icons/file-upload.svg';
import IntroIc from '../icons/ic-attach-intro-3.svg';
import ShortcutsIcon from '../icons/ic-attach-shortcuts-3.svg';
import CloseIcon from '../icons/ic-close.svg';
import { PostIntroModal } from './content/PostIntroModal';
import { withUserInfo, UserInfoComponentProps } from '../../../UserInfo';
import { MessagesStateContext, MessagesStateContextProps } from '../MessagesStateContext';

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

const DropArea = Glamorous.div<{ dragOn: boolean }>(props => ({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    width: '100%',
    height: 'calc(100% - 115px)',
    zIndex: 2,
    padding: 24,
    visibility: props.dragOn ? 'visible' : 'hidden',
    backgroundColor: props.dragOn ? '#fff' : 'transparent'
}));

const DropAreaContent = Glamorous.div<{ dragUnder: boolean }>(props => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed',
    borderColor: props.dragUnder ? 'rgba(23, 144, 255, 0.2)' : 'rgba(51, 69, 98, 0.1)',
    borderRadius: 8,
    backgroundColor: props.dragUnder ? 'rgba(23, 144, 255, 0.02)' : '#fff',
    '& > svg': {
        pointerEvents: 'none',
        '& > g': {
            stroke: props.dragUnder ? '#1790FF' : '#BCC3CC'
        }
    }
}));

const DropAreaTitle = Glamorous.div({
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: -0.3,
    textAlign: 'center',
    color: '#334562',
    marginTop: 23,
    marginBottom: 4
});

const DropAreaSubtitle = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.71,
    letterSpacing: -0.4,
    textAlign: 'center',
    color: '#5c6a81'
});

const SendMessageContent = Glamorous(XHorizontal)({
    width: '100%',
    maxWidth: 800,
    flexBasis: '100%',
    paddingLeft: 45,
    paddingRight: 45
});

const AttachmentButton = Glamorous(XLink)<{ disable?: boolean }>((props) => ({
    paddingLeft: 12,
    paddingRight: 12,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: '20px',
    color: 'rgba(0, 0, 0, 0.4)',
    opacity: props.disable ? 0.7 : undefined,
    cursor: props.disable ? 'default !important' : 'pointer',
    '&:first-child': {
        marginLeft: 6,
    },
    '@media (max-width: 800px)': {
        fontSize: 0,
        '& > svg': {
            marginRight: '0!important'
        }
    },
    '&:hover': {
        color: props.disable ? '#a3acb8' : 'rgba(0, 0, 0, 0.5)',
        backgroundColor: props.disable ? 'transparent' : 'rgba(0, 0, 0, 0.03)',
        '& > svg > *': {
            fill: props.disable ? '#c1c7cf' : 'rgba(0, 0, 0, 0.3)'
        }
    },
    '&.shortcuts-button > svg, &.document-button > svg': {
        marginTop: 1,
        marginBottom: -1
    },
    '& > svg': {
        flexShrink: 0,
        marginRight: 10,
        '& > *': {
            fill: props.disable ? '#c1c7cf' : 'rgba(0, 0, 0, 0.2)'
        },
    }
}));

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
            paddingRight: 40,
        }
    }
});

const KeyboardShortcuts = Glamorous.div({
    padding: '7px 0 19px'
});

const KeyboardShortcut = Glamorous.div({
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: 0,
    color: '#000000',
    marginBottom: 15,

    '& span': {
        margin: '-1px 8px -2px 0',
        padding: '1px 8px 2px',
        display: 'inline-block',
        fontSize: 13,
        fontWeight: 400,
        lineHeight: '20px',
        color: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.06)'
    },

    '& strong': {
        fontWeight: 600
    }
});

const ShortcutsModal = () => {
    return (
        <XModal
            title="Keyboard shortcuts"
            useTopCloser={true}
            target={(
                <AttachmentButton className="shortcuts-button">
                    <ShortcutsIcon />
                    <span>Shortcuts</span>
                </AttachmentButton>
            )}
        >
            <KeyboardShortcuts>
                <KeyboardShortcut><span>Ctrl + S</span> Search chats</KeyboardShortcut>
                <KeyboardShortcut><span>Esc</span> Close chat</KeyboardShortcut>
                <KeyboardShortcut><span><strong>↑</strong></span> Edit last message (works when the message box is in focus)</KeyboardShortcut>
                <KeyboardShortcut><span>Ctrl + E</span> Edit last message</KeyboardShortcut>
                <KeyboardShortcut><span>Option + ↑ (Mac)</span><span>Alt + ↑ (Windows)</span> Previous chat</KeyboardShortcut>
                <KeyboardShortcut><span>Option + ↓ (Mac)</span><span>Alt + ↓ (Windows)</span> Next chat</KeyboardShortcut>
                <KeyboardShortcut><span>Enter</span> Send message</KeyboardShortcut>
                <KeyboardShortcut><span>Shift + Enter</span> New line</KeyboardShortcut>
                <KeyboardShortcut><span>Cmd + Enter (Mac)</span><span>Ctrl + Enter (Windows)</span> Submit form</KeyboardShortcut>
                <KeyboardShortcut><span>Ctrl + Cmd + Space (Mac)</span> Emojis (standard Mac shortcut)</KeyboardShortcut>
                <KeyboardShortcut><span>Ctrl + Option + N (Mac)</span><span>Ctrl + Alt + N (Windows)</span> New chat</KeyboardShortcut>
            </KeyboardShortcuts>
        </XModal>
    );
};

const EditWrapper = Glamorous(XHorizontal)({
    paddingLeft: 14,
    paddingRight: 14
});

const VerticalHidden = Glamorous(XVertical)({
    overflow: 'hidden'
});

const HorizontalHidden = Glamorous(XHorizontal)({
    overflow: 'hidden'
});

const BlueLine = Glamorous.div({
    width: 3,
    height: 36,
    borderRadius: 50,
    backgroundColor: '#1790ff',
    flexShrink: 0
});

const EditTitle = Glamorous.div({
    opacity: 0.8,
    fontSize: 14,
    fontWeight: 600,
    color: '#000'
});

const EditText = Glamorous.div({
    opacity: 0.8,
    fontSize: 13,
    lineHeight: 1.69,
    color: '#000',
    minWidth: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
});

const EditCloseBtn = Glamorous.div({
    cursor: 'pointer'
});

const EditView = (props: { title: string, message: string, onCancel: () => void }) => (
    <EditWrapper justifyContent="space-between" alignItems="center" separator={5}>
        <BlueLine />
        <HorizontalHidden flexGrow={1} separator={9} alignItems="center" justifyContent="space-between">
            <VerticalHidden separator={1}>
                <EditTitle>{props.title}</EditTitle>
                <EditText>{props.message}</EditText>
            </VerticalHidden>
            <EditCloseBtn onClick={props.onCancel}>
                <CloseIcon />
            </EditCloseBtn>
        </HorizontalHidden>
    </EditWrapper>
);

export interface MessageComposeComponentProps {
    conversationType?: string;
    conversationId?: string;
    conversation?: ConversationEngine;
    enabled?: boolean;
    onSend?: (text: string) => void;
    onSendFile?: (file: UploadCare.File) => void;
    onChange?: (text: string) => void;
}

interface MessageComposeComponentInnerProps extends MessageComposeComponentProps, XWithRouter, UserInfoComponentProps {
    messageEditor: MessagesStateContextProps;
    editMessage: MutationFunc<ChatEditMessage, Partial<ChatEditMessageVariables>>;
}

class MessageComposeComponentInner extends React.PureComponent<MessageComposeComponentInnerProps> {

    state = {
        dragOn: false,
        dragUnder: false,
        message: '',
        messageForEdit: undefined,
        messageIdForEdit: undefined
    };

    private input = React.createRef<XRichTextInput>();
    private wasFocused = false;

    private handleAttach = () => {
        let dialog = UploadCare.openDialog(null, {
            publicKey: getConfig().uploadcareKey!!
        });
        dialog.done((r) => {
            this.setState({ message: '', dragOn: false }, () => {
                if (this.props.onSendFile) {
                    this.props.onSendFile(r);
                }
            });
        });
    }

    private handleSend = () => {
        let { message, messageForEdit, messageIdForEdit } = this.state;
        if (message.trim().length > 0) {
            let msg = message.trim();
            if (this.props.onSend && !messageForEdit && !messageIdForEdit) {
                this.props.onSend(msg);
            }
            if (messageForEdit && messageIdForEdit) {
                this.props.editMessage({ variables: { message: message, messageId: messageIdForEdit } });
            }
            if (this.input.current) {
                this.input.current!!.resetAndFocus();
            }
            this.setState({
                message: '',
                messageForEdit: undefined,
                messageIdForEdit: undefined
            });
            this.props.messageEditor.setEditMessage(null, null);
        }
    }

    private handleChange = (src: string) => {
        if (src.length > 0) {
            this.setState({
                message: src
            });

            if (this.props.onChange) {
                this.props.onChange(src);
            }
        } else {
            this.setState({
                message: ''
            });
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

    private handleDrop = (e: any) => {
        e.preventDefault();

        this.setState({
            dragOn: false,
            dragUnder: false
        });

        let file = e.dataTransfer.files[0];

        let ucFile = UploadCare.fileFrom('object', file);

        if (this.props.onSendFile) {
            this.props.onSendFile(ucFile);
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

    private handleDragOver = () => {
        this.setState({
            dragUnder: true
        });
    }

    private handleDragLeave = (e: any) => {
        let file = e.dataTransfer.files[0];
        if (file === undefined) {
            this.setState({
                dragOn: false
            });
        }
        this.setState({
            dragUnder: false
        });
    }

    private closeEditor = () => {
        this.props.messageEditor.setEditMessage(null, null);
        (document as any).isEditMessage = false;
        this.setState({
            message: '',
            messageForEdit: undefined,
            messageIdForEdit: undefined
        });
        if (this.input.current) {
            this.input.current!!.resetAndFocus();
        }
    }

    keydownHandler = (e: any) => {
        let { message, messageForEdit, messageIdForEdit } = this.state;
        let hasFocus = this.input.current && this.input.current.state.editorState.getSelection().getHasFocus();

        if ((message.length === 0 && this.props.conversation) && ((e.code === 'ArrowUp' && !e.altKey && hasFocus) || (e.code === 'KeyE' && e.ctrlKey)) && (!messageForEdit && !messageIdForEdit)) {
            let messages = this.props.conversation.getState().messages.filter(m => isServerMessage(m) && m.message && this.props.user && m.sender.id === this.props.user.id);
            let messageData = messages[messages.length - 1];
            if (messageData && isServerMessage(messageData)) {
                e.preventDefault();
                this.props.messageEditor.setEditMessage(messageData.id, messageData.message);
                (document as any).isEditMessage = true;
            }
        }
        if (e.code === 'Escape' && messageForEdit && messageIdForEdit) {
            this.closeEditor();
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

    componentWillReceiveProps(nextProps: MessageComposeComponentInnerProps) {
        let { editMessage, editMessageId } = nextProps.messageEditor;
        if (editMessage) {
            this.setState({
                messageForEdit: editMessage,
                messageIdForEdit: editMessageId
            });
            if (this.input.current) {
                this.input.current.focus();
            }
        }
    }

    render() {

        let { messageForEdit, messageIdForEdit } = this.state;

        return (
            <SendMessageWrapper>
                <DropArea
                    dragOn={this.state.dragOn}
                >
                    <DropAreaContent
                        onDrop={this.handleDrop}
                        onDragOver={this.handleDragOver}
                        onDragLeave={this.handleDragLeave}
                        dragUnder={this.state.dragUnder}
                    >
                        <UloadIc />
                        <DropAreaTitle>Drop files here</DropAreaTitle>
                        <DropAreaSubtitle>To send them as files</DropAreaSubtitle>
                    </DropAreaContent>
                </DropArea>
                <SendMessageContent separator={4} alignItems="center">
                    <XVertical separator={6} flexGrow={1} maxWidth="100%">
                        {(messageForEdit && messageIdForEdit) && (
                            <EditView message={messageForEdit} title="Edit message" onCancel={this.closeEditor}/>
                        )}
                        <TextInputWrapper>
                            <XRichTextInput
                                placeholder="Write a message..."
                                flexGrow={1}
                                onChange={this.handleChange}
                                onSubmit={this.handleSend}
                                ref={this.input}
                                value={this.state.messageForEdit}
                            />
                        </TextInputWrapper>
                        <XHorizontal alignItems="center" justifyContent="space-between" flexGrow={1}>
                            <XHorizontal separator="none">
                                <AttachmentButton
                                    onClick={this.props.enabled === false ? undefined : this.handleAttach}
                                    enabled={this.props.enabled === false}
                                    disable={this.props.enabled === false}
                                >
                                    <PhotoIcon />
                                    <span>Photo</span>
                                </AttachmentButton>
                                <AttachmentButton
                                    onClick={this.props.enabled === false ? undefined : this.handleAttach}
                                    enabled={this.props.enabled === false}
                                    disable={this.props.enabled === false}
                                    className="document-button"
                                >
                                    <FileIcon />
                                    <span>Document</span>
                                </AttachmentButton>
                                <AttachmentButton
                                    query={this.props.enabled === false ? undefined : { field: 'addItro', value: 'true' }}
                                    className="intro-button"
                                    disable={this.props.enabled === false}
                                >
                                    <IntroIc />
                                    <span>Intro</span>
                                </AttachmentButton>
                                <ShortcutsModal />
                            </XHorizontal>
                            <XButton
                                text="Send"
                                style="primary"
                                action={this.handleSend}
                                iconRight="send"
                                enabled={this.props.enabled !== false}
                            />
                        </XHorizontal>
                    </XVertical>
                </SendMessageContent>
                <PostIntroModal targetQuery="addItro" conversationId={this.props.conversationId || ''} />
            </SendMessageWrapper>
        );
    }
}

export let MessageComposeComponent = withEditMessage(withUserInfo((props) => {
    return (
        <MessagesStateContext.Consumer>
            {(editor: MessagesStateContextProps) => (
                <MessageComposeComponentInner {...props} messageEditor={editor} editMessage={props.editMessage} />
            )}
        </MessagesStateContext.Consumer>
    );
})) as React.ComponentType<MessageComposeComponentProps>;