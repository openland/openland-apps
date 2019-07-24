import * as React from 'react';
import { convertMessage } from 'openland-engines/messenger/ConversationEngine';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { convertDsMessage, DataSourceWebMessageItem } from '../../chat/messenger/data/WebMessageItemDataSource';
import { MessageContent } from '../../chat/messenger/message/MessageContent';
import { MessageComments_messageComments_comments_comment } from 'openland-api/Types';

interface CommentViewProps {
    comment: MessageComments_messageComments_comments_comment;
    depth: number;
}

export const CommentView = React.memo((props: CommentViewProps) => {
    const { comment, depth } = props;
    const messenger = React.useContext(MessengerContext);
    const [converted] = React.useState<DataSourceWebMessageItem>(convertDsMessage(convertMessage(comment, '', messenger)));

    return (
        <div style={{ paddingLeft: depth * 50 }}>
            {converted.senderNameEmojify}
            <MessageContent message={converted} />
        </div>
    );
});