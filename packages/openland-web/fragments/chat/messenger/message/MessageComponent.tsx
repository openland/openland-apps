import * as React from 'react';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import { MessageReactions } from './reactions/MessageReactions';
import { MessageContent } from './MessageContent';
import { MAvatar } from './MAvatar';
import { css, cx } from 'linaria';

const messageContainerClass = css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    max-width: 984px;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 4px;
    padding-bottom: 4px;
`;

const messageContentAreaClass = css`
    display: flex;
    flex-direction: column;
    padding-left: 16px
`;

const noAvatarPlaceholder = css`
    padding-left: 56px;
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