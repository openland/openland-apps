import * as React from 'react';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import { MessageContent } from './MessageContent';
import { MessageReactions } from './reactions/MessageReactions';

export const MessageComponent = (props: { message: DataSourceWebMessageItem }) => {
    let { message } = props;
    // place to header and all callbacks
    return (
        <>
            <MessageContent message={message} />
            <>
                {/* for buttons: reactions, comments */}
                <MessageReactions messageId={message.id} reactions={message.reactions} />
            </>
        </>
    );
};