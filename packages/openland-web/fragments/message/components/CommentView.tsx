import * as React from 'react';
import { MessageContent } from '../../chat/messenger/message/MessageContent';
import { MessageComments_messageComments_comments_comment } from 'openland-api/Types';
import { SenderViewCompact } from '../../../components/SenderView';
import { processSpans } from 'openland-y-utils/spans/processSpans';
import { Span } from 'openland-y-utils/spans/Span';
import { MAvatar } from 'openland-web/fragments/chat/messenger/message/MAvatar';
import { emoji } from 'openland-y-utils/emoji';
import { css, cx } from 'linaria';
import { CommentTools } from './CommentTools';
import { CommentInput } from './CommentInput';
import { URickTextValue } from 'openland-web/components/unicorn/URickInput';
import LikeIcon from 'openland-icons/s/ic-like-densed-filled-24.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { ThemeDefault } from 'openland-y-utils/themes';

const avatarWrapper = css`
    flex-shrink: 0;
`;

const content = css`
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    padding-left: 16px;
    flex-direction: column;
`;

const reactionsWrapper = css`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    opacity: 0;
    transform: translateX(100%);
    transition: transform cubic-bezier(0, 0, 0.2, 1) 150ms, opacity cubic-bezier(0, 0, 0.2, 1) 150ms;
`;

const reactionsLikedWrapper = css`
    opacity: 1;
    transform: translateX(0);
`;

const wrapper = css`
    display: flex;
    flex-direction: row;
    margin-top: 24px;

    &:hover .${reactionsWrapper} {
        opacity: 1;
        transform: translateX(0);
    }
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
    const { id, sender, edited, message, attachments, spans, fallback, date, reactions } = comment;
    const [textSpans, setTextSpans] = React.useState<Span[]>([]);
    const [senderNameEmojify, setSenderNameEmojify] = React.useState<string | JSX.Element>(sender.name);

    React.useEffect(() => {
        setTextSpans(processSpans(message || '', spans));
    }, [message, spans]);

    React.useEffect(() => {
        setSenderNameEmojify(emoji(sender.name));
    }, [sender.name]);

    let myLike = false;
    reactions.map(r => {
        if (r.user.id === messenger.user.id) {
            myLike = true;
        }
    });

    return (
        <div className={wrapper} style={{ paddingLeft: depth * 50 }} onDoubleClick={() => onReactionClick(comment)}>
            <div className={avatarWrapper}>
                <MAvatar
                    senderId={sender.id}
                    senderName={sender.name}
                    senderNameEmojify={senderNameEmojify}
                    senderPhoto={sender.photo}
                />
            </div>
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
            {!deleted && (
                <div className={cx(reactionsWrapper, reactions.length > 0 && reactionsLikedWrapper)} onClick={() => onReactionClick(comment)}>
                    <UIcon
                        icon={<LikeIcon />}
                        color={myLike ? ThemeDefault.accentNegative : ThemeDefault.foregroundQuaternary}
                    />
                </div>
            )}
        </div>
    );
});