import * as React from 'react';
import { MessageContent } from '../../fragments/chat/messenger/message/MessageContent';
import { processSpans } from 'openland-y-utils/spans/processSpans';
import { Span } from 'openland-y-utils/spans/Span';
import { css, cx } from 'linaria';
import { CommentTools } from './CommentTools';
import { CommentInput } from './CommentInput';
import { URickTextValue } from 'openland-web/components/unicorn/URickInput';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { MessageSenderContent } from 'openland-web/fragments/chat/messenger/message/MessageComponent';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { useRole } from 'openland-x-permissions/XWithRole';
import { CommentEntryFragment_comment, StickerFragment, RoomMemberRole } from 'openland-api/spacex.types';
import { CommentEditInput } from './CommentEditInput';
import { useClient } from 'openland-api/useClient';
import { findSpans } from 'openland-y-utils/findSpans';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { useWithWidth } from 'openland-web/hooks/useWithWidth';
import { prepareLegacyMentionsForSend } from 'openland-engines/legacy/legacymentions';
import { XViewRouterContext } from 'react-mental';
import { extractTextAndMentions } from 'openland-web/utils/convertTextAndMentions';

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
    padding: 8px;
    margin-bottom: 8px;
    border-radius: 8px;
    transition: background-color 0.15s;
`;

const highlightedWrapper = css`
    background-color: var(--backgroundTertiary);
`;

interface CommentViewProps {
    comment: CommentEntryFragment_comment;
    entryId: string;
    deleted: boolean;
    depth: number;
    highlighted: boolean;
    isReplying: boolean;
    groupId?: string;
    generation?: number;
    role: RoomMemberRole | undefined;
    onReplyClick: (id: string) => void;
    onDeleteClick: (id: string) => void;
    onReactionClick: (comment: CommentEntryFragment_comment) => void;
    onSent: (data: URickTextValue) => Promise<boolean>;
    onSentAttach: (files: File[], isImage: boolean) => void;
    onStickerSent: (sticker: StickerFragment) => void;
}

export const CommentView = React.memo((props: CommentViewProps) => {
    const messenger = React.useContext(MessengerContext);
    const client = useClient();
    const isMobile = useLayout() === 'mobile';
    const [width] = useWithWidth();
    const {
        comment,
        entryId,
        deleted,
        depth,
        isReplying,
        groupId,
        onReplyClick,
        onDeleteClick,
        onReactionClick,
        onSent,
        onSentAttach,
        onStickerSent,
        generation,
        role,
    } = props;
    const { id, sender, message, spans, fallback, date } = comment;
    const [maxCommentDepth, setMaxCommentDepth] = React.useState(4);
    const [textSpans, setTextSpans] = React.useState<Span[]>([]);
    const [edit, setEdit] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const router = React.useContext(XViewRouterContext)!;
    const [highlighted, setHighlighted] = React.useState(props.highlighted);

    React.useLayoutEffect(() => {
        setTimeout(() => {
            if (isReplying || highlighted || (generation && comment.sender.id === messenger.user.id)) {
                if (containerRef.current) {
                    containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }, 300);
    }, []);

    React.useEffect(() => {
        if (props.highlighted) {
            setTimeout(() => {
                setHighlighted(false);
            }, 8000);
        }
    }, [props.highlighted]);

    React.useEffect(
        () => {
            setTextSpans(processSpans(message || '', spans));
        },
        [message, spans],
    );

    React.useLayoutEffect(
        () => {
            if (width && width <= 500) {
                return setMaxCommentDepth(1);
            }
            if (width && width > 500) {
                return setMaxCommentDepth(4);
            }
        },
        [width, maxCommentDepth],
    );

    const handleEditSave = React.useCallback(async (data: URickTextValue) => {
        const { text, mentions } = extractTextAndMentions(data);

        if (text.length > 0) {
            await client.mutateEditComment({
                id,
                message: text,
                spans: findSpans(text),
                mentions: prepareLegacyMentionsForSend(text, mentions),
            });
        }

        setEdit(false);

        return true;
    }, []);

    const canEdit = sender.id === messenger.user.id && message && message.length;
    const canDelete = sender.id === messenger.user.id || role === RoomMemberRole.ADMIN || role === RoomMemberRole.OWNER || useRole('super-admin');
    const attachments = comment.__typename === 'GeneralMessage' ? comment.attachments : undefined;
    const reactionCounters =
        comment.__typename === 'GeneralMessage' || comment.__typename === 'StickerMessage'
            ? comment.reactionCounters
            : [];

    return (
        <div
            ref={containerRef}
            className={cx(wrapper, highlighted && highlightedWrapper)}
            style={{
                paddingLeft:
                    depth > 0
                        ? (isMobile ? 16 : 56) + Math.min(depth, maxCommentDepth) * 40
                        : undefined,
            }}
        >
            <div className={avatarWrapper}>
                <UAvatar
                    id={sender.id}
                    title={sender.name}
                    photo={sender.photo}
                    size={depth > 0 ? 'x-small' : 'medium'}
                    onClick={() => {
                        if (router) {
                            router.navigate(`/${sender.id}`);
                        }
                    }}
                />
            </div>
            <div className={content}>
                <MessageSenderContent
                    sender={sender}
                    date={parseInt(date, 10)}
                    dateFormat='date-time'
                />
                {edit && (
                    <CommentEditInput
                        onSave={handleEditSave}
                        text={message || ''}
                        textSpans={textSpans}
                    />
                )}
                {!edit && (
                    <>
                        <MessageContent
                            id={id}
                            text={message}
                            textSpans={textSpans}
                            attachments={attachments}
                            fallback={fallback}
                            isOut={sender.id === messenger.user.id}
                            sticker={
                                comment.__typename === 'StickerMessage'
                                    ? comment.sticker
                                    : undefined
                            }
                            isComment={true}
                        />
                        {!deleted && (
                            <CommentTools
                                entryId={entryId}
                                reactionCounters={reactionCounters}
                                onReactionClick={() => onReactionClick(comment)}
                                onReplyClick={() => onReplyClick(id)}
                                onEditClick={canEdit ? () => setEdit(true) : undefined}
                                onDeleteClick={canDelete ? () => onDeleteClick(id) : undefined}
                            />
                        )}
                        {isReplying && (
                            <CommentInput
                                onSent={onSent}
                                onSentAttach={onSentAttach}
                                onStickerSent={onStickerSent}
                                groupId={groupId}
                                compact={true}
                                forceAutofocus={true}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
});
