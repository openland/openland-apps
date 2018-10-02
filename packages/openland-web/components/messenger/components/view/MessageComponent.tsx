import * as React from 'react';
import Glamorous from 'glamorous';
import { MessageFull, UserShort } from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatar } from 'openland-x/XAvatar';
import { XVertical } from 'openland-x-layout/XVertical';
import { MessageTextComponent } from './content/MessageTextComponent';
import { MessageAnimationComponent } from './content/MessageAnimationComponent';
import { XDate } from 'openland-x-format/XDate';
import { XButton } from 'openland-x/XButton';
import { MessageImageComponent } from './content/MessageImageComponent';
import { MessageFileComponent } from './content/MessageFileComponent';
import { MessageUploadComponent } from './content/MessageUploadComponent';
import { MessageIntroComponent } from './content/MessageIntroComponent';
import { isServerMessage, PendingMessage } from 'openland-engines/messenger/types';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { MessageUrlAugmentationComponent } from './content/MessageUrlAugmentationComponent';
import { makeNavigable, NavigableChildProps } from 'openland-x/Navigable';
import { XOverflow } from '../../../Incubator/XOverflow';
import { XMenuItem } from 'openland-x/XMenuItem';
import { MessageFull_urlAugmentation_user_User } from 'openland-api/Types';

interface MessageComponentProps {
    compact: boolean;
    sender?: UserShort;
    message: MessageFull | PendingMessage;
    conversation: ConversationEngine;
    out: boolean;
    me?: UserShort | null;
}

const MessageWrapper = Glamorous(XVertical)({
    width: 'calc(100% - 60px)'
});

const Name = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    color: '#121e2b'
});

const Organization = makeNavigable(Glamorous.div<NavigableChildProps>(() => ({
    fontSize: 12,
    fontWeight: 500,
    color: '#99A2B0',
    letterSpacing: -0.2,
    alignSelf: 'flex-end',
    marginBottom: -1,
    cursor: 'pointer'
})));

const DateComponent = Glamorous.div<{ small?: boolean }>((props) => ({
    flexShrink: 0,
    width: props.small ? 56 : 62,
    marginBottom: props.small ? undefined : -1,
    fontSize: 11,
    paddingTop: props.small ? 3 : 1,
    fontWeight: 500,
    letterSpacing: -0.2,
    whiteSpace: 'nowrap',
    color: '#99A2B0'
}));

const MessageContainer = Glamorous.div<{ compact: boolean }>((props) => ({
    display: 'flex',
    flexDirection: props.compact ? 'row' : 'column',
    alignItems: props.compact ? 'center' : undefined,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: props.compact ? 3 : 7,
    paddingBottom: 3,
    width: '100%',
    marginTop: props.compact ? undefined : 12,
    // marginBottom: 12,
    borderRadius: 6,
    '&:hover': {
        backgroundColor: 'rgba(242, 244, 245, 0.5)',
        '& .time': {
            opacity: 1
        },
        '& .menu': {
            display: 'block',
        }
    },
    '& .time': {
        opacity: props.compact ? 0 : 1
    },
    '& .menu > div': {
        height: 20,
        marginRight: -14
    },
    '& .menu': {
        display: 'none'
    }
}));

const MenuWrapper = Glamorous.div<{ compact: boolean }>(props => ({
    position: 'absolute',
    right: props.compact ? -8 : 0,
    top: 0
}));

export class MessageComponent extends React.PureComponent<MessageComponentProps> {
    render() {
        const { message } = this.props;
        let content: any[] = [];
        let date: any = null;
        if (isServerMessage(message)) {
            if (message.message && message.message.length > 0) {
                if (message.urlAugmentation && message.urlAugmentation.type === 'intro') {
                    content.push(null);
                } else {
                    content.push(<MessageTextComponent message={message.message} key={'text'} isService={message.isService} />);
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
                        />
                    );
                }
                if (message.urlAugmentation.type !== 'intro') {
                    if (message.urlAugmentation.url.startsWith('https://app.openland.com/o') && message.urlAugmentation.url.includes('listings#')) {
                        content = [];
                    }
                    content.push(<MessageUrlAugmentationComponent key="urlAugmentation" {...message.urlAugmentation} />);
                }
            }
            date = <XDate value={message.date} format="time" />;
        } else {
            if (message.message && message.message.length > 0) {
                content.push(<MessageTextComponent message={message.message} key={'text'} isService={false} />);
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
            content.push(<MessageTextComponent message={''} key={'text'} isService={false} />);
        }

        // menu
        let menu = isServerMessage(message) && this.props.out ?
            (
                <MenuWrapper className="menu" compact={this.props.compact}>
                    <XOverflow
                        flat={true}
                        placement="bottom-end"
                        content={
                            <>
                                {message.message && <XMenuItem style="primary-sky-blue" query={{ field: 'editMessage', value: message.id }}>Edit</XMenuItem>}
                                <XMenuItem style="danger" query={{ field: 'deleteMessage', value: message.id }}>Delete</XMenuItem>
                            </>
                        }
                    />
                </MenuWrapper>
            ) : null;
        if (this.props.compact) {
            return (
                <MessageContainer className="compact-message" compact={true}>
                    <DateComponent small={true} className="time">{date}</DateComponent>
                    <XVertical separator={0} flexGrow={1} maxWidth="calc(100% - 64px)">
                        {content}
                        {menu}
                    </XVertical>
                </MessageContainer>
            );
        }

        return (
            <MessageContainer className="full-message" compact={false}>
                <XHorizontal alignSelf="stretch">
                    <XAvatar
                        style="colorus"
                        userName={this.props.sender!!.name}
                        userId={this.props.sender!!.id}
                        cloudImageUuid={this.props.sender ? this.props.sender.picture!! : undefined}
                        path={'/mail/u/' + this.props.sender!!.id}
                    />
                    <MessageWrapper separator={2} flexGrow={1}>
                        <XHorizontal separator={4}>
                            <XHorizontal separator={4} alignItems="center">
                                <Name>{this.props.sender!!.name}</Name>
                                {this.props.sender!!.primaryOrganization && <Organization path={'/mail/o/' + this.props.sender!!.primaryOrganization!!.id}>{this.props.sender!!.primaryOrganization!!.name}</Organization>}
                            </XHorizontal>
                            <DateComponent className="time">{date}</DateComponent>
                        </XHorizontal>
                        {content}
                    </MessageWrapper>
                    {menu}
                </XHorizontal>
            </MessageContainer>
        );
    }
}