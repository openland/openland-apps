import * as React from 'react';
import Glamorous from 'glamorous';
import { MessageFull, UserShort, SharedRoomKind } from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { MessageTextComponent } from './content/MessageTextComponent';
import { MessageAnimationComponent } from './content/MessageAnimationComponent';
import { XButton } from 'openland-x/XButton';
import { XLink } from 'openland-x/XLink';
import { MessageImageComponent } from './content/MessageImageComponent';
import { MessageFileComponent } from './content/MessageFileComponent';
import { MessageUploadComponent } from './content/MessageUploadComponent';
import { MessageIntroComponent } from './content/MessageIntroComponent';
import { MessageReplyComponent } from './content/MessageReplyComponent';
import { isServerMessage, PendingMessage } from 'openland-engines/messenger/types';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { MessageUrlAugmentationComponent } from './content/MessageUrlAugmentationComponent';
import { makeNavigable, NavigableChildProps } from 'openland-x/Navigable';
import { XOverflow } from '../../../Incubator/XOverflow';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { MessageFull_urlAugmentation_user_User } from 'openland-api/Types';
import { ReactionComponent } from './MessageReaction';
import { Reactions } from './MessageReaction';
import { MessagesStateContext, MessagesStateContextProps } from '../MessagesStateContext';
import ReplyIcon from '../icons/ic-reply.svg';
import { UserPopper, UserAvatar } from './content/UserPopper';
import { EditMessageInlineWrapper } from './MessageEditComponent';
import { XDate } from 'openland-x/XDate';

const Name = Glamorous.div({
    fontSize: 14,
    fontWeight: 600,
    color: 'rgba(0, 0, 0, 0.8)'
});

const Organization = makeNavigable(Glamorous.div<NavigableChildProps>(() => ({
    fontSize: 12,
    fontWeight: 600,
    color: 'rgba(0, 0, 0, 0.4)',
    letterSpacing: 0,
    alignSelf: 'flex-end',
    marginBottom: -1,
    cursor: 'pointer'
})));

const DateComponent = Glamorous.div<{ small?: boolean }>((props) => ({
    flexShrink: 0,
    width: props.small ? 55 : 62,
    marginBottom: props.small ? undefined : -1,
    fontSize: props.small ? 11 : 12,
    paddingTop: props.small ? 1 : 1,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    color: 'rgba(0, 0, 0, 0.4)',
}));

const Check = Glamorous.div<{ select: boolean }>(props => ({
    flexShrink: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: props.select ? '#1790ff' : '#fff',
    backgroundImage: props.select ? 'url(\'/static/img/icons/check-form.svg\')' : undefined,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    border: props.select ? undefined : '1px solid #D9D9D9'
}));

const MessageWrapper = Glamorous(XHorizontal)<{ compact: boolean, isEditView: boolean, startSelected: boolean }>(props => ({
    cursor: 'pointer',
    '& .message-container': {
        backgroundColor: '#fff'
    },
    '& .time': {
        opacity: props.compact ? 0 : 1
    },
    '& .menu > div': {
        height: 20,
        marginRight: -14
    },
    '& .menu-wrapper, & .reactions-wrapper .reaction-button': {
        opacity: 0,
        pointerEvents: 'none',
    },
    '& .check-icon': {
        opacity: props.startSelected ? 1 : 0,
    },
    '&:hover': {
        '& .message-container': {
            backgroundColor: props.isEditView ? '#fff' : '#F9F9F9',
        },
        '& .check-icon': {
            opacity: props.isEditView ? 0 : 1
        },
        '& .time': {
            opacity: props.isEditView ? 0 : 1
        },
        '& .menu-wrapper, & .reactions-wrapper .reaction-button': {
            opacity: props.startSelected ? 0 : props.isEditView ? 0 : 1,
            pointerEvents: props.startSelected ? 'none' : props.isEditView ? 'none' : 'auto',
        }
    }
}));

const MessageCompactContainer = Glamorous(XHorizontal)({
    paddingLeft: 7,
    paddingTop: 3,
    paddingRight: 10,
    paddingBottom: 3,
    borderRadius: 6,
    width: '100%'
});

const MessageContainer = Glamorous(XVertical)({
    marginTop: 12,
    paddingLeft: 10,
    paddingTop: 7,
    paddingRight: 10,
    paddingBottom: 3,
    borderRadius: 6,
    width: '100%'
});

const MenuWrapper = Glamorous(XHorizontal)<{compact: boolean}>(props => ({
    marginTop: props.compact ? 4 : 16
}));

const MessageCompactContent = Glamorous(XVertical)<{ isIntro?: boolean }>(props => ({
    paddingRight: (props.isIntro === true) ? 0 : 20,
    '& .url-augmentation': (props.isIntro === true) ? {} : {
        width: 'calc(100% + 20px)'
    }
}));

