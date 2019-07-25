import * as React from 'react';
import { MessageContent } from '../../chat/messenger/message/MessageContent';
import { MessageComments_messageComments_comments_comment } from 'openland-api/Types';
import { SenderViewCompact } from './SenderView';
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
            <SenderViewCompact
                sender={comment.sender}
                edited={comment.edited}
            />
            <MessageContent
                id={comment.id}
                text={comment.message}
                textSpans={textSpans}
                attachments={comment.attachments}
                fallback={comment.fallback}
            />
        </div>
    );
});