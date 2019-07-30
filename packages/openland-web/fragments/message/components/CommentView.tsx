import * as React from 'react';
import { MessageContent } from '../../chat/messenger/message/MessageContent';
import { MessageComments_messageComments_comments_comment } from 'openland-api/Types';
import { processSpans } from 'openland-y-utils/spans/processSpans';
import { Span } from 'openland-y-utils/spans/Span';
import { emoji } from 'openland-y-utils/emoji';
import { css } from 'linaria';
import { CommentTools } from './CommentTools';
import { CommentInput } from './CommentInput';
import { URickTextValue } from 'openland-web/components/unicorn/URickInput';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { MessageSenderContent } from 'openland-web/fragments/chat/messenger/message/MessageComponent';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';

const avatarWrapper = css`
    flex-shrink: 0;
    padding-top: 6px;
`;

const content = css`
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    padding-left: 16px;
    flex-direction: column;
`;

const wrapper = css`
    display: flex;
    flex-direction: row;
    padding: 8px 0;
    margin-bottom: 8px;
`;

interface CommentViewProps {
    comment: MessageComments_messageComments_comments_comment;
    deleted: boolean;
    depth: number;
    highlighted: boolean;
    groupId?: string;
    onReplyClick: (id: string) => void;
    onDeleteClick: (id: string) => void;
    onReactionClick: (comment: MessageComments_messageComments_comments_comment) => void;
    onSent: (data: URickTextValue) => void;
}

export const CommentView = React.memo((props: CommentViewProps) => {
    const messenger = React.useContext(MessengerContext);
    const { comment, deleted, depth, highlighted, groupId, onReplyClick, onDeleteClick, onReactionClick, onSent } = props;
    const { id, sender, message, attachments, spans, fallback, date, reactions } = comment;
    const [textSpans, setTextSpans] = React.useState<Span[]>([]);
    const [senderNameEmojify, setSenderNameEmojify] = React.useState<string | JSX.Element>(sender.name);

    React.useEffect(() => {
        setTextSpans(processSpans(message || '', spans));
    }, [message, spans]);

    React.useEffect(() => {
        setSenderNameEmojify(emoji(sender.name));
    }, [sender.name]);

    const canEdit = sender.id === messenger.user.id;

    return (
        <div className={wrapper} style={{ paddingLeft: depth > 0 ? 56 + ((depth - 1) * 40) : undefined }}>
            <div className={avatarWrapper}>
                <UAvatar
                    id={sender.id}
                    title={sender.name}
                    photo={sender.photo}
                    size={depth > 0 ? 'x-small' : 'medium'}
                />
            </div>
            <div className={content}>
                <MessageSenderContent
                    sender={sender}
                    senderNameEmojify={senderNameEmojify}
                    date={parseInt(date, 10)}
                />
                <MessageContent
                    id={id}
                    text={message}
                    textSpans={textSpans}
                    attachments={attachments}
                    fallback={fallback}
                />
                {!deleted && (
                    <CommentTools
                        reactions={reactions}
                        onReactionClick={() => onReactionClick(comment)}
                        onReplyClick={() => onReplyClick(id)}
                        onDeleteClick={canEdit ? () => onDeleteClick(id) : undefined}
                    />
                )}
                {highlighted && (
                    <CommentInput
                        onSent={onSent}
                        groupId={groupId}
                        compact={true}
                    />
                )}
            </div>
        </div>
    );
});