import * as React from 'react';
import { MessageContent } from '../../chat/messenger/message/MessageContent';
import { MessageComments_messageComments_comments_comment } from 'openland-api/Types';
import { SenderViewCompact } from './SenderView';
import { processSpans } from 'openland-y-utils/spans/processSpans';
import { Span } from 'openland-y-utils/spans/Span';
import { MAvatar } from 'openland-web/fragments/chat/messenger/message/MAvatar';
import { emoji } from 'openland-y-utils/emoji';
import { css } from 'linaria';
import { CommentTools } from './CommentTools';
import { CommentInput } from './CommentInput';
import { URickTextValue } from 'openland-web/components/unicorn/URickInput';

const wrapper = css`
    display: flex;
    flex-direction: row;
`;

const content = css`
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    padding-left: 16px;
    flex-direction: column;
`;

interface CommentViewProps {
    comment: MessageComments_messageComments_comments_comment;
    deleted: boolean;
    depth: number;
    highlighted: boolean;
    groupId?: string;
    onReplyClick: (id: string) => void;
    onDeleteClick: (id: string) => void;
    onSent: (data: URickTextValue) => void;
}

export const CommentView = React.memo((props: CommentViewProps) => {
    const { comment, deleted, depth, highlighted, groupId, onReplyClick, onDeleteClick, onSent } = props;
    const { id, sender, edited, message, attachments, spans, fallback, date, } = comment;
    const [textSpans, setTextSpans] = React.useState<Span[]>([]);
    const [senderNameEmojify, setSenderNameEmojify] = React.useState<string | JSX.Element>(sender.name);

    React.useEffect(() => {
        setTextSpans(processSpans(message || '', spans));
    }, [message, spans]);

    React.useEffect(() => {
        setSenderNameEmojify(emoji(sender.name));
    }, [sender.name]);

    return (
        <div className={wrapper} style={{ paddingLeft: depth * 50 }}>
            <MAvatar
                senderId={sender.id}
                senderName={sender.name}
                senderNameEmojify={senderNameEmojify}
                senderPhoto={sender.photo}
            />
            <div className={content}>
                <SenderViewCompact
                    sender={sender}
                    edited={edited}
                    senderNameEmojify={senderNameEmojify}
                />
                <MessageContent
                    id={id}
                    text={message}
                    textSpans={textSpans}
                    attachments={attachments}
                    fallback={fallback}
                />
                <CommentTools
                    date={date}
                    deleted={deleted}
                    onReplyClick={() => onReplyClick(id)}
                    onDeleteClick={() => onDeleteClick(id)}
                />
                {highlighted && (
                    <CommentInput
                        onSent={onSent}
                        groupId={groupId}
                    />
                )}
            </div>
        </div>
    );
});