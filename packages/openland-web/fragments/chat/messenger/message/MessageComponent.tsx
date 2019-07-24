import * as React from 'react';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import { MessageReactions } from './reactions/MessageReactions';
import { MessageContent } from './MessageContent';
import { MAvatar } from './MAvatar';
import { css, cx } from 'linaria';

const messageContainerClass = css`
    display: flex;
    flex-direction: row;
`;

const messageContentAreaClass = css`
    display: flex;
    flex-direction: column;
`;

const noAvatarPlaceholder = css`
    margin-left: 40px;
`;

export const MessageComponent = (props: { message: DataSourceWebMessageItem }) => {
    let { message } = props;

    let content = (
        <>
            <MessageContent message={message} />
            <MessageReactions messageId={message.id} reactions={message.reactions} />
        </>
    );
    return (
        <div className={messageContainerClass}>
            {!message.attachTop && <MAvatar senderPhoto={message.senderPhoto} senderNameEmojify={message.senderNameEmojify} senderName={message.senderName} senderId={message.senderId} />}
            <div className={cx(messageContentAreaClass, message.attachTop && noAvatarPlaceholder)}>
                {props.message.senderNameEmojify}
                {content}
            </div>
        </div >
    );
};