const ReplyMessageWrapper = Glamorous.div({
    position: 'relative',
    '&::before': {
        display: 'block',
        content: ' ',
        position: 'absolute',
        left: 0,
        top: 12,
        bottom: 4,
        width: 3,
        borderRadius: 3,
        backgroundColor: '#1790ff'
    }
});

const ReplyButton = Glamorous(XLink)({
    // opacity: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover svg path:last-child': {
        fill: '#1790ff',
        opacity: 1
    }
});

interface MessageComponentProps {
    compact: boolean;
    sender?: UserShort;
    message: MessageFull | PendingMessage;
    conversation: ConversationEngine;
    out: boolean;
    me?: UserShort | null;
    conversationType?: SharedRoomKind | 'PRIVATE';
    conversationId: string;
}

interface MessageComponentInnerProps extends MessageComponentProps {
    messagesContext: MessagesStateContextProps;
}

class MessageComponentInner extends React.PureComponent<MessageComponentInnerProps, { isEditView: boolean, isMenuOpen: boolean }> {
    static getDerivedStateFromProps = (props: MessageComponentInnerProps, state: { isEditView: boolean, isMenuOpen: boolean }) => {
        if (isServerMessage(props.message)) {
            if (props.messagesContext.editMessageId === props.message.id) {
                return {
                    isEditView: true,
                    isMenuOpen: false
                };
            } else {
                return {
                    isEditView: false
                };
            }
        }

        return null;
    }

    constructor(props: MessageComponentInnerProps) {
        super(props);

        this.state = {
            isEditView: false,
            isMenuOpen: false
        };
    }

