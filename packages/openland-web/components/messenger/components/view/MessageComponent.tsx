import * as React from 'react';
import Glamorous from 'glamorous';
import { MessageFull, UserShort } from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { MessageTextComponent } from './content/MessageTextComponent';
import { MessageAnimationComponent } from './content/MessageAnimationComponent';
import { XDate } from 'openland-x-format/XDate';
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
import { EditMessageInlineWrapper } from './MessageEditComponent';
import { ReactionComponent } from './MessageReaction';
import { Reactions } from './MessageReaction';
import { EditMessageContext, EditMessageContextProps } from '../EditMessageContext';
import ReplyIcon from '../icons/ic-reply.svg';
import { UserPopper, UserAvatar } from './content/UserPopper';

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

const MessageContainer = Glamorous.div<{ compact: boolean, isHovered?: boolean, editView: boolean }>((props) => ({
    display: 'flex',
    flexDirection: props.compact ? 'row' : 'column',
    paddingLeft: props.compact ? 7 : 10,
    paddingRight: 10,
    paddingTop: props.compact ? 3 : 7,
    paddingBottom: 3,
    width: '100%',
    marginTop: props.compact ? undefined : 12,
    borderRadius: 6,
    '& .time': {
        opacity: props.compact ? 0 : 1
    },
    '& .menu > div': {
        height: 20,
        marginRight: -14
    },
    '& .menu-wrapper, & .reactions-wrapper .reaction-button': {
        opacity: 0,
        display: props.editView ? 'none' : undefined
    },
    '&:hover': {
        backgroundColor: '#F9F9F9',
        '& .menu-wrapper, & .time, & .reactions-wrapper .reaction-button': {
            opacity: props.editView ? 0 : 1
        }
    },
    '&': (props.isHovered) ? { backgroundColor: '#F9F9F9' } : {}
}));

const MessageCompactContent = Glamorous(XVertical)<{ isIntro?: boolean }>(props => ({
    paddingRight: (props.isIntro === true) ? 0 : 20,
    '& .url-augmentation': (props.isIntro === true) ? {} : {
        width: 'calc(100% + 20px)'
    }
}));

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
    conversationType?: string;
}

interface MessageComponentInnerProps extends MessageComponentProps {
    messageEditor: EditMessageContextProps;
}

