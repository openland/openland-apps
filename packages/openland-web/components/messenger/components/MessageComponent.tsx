import * as React from 'react';
import Glamorous from 'glamorous';
import { MessageFullFragment, UserShortFragment } from 'openland-api/Types';
import { PendingMessage } from '../model/types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatar } from 'openland-x/XAvatar';
import { XVertical } from 'openland-x-layout/XVertical';
import { MessageTextComponent } from './content/MessageTextComponent';
import { MessageAnimationComponent } from './content/MessageAnimationComponent';
import { XDate } from 'openland-x-format/XDate';
import { XButton } from 'openland-x/XButton';
import { MessageImageComponent } from './content/MessageImageComponent';
import { MessageFileComponent } from './content/MessageFileComponent';

interface MessageComponentProps {
    compact: boolean;
    sender?: UserShortFragment;
    message: MessageFullFragment | PendingMessage;
    onRetry: (key: string) => void;
    onCancel: (key: string) => void;
}

function isServerMessage(message: MessageFullFragment | PendingMessage): message is MessageFullFragment {
    return !!(message as any).__typename;
}

const Name = Glamorous.div({
    fontSize: '14px',
    fontWeight: 500,
});

const DateComponent = Glamorous.div({
    fontSize: '14px',
    fontWeight: 300,
    opacity: 0.4
});

const MessageContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '24px',
    paddingRight: '24px',
    paddingTop: '4px',
    paddingBottom: '4px',
    '&:hover': {
        backgroundColor: '#f8f8fb'
    },
});

const MessageCompactContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '78px',
    paddingRight: '24px',
    paddingTop: '4px',
    paddingBottom: '4px',
    '&:hover': {
        backgroundColor: '#f8f8fb'
    },
});

export class MessageComponent extends React.PureComponent<MessageComponentProps> {
    render() {
        let content: any[] = [];
        if (this.props.message.message && this.props.message.message.length > 0) {
            content.push(<MessageTextComponent message={this.props.message.message} key={'text'} />);
        }
        let date: any = null;
        if (isServerMessage(this.props.message)) {
            if (this.props.message.file) {
                let w = this.props.message.fileMetadata!!.imageWidth ? this.props.message.fileMetadata!!.imageWidth!! : undefined;
                let h = this.props.message.fileMetadata!!.imageHeight ? this.props.message.fileMetadata!!.imageHeight!! : undefined;
                let name = this.props.message.fileMetadata!!.name ? this.props.message.fileMetadata!!.name!! : undefined;
                let size = this.props.message.fileMetadata!!.size ? this.props.message.fileMetadata!!.size!! : undefined;
                if (this.props.message.fileMetadata!!.isImage) {
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
            if (this.props.message.file) {
                content.push(<MessageFileComponent key={'file'} file={this.props.message.file} />);
            }
            date = 'Sending...';
            if (this.props.message.failed) {
                date = 'Failed';
                let key = this.props.message.key;
                content.push(
                    <XHorizontal>
                        <XButton onClick={() => this.props.onCancel(key)} text="Cancel" />
                        <XButton onClick={() => this.props.onRetry(key)} text="Try Again" />
                    </XHorizontal>
                );
            }
        }

        // Handle unknown messages: display empty message
        if (content.length === 0) {
            content.push(<MessageTextComponent message={''} key={'text'} />);
        }

        if (this.props.compact) {
            return (
                <MessageCompactContainer>
                    {content}
                </MessageCompactContainer>
            );
        }

        return (
            <MessageContainer>
                <XHorizontal alignSelf="stretch">
                    <XAvatar cloudImageUuid={this.props.sender ? this.props.sender.picture!! : undefined} path={'/mail/u/' + this.props.sender!!.id} />
                    <XVertical separator={'none'} flexGrow={1}>
                        <XHorizontal separator={4}>
                            <Name>{this.props.sender!!.name}</Name><DateComponent>{date}</DateComponent>
                        </XHorizontal>
                        {content}
                    </XVertical>
                </XHorizontal>
            </MessageContainer>
        );
    }
}