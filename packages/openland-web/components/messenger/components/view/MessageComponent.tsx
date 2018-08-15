import * as React from 'react';
import Glamorous from 'glamorous';
import { MessageFullFragment, UserShortFragment } from 'openland-api/Types';
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
import { isServerMessage, PendingMessage } from 'openland-engines/messenger/types';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';

interface MessageComponentProps {
    compact: boolean;
    sender?: UserShortFragment;
    message: MessageFullFragment | PendingMessage;
    conversation: ConversationEngine;
}

const MessageWrapper = Glamorous(XVertical)({
    width: '100%'
});

const Name = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
});

const Organization = Glamorous.div({
    fontSize: 14,
    fontWeight: 400,
    opacity: 0.5
});

const DateComponent = Glamorous.div<{small?: boolean}>((props) => ({
    width: props.small ? 56 : 62,
    fontSize: props.small ? 13 : 14,
    fontWeight: 300,
    opacity: 0.5,
    color: '#334562'
}));

const MessageContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 4,
    paddingBottom: 4,
    width: '100%',
    marginBottom: 12,
    borderRadius: 5,
    '&:hover': {
        backgroundColor: 'rgba(248, 248, 251, 0.7)'
    },
});

const MessageCompactContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 4,
    paddingBottom: 4,
    width: '100%',
    marginTop: -12,
    marginBottom: 12,
    borderRadius: 5,
    '&:hover': {
        backgroundColor: 'rgba(248, 248, 251, 0.7)',
        '& > .time': {
            opacity: 0.5
        }
    },
    '& > .time': {
        opacity: 0
    }
});

export class MessageComponent extends React.PureComponent<MessageComponentProps> {
    render() {
        let content: any[] = [];
        let date: any = null;
        if (isServerMessage(this.props.message)) {
            if (this.props.message.message && this.props.message.message.length > 0) {
                content.push(<MessageTextComponent message={this.props.message.message} key={'text'} isService={this.props.message.isService} />);
            }
            if (this.props.message.file) {
                let w = this.props.message.fileMetadata!!.imageWidth ? this.props.message.fileMetadata!!.imageWidth!! : undefined;
                let h = this.props.message.fileMetadata!!.imageHeight ? this.props.message.fileMetadata!!.imageHeight!! : undefined;
                let name = this.props.message.fileMetadata!!.name ? this.props.message.fileMetadata!!.name!! : undefined;
                let size = this.props.message.fileMetadata!!.size ? this.props.message.fileMetadata!!.size!! : undefined;
                if (this.props.message.fileMetadata!!.isImage && !!w && !!h) {
                    if (this.props.message.fileMetadata!!.imageFormat === 'GIF') {
                        content.push(<MessageAnimationComponent key={'file'} file={this.props.message.file} fileName={name} width={w} height={h} />);
                    } else {
                        content.push(<MessageImageComponent key={'file'} file={this.props.message.file} fileName={name} width={w} height={h} />);
                    }
                } else {
                    content.push(<MessageFileComponent key={'file'} file={this.props.message.file} fileName={name} fileSize={size} />);
                }
            }
            date = <XDate value={this.props.message.date} format="time" />;
        } else {
            if (this.props.message.message && this.props.message.message.length > 0) {
                content.push(<MessageTextComponent message={this.props.message.message} key={'text'} isService={false} />);
            }
            if (this.props.message.file) {
                content.push(
                    <MessageUploadComponent
                        key={'file'}
                        progress={Math.round(this.props.message.progress * 100)}
                        title={'Uploading ' + this.props.message.file + ' (' + Math.round(this.props.message.progress * 100) + '%)'}
                    />
                );
            }
            date = 'Sending...';
            if (this.props.message.failed) {
                date = 'Failed';
                let key = this.props.message.key;
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

        if (this.props.compact) {
            return (
                <MessageCompactContainer className="compact-message">
                    <DateComponent small={true} className="time">{date}</DateComponent>
                    {content}
                </MessageCompactContainer>
            );
        }

        return (
            <MessageContainer className="full-message">
                <XHorizontal alignSelf="stretch">
                    <XAvatar cloudImageUuid={this.props.sender ? this.props.sender.picture!! : undefined} path={'/mail/' + this.props.sender!!.id} />
                    <MessageWrapper separator={'none'} flexGrow={1}>
                        <XHorizontal separator={4}>
                            <Name>{this.props.sender!!.name}</Name>
                            {this.props.sender!!.primaryOrganization && <Organization>{this.props.sender!!.primaryOrganization!!.name}</Organization>}
                            <DateComponent>{date}</DateComponent>
                        </XHorizontal>
                        {content}
                    </MessageWrapper>
                </XHorizontal>
            </MessageContainer>
        );
    }
}