class MessageComponentInner extends React.PureComponent<MessageComponentInnerProps, { isEditView: boolean, isMenuOpen: boolean }> {
    static getDerivedStateFromProps = (props: MessageComponentInnerProps, state: { isEditView: boolean, isMenuOpen: boolean }) => {
        if (isServerMessage(props.message)) {
            if (props.messageEditor.editMessageId === props.message.id) {
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

    switchMenu = () => {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        });
    }

    showEditView = () => {
        if (isServerMessage(this.props.message)) {
            this.props.messageEditor.setEditMessageId(this.props.message.id);
        }
    }

    hideEditView = () => {
        this.props.messageEditor.setEditMessageId(null);
    }

    render() {
        const { message } = this.props;
        let content: any[] = [];
        let date: any = null;
        let edited = isServerMessage(this.props.message) && this.props.message.edited;

        if (isServerMessage(message)) {
            if (this.state.isEditView && message.message) {
                content.push(<EditMessageInlineWrapper message={message} key={'editForm'} onClose={this.hideEditView} />);
            } else {
                if (message.message && message.message.length > 0) {
                    if (message.urlAugmentation && message.urlAugmentation.type === 'intro') {
                        content.push(null);
                    } else {
                        content.push(<MessageTextComponent message={message.message} key={'text'} isService={message.isService} isEdited={edited} />);
                    }
                }
                if (message.file && !message.urlAugmentation) {
                    let w = message.fileMetadata!!.imageWidth ? message.fileMetadata!!.imageWidth!! : undefined;
                    let h = message.fileMetadata!!.imageHeight ? message.fileMetadata!!.imageHeight!! : undefined;
                    let name = message.fileMetadata!!.name ? message.fileMetadata!!.name!! : undefined;
                    let size = message.fileMetadata!!.size ? message.fileMetadata!!.size!! : undefined;

                    if (message.fileMetadata!!.isImage && !!w && !!h) {
                        if (message.fileMetadata!!.imageFormat === 'GIF') {
                            content.push(<MessageAnimationComponent key={'file'} file={message.file} fileName={name} width={w} height={h} />);
                        } else {
                            content.push(<MessageImageComponent key={'file'} file={message.file} fileName={name} width={w} height={h} />);
                        }
                    } else {
                        content.push(<MessageFileComponent key={'file'} file={message.file} fileName={name} fileSize={size} />);
                    }
                }
                if (message.urlAugmentation) {
                    if (message.urlAugmentation.type === 'intro') {
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
                    }
                    if (message.urlAugmentation.type !== 'intro') {
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
                if ((message as MessageFull).reply) {
                    let replyMessage = (message as MessageFull).reply![0];
                    content.push(
                        <MessageReplyComponent
                            sender={replyMessage.sender}
                            date={replyMessage.date}
                            message={replyMessage.message}
                            id={replyMessage.id}
                            key={'reply'}
                            edited={replyMessage.edited}
                        />
                    );
                }
            }
            date = <XDate value={message.date} format="time" />;
        } else {
            if (message.message && message.message.length > 0) {
                content.push(<MessageTextComponent message={message.message} key={'text'} isService={false} isEdited={edited} />);
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
            content.push(<MessageTextComponent message={''} key={'text'} isService={false} isEdited={edited} />);
        }

        // menu
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
                                {message.message && <XMenuItem onClick={this.showEditView}>Edit</XMenuItem>}
                                <XMenuItem style="danger" query={{ field: 'deleteMessage', value: message.id }}>Delete</XMenuItem>
                            </>
                        }
                    />
                </XVertical>
            ) : (isServerMessage(message) && this.props.conversationType === 'ChannelConversation') ? (
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
        let isIntro = false;
        if ((message as MessageFull).urlAugmentation && (message as MessageFull).urlAugmentation!.type === 'intro') {
            isIntro = true;
        }
        if (this.props.compact) {
            return (
                <MessageContainer className="compact-message" compact={true} isHovered={this.state.isEditView || this.state.isMenuOpen} editView={this.state.isEditView}>
                    <DateComponent small={true} className="time">{date}</DateComponent>
                    <XHorizontal justifyContent="space-between" flexGrow={1} maxWidth={'calc(100% - 60px)'}>
                        <MessageCompactContent separator={0} flexGrow={1} maxWidth={'calc(100% - 85px)'} isIntro={isIntro}>
                            {content}
                            {(!(message as MessageFull).urlAugmentation || ((message as MessageFull).urlAugmentation && (message as MessageFull).urlAugmentation!.type !== 'intro')) && (
                                <Reactions
                                    messageId={(message as MessageFull).id}
                                    reactions={(message as MessageFull).reactions}
                                    meId={(this.props.me as UserShort).id}
                                />
                            )}
                        </MessageCompactContent>
                        <XHorizontal alignItems="center" separator={0} alignSelf="flex-start" className="menu-wrapper">
                            <XHorizontal alignItems="center" separator={6}>
                                <ReplyButton query={{ field: 'replyMessage', value: (message as MessageFull).id }}>
                                    <ReplyIcon />
                                </ReplyButton>
                                {(!(message as MessageFull).urlAugmentation || ((message as MessageFull).urlAugmentation && (message as MessageFull).urlAugmentation!.type !== 'intro')) && (
                                    <ReactionComponent messageId={(message as MessageFull).id} />
                                )}
                            </XHorizontal>
                            {menu}
                        </XHorizontal>
                    </XHorizontal>
                </MessageContainer>
            );
        }

        return (
            <MessageContainer className="full-message" compact={false} isHovered={this.state.isEditView || this.state.isMenuOpen} editView={this.state.isEditView}>
                <XHorizontal alignSelf="stretch">
                    {this.props.sender && (this.props.conversationType !== 'PrivateConversation') && (
                        <UserPopper
                            user={this.props.sender}
                            isMe={this.props.me ? (this.props.sender.id === this.props.me.id) : false}
                        />
                    )}
                    {this.props.sender && (this.props.conversationType === 'PrivateConversation') && (
                        <UserAvatar user={this.props.sender} />
                    )}
                    <XVertical separator={2} flexGrow={1} maxWidth={'calc(100% - 60px)'}>
                        <XHorizontal justifyContent="space-between">
                            <XHorizontal separator={4}>
                                <XHorizontal separator={4} alignItems="center">
                                    <Name>{this.props.sender!!.name}</Name>
                                    {this.props.sender!!.primaryOrganization && <Organization path={'/mail/o/' + this.props.sender!!.primaryOrganization!!.id}>{this.props.sender!!.primaryOrganization!!.name}</Organization>}
                                </XHorizontal>
                                <DateComponent className="time">{date}</DateComponent>
                            </XHorizontal>
                            <XHorizontal alignItems="center" separator={0} className="menu-wrapper">
                                <XHorizontal alignItems="center" separator={6}>
                                    <ReplyButton query={{ field: 'replyMessage', value: (message as MessageFull).id }}>
                                        <ReplyIcon />
                                    </ReplyButton>
                                    {(!(message as MessageFull).urlAugmentation || ((message as MessageFull).urlAugmentation && (message as MessageFull).urlAugmentation!.type !== 'intro')) && (
                                        <ReactionComponent messageId={(message as MessageFull).id} />
                                    )}
                                </XHorizontal>
                                {menu}
                            </XHorizontal>
                        </XHorizontal>
                        {content}
                        {(!(message as MessageFull).urlAugmentation || ((message as MessageFull).urlAugmentation && (message as MessageFull).urlAugmentation!.type !== 'intro')) && (
                            <Reactions
                                messageId={(message as MessageFull).id}
                                reactions={(message as MessageFull).reactions}
                                meId={(this.props.me as UserShort).id}
                            />
                        )}
                    </XVertical>
                </XHorizontal>
            </MessageContainer>
        );
    }
}

export class MessageComponent extends React.Component<MessageComponentProps> {
    render() {
        return (
            <EditMessageContext.Consumer>
                {(editor: EditMessageContextProps) => (
                    <MessageComponentInner {...this.props} messageEditor={editor} />
                )}
            </EditMessageContext.Consumer>
        );
    }
}