    private switchMenu = () => {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        });
    }

    private setEditMessage = (e: any) => {
        let { message, messagesContext } = this.props;
        if (isServerMessage(this.props.message)) {
            e.stopPropagation();
            messagesContext.resetAll();
            messagesContext.setEditMessage((message as MessageFull).id, message.message);
        }
    }

    private setReplyMessages = (e: any) => {
        let { message, messagesContext } = this.props;

        if (isServerMessage(message)) {
            e.stopPropagation();
            messagesContext.resetAll();
            let singleReplyMessageMessage = new Set().add(message.message);
            let singleReplyMessageId = new Set().add((message as MessageFull).id);
            let singleReplyMessageSender = new Set().add((message as MessageFull).sender.name);

            if ((message as MessageFull).file && !(message as MessageFull).urlAugmentation) {
                singleReplyMessageMessage = new Set().add('File');
                if ((message as MessageFull).fileMetadata!!.isImage) {
                    singleReplyMessageMessage = new Set().add('Photo');
                }
            }
            messagesContext.setReplyMessages(singleReplyMessageId, singleReplyMessageMessage, singleReplyMessageSender);
        }
    }

    private selectMessage = () => {
        let { message, messagesContext } = this.props;

        if (!isServerMessage(message) || this.state.isEditView || document.body.classList[0] === 'ReactModal__Body--open' || messagesContext.editMessageId) {
            return;
        }

        if (window.getSelection().toString()) {
            return;
        }

        let { forwardMessagesId } = messagesContext;
        let selectedMessageId = forwardMessagesId;

        if (forwardMessagesId && selectedMessageId) {
            if (forwardMessagesId.has(message.id)) {
                selectedMessageId.delete(message.id);
                messagesContext.setForwardMessages(selectedMessageId);
            } else {
                selectedMessageId.add(message.id);
                messagesContext.setForwardMessages(selectedMessageId);
            }
        } else if (!forwardMessagesId && !selectedMessageId) {
            selectedMessageId = new Set<string>();
            selectedMessageId.add(message.id);
            messagesContext.setForwardMessages(selectedMessageId);
        }
    }

    private hideEditView = () => {
        this.props.messagesContext.resetAll();
    }

    private menuRender = (compact: boolean) => {
        const { message } = this.props;

        let menu = isServerMessage(message) && this.props.out ?
            (
                <XVertical className="menu">
                    <XOverflow
                        show={this.state.isMenuOpen}
                        flat={true}
                        placement="bottom-end"
                        onClickTarget={this.switchMenu}
                        content={
                            <>
                                {message.message && <XMenuItem onClick={this.setEditMessage}>Edit</XMenuItem>}
                                <XMenuItem style="danger" query={{ field: 'deleteMessage', value: message.id }}>Delete</XMenuItem>
                            </>
                        }
                    />
                </XVertical>
            ) : (isServerMessage(message) && this.props.conversationType === 'PUBLIC') ? (
                <XWithRole role="super-admin">
                    <XVertical className="menu">
                        <XOverflow
                            flat={true}
                            placement="bottom-end"
                            content={<XMenuItem style="danger" query={{ field: 'deleteMessage', value: message.id }}>Delete</XMenuItem>}
                        />
                    </XVertical>
                </XWithRole>
            ) : null;

        if (isServerMessage(message) && message.urlAugmentation && message.urlAugmentation.type === 'intro') {
            menu = null;
        }

        return (
            <MenuWrapper alignItems="center" alignSelf="flex-start" separator={0} className="menu-wrapper" compact={compact}>
                <XHorizontal alignItems="center" separator={6}>
                    <ReplyButton onClick={this.setReplyMessages}>
                        <ReplyIcon />
                    </ReplyButton>
                    {(!(message as MessageFull).urlAugmentation || ((message as MessageFull).urlAugmentation && (message as MessageFull).urlAugmentation!.type !== 'intro')) && (
                        <ReactionComponent messageId={(message as MessageFull).id} />
                    )}
                </XHorizontal>
                {menu}
            </MenuWrapper>
        );
    }

    private reactionsRender = () => {
        const { message } = this.props;

        if (!(message as MessageFull).urlAugmentation || ((message as MessageFull).urlAugmentation && (message as MessageFull).urlAugmentation!.type !== 'intro')) {
            return (
                <Reactions
                    messageId={(message as MessageFull).id}
                    reactions={(message as MessageFull).reactions}
                    meId={(this.props.me as UserShort).id}
                />
            );
        }
        return null;
    }

    render() {
        const { message } = this.props;
        const { compact } = this.props;

        let content: any[] = [];
        let date: any = null;
        let edited = isServerMessage(this.props.message) && this.props.message.edited;

        let isSelect = false;
        let hideMenu = false;
        let { forwardMessagesId } = this.props.messagesContext;
        if (forwardMessagesId) {
            isSelect = forwardMessagesId.has((message as MessageFull).id);
            if (forwardMessagesId.size > 0) {
                hideMenu = true;
            }
        }

        if (isServerMessage(message)) {
            if (this.state.isEditView && message.message) {
                content.push(<EditMessageInlineWrapper message={message} key={'editForm'} onClose={this.hideEditView} />);
            } else {
                if (message.message && message.message.length > 0) {
                    if (message.urlAugmentation && message.urlAugmentation.type === 'intro') {
                        content.push(null);
                    } else {
                        content.push(<MessageTextComponent message={message.message} mentions={message.mentions} key={'text'} isService={message.isService} isEdited={edited} />);
                    }
                }
                const { file, fileMetadata } = message;
                if (file && !message.urlAugmentation) {
                    let w = fileMetadata!!.imageWidth ? fileMetadata!!.imageWidth!! : undefined;
                    let h = fileMetadata!!.imageHeight ? fileMetadata!!.imageHeight!! : undefined;
                    let name = fileMetadata!!.name ? fileMetadata!!.name!! : undefined;
                    let size = fileMetadata!!.size ? fileMetadata!!.size!! : undefined;

                    if (message.fileMetadata!!.isImage && !!w && !!h) {
                        if (message.fileMetadata!!.imageFormat === 'GIF') {
                            content.push(<MessageAnimationComponent key={'file'} file={file} fileName={name} width={w} height={h} />);
                        } else {
                            content.push(<MessageImageComponent key={'file'} file={file} fileName={name} width={w} height={h} startSelected={hideMenu} />);
                        }
                    } else {
                        content.push(<MessageFileComponent key={'file'} file={file} fileName={name} fileSize={size} />);
                    }
                }
                if (message.urlAugmentation) {
                    if (message.urlAugmentation.type === 'intro' && message.urlAugmentation.user) {
                        content.push(
                            <MessageIntroComponent
                                key="intro"
                                urlAugmentation={message.urlAugmentation}
                                file={message.file}
                                fileMetadata={message.fileMetadata}
                                user={message.urlAugmentation.user as MessageFull_urlAugmentation_user_User}
                                messageId={(message as MessageFull).id}
                                reactions={(message as MessageFull).reactions}
                                meId={(this.props.me as UserShort).id}
                                senderId={message.sender.id}
                                conversationType={this.props.conversationType}
                            />
                        );
                    } else {
                        if (message.urlAugmentation.url.startsWith('https://app.openland.com/o') && message.urlAugmentation.url.includes('listings#')) {
                            content = [];
                        }
                        content.push(
                            <MessageUrlAugmentationComponent
                                key="urlAugmentation"
                                {...message.urlAugmentation}
                                messageId={message.id}
                                isMe={this.props.sender && this.props.me ? (this.props.sender.id === this.props.me.id) : false}
                            />
                        );
                    }
                }
                if ((message as MessageFull).reply && (message as MessageFull).reply!.length > 0) {
                    content.push(
                        <ReplyMessageWrapper key={'reply_message' + message.id}>
                            {(message as MessageFull).reply!.map((i, j) => (
                                <MessageReplyComponent
                                    mentions={message.mentions}
                                    sender={i.sender}
                                    date={i.date}
                                    message={i.message}
                                    id={i.id}
                                    key={'reply_message' + i.id + j}
                                    edited={i.edited}
                                    file={i.file}
                                    fileMetadata={i.fileMetadata}
                                    startSelected={hideMenu}
                                />
                            ))}
                        </ReplyMessageWrapper>
                    );
                }
                date = <XDate value={message.date} format="time" />;
            }
        } else {
            if (message.message && message.message.length > 0) {
                content.push(<MessageTextComponent message={message.message} mentions={message.mentions} key={'text'} isService={false} isEdited={edited} />);
            }
            if (message.file) {
                content.push(
                    <MessageUploadComponent
                        key={'file'}
                        progress={Math.round(message.progress * 100)}
                        title={'Uploading ' + message.file + ' (' + Math.round(message.progress * 100) + '%)'}
                    />
                );
            }
            date = 'Sending...';
            if (message.failed) {
                date = 'Failed';
                let key = message.key;
                content.push(
                    <XHorizontal>
                        <XButton onClick={() => this.props.conversation.cancelMessage(key)} text="Cancel" />
                        <XButton onClick={() => this.props.conversation.retryMessage(key)} text="Try Again" />
                    </XHorizontal>
                );
            }
        }

        // Handle unknown messages: display empty message
        if (content.length === 0) {
            content.push(<MessageTextComponent message={''} mentions={null} key={'text'} isService={false} isEdited={edited} />);
        }

        let isIntro = false;
        if ((message as MessageFull).urlAugmentation && (message as MessageFull).urlAugmentation!.type === 'intro') {
            isIntro = true;
        }
        let orgPath: string | undefined = undefined;
        if (this.props.sender!!.primaryOrganization && !hideMenu) {
            orgPath = '/mail/o/' + this.props.sender!!.primaryOrganization!!.id;
        }

        if (compact) {
            return (
                <MessageWrapper
                    onClick={this.selectMessage}
                    compact={true}
                    isEditView={this.state.isEditView}
                    separator={6}
                    alignItems="center"
                    startSelected={hideMenu}
                >
                    <Check select={isSelect} className="check-icon" />
                    <MessageCompactContainer
                        separator={0}
                        className="message-container"
                    >
                        <DateComponent small={true} className="time">{date}</DateComponent>
                        <XHorizontal justifyContent="space-between" flexGrow={1} maxWidth={'calc(100% - 60px)'}>
                            <MessageCompactContent separator={0} flexGrow={1} maxWidth={'calc(100% - 85px)'} isIntro={isIntro}>
                                {content}
                                {this.reactionsRender()}
                            </MessageCompactContent>
                        </XHorizontal>
                    </MessageCompactContainer>
                    {this.menuRender(compact)}
                </MessageWrapper>
            );
        }

        return (
            <MessageWrapper
                onClick={this.selectMessage}
                compact={false}
                isEditView={this.state.isEditView}
                separator={6}
                alignItems="center"
                startSelected={hideMenu}
            >
                <Check select={isSelect} className="check-icon" />
                <MessageContainer
                    separator={0}
                    className="message-container"
                >
                    <XHorizontal alignSelf="stretch">
                        {this.props.sender && (this.props.conversationType !== 'PRIVATE') && (
                            <UserPopper
                                user={this.props.sender}
                                isMe={this.props.me ? (this.props.sender.id === this.props.me.id) : false}
                                startSelected={hideMenu}
                            />
                        )}
                        {this.props.sender && (this.props.conversationType === 'PRIVATE') && (
                            <UserAvatar user={this.props.sender} startSelected={hideMenu} />
                        )}
                        <XVertical separator={2} flexGrow={1} maxWidth={'calc(100% - 57px)'}>
                            <XHorizontal justifyContent="space-between">
                                <XHorizontal separator={4}>
                                    <XHorizontal separator={4} alignItems="center">
                                        <Name>{this.props.sender!!.name}</Name>
                                        {this.props.sender!!.primaryOrganization && <Organization path={orgPath}>{this.props.sender!!.primaryOrganization!!.name}</Organization>}
                                    </XHorizontal>
                                    <DateComponent className="time">{date}</DateComponent>
                                </XHorizontal>
                            </XHorizontal>
                            {content}
                            {this.reactionsRender()}
                        </XVertical>
                    </XHorizontal>
                </MessageContainer>
                {this.menuRender(compact)}
            </MessageWrapper>
        );
    }
}

export class MessageComponent extends React.Component<MessageComponentProps> {
    render() {
        return (
            <MessagesStateContext.Consumer>
                {(state: MessagesStateContextProps) => (
                    <MessageComponentInner {...this.props} messagesContext={state} />
                )}
            </MessagesStateContext.Consumer>
        );
    }
}