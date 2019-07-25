import * as React from 'react';
import { MessageContent } from '../../chat/messenger/message/MessageContent';
import { MessageComments_messageComments_comments_comment } from 'openland-api/Types';
import { CommentSender } from './CommentSender';
import { processSpans } from 'openland-y-utils/spans/processSpans';
import { Span } from 'openland-y-utils/spans/Span';

interface CommentViewProps {
    comment: MessageComments_messageComments_comments_comment;
    depth: number;
}

export const CommentView = React.memo((props: CommentViewProps) => {
    const { comment, depth } = props;
    const [textSpans, setTextSpans] = React.useState<Span[]>([]);

    React.useEffect(() => {
        setTextSpans(processSpans(comment.message || '', comment.spans));
    }, [comment.message, comment.spans]);

    return (
        <div style={{ paddingLeft: depth * 50 }}>
            <CommentSender comment={comment} />
            <MessageContent
                id={comment.id}
                text={comment.message}
                textSpans={textSpans}
                isEdited={comment.edited}
                attachments={comment.attachments}
                fallback={comment.fallback}
            />
        </div>
    );
});