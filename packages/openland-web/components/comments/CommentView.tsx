import * as React from 'react';
import { MessageContent } from '../../fragments/chat/messenger/message/MessageContent';
import { processSpans } from 'openland-y-utils/spans/processSpans';
import { Span } from 'openland-y-utils/spans/Span';
import { emoji } from 'openland-y-utils/emoji';
import { css } from 'linaria';
import { CommentTools } from './CommentTools';
import { CommentInput } from './CommentInput';
import { URickTextValue, convertFromInputValue } from 'openland-web/components/unicorn/URickInput';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { MessageSenderContent } from 'openland-web/fragments/chat/messenger/message/MessageComponent';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { useRole } from 'openland-x-permissions/XWithRole';
import { CommentEntryFragment_comment, StickerFragment } from 'openland-api/Types';
import { CommentEditInput } from './CommentEditInput';
import { useClient } from 'openland-web/utils/useClient';
import { findSpans } from 'openland-y-utils/findSpans';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { useWithWidth } from 'openland-web/hooks/useWithWidth';
import { prepareLegacyMentionsForSend } from 'openland-engines/legacy/legacymentions';
import { XViewRouterContext } from 'react-mental';

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
    comment: CommentEntryFragment_comment;
    deleted: boolean;
    depth: number;
    highlighted: boolean;
    groupId?: string;
    generation?: number;
    onReplyClick: (id: string) => void;
    onDeleteClick: (id: string) => void;
    onReactionClick: (comment: CommentEntryFragment_comment) => void;
    onSent: (data: URickTextValue) => Promise<boolean>;
    onSentAttach: (files: File[]) => void;
    onStickerSent: (sticker: StickerFragment) => void;
}

export const CommentView = React.memo((props: CommentViewProps) => {
    const messenger = React.useContext(MessengerContext);
    const client = useClient();
    const isMobile = useLayout() === 'mobile';
    const [width] = useWithWidth();
    const {
        comment,
        deleted,
        depth,
        highlighted,
        groupId,
        onReplyClick,
        onDeleteClick,
        onReactionClick,
        onSent,
        onSentAttach,
        onStickerSent,
        generation,
    } = props;
    const { id, sender, message, spans, fallback, date } = comment;
    const [maxCommentDepth, setMaxCommentDepth] = React.useState(4);
    const [textSpans, setTextSpans] = React.useState<Span[]>([]);
    const [senderNameEmojify, setSenderNameEmojify] = React.useState<string | JSX.Element>(
        sender.name,
    );
    const [edit, setEdit] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const router = React.useContext(XViewRouterContext)!;

    React.useLayoutEffect(() => {
        setTimeout(() => {
            if (highlighted || (generation && comment.sender.id === messenger.user.id)) {
                if (containerRef.current) {
                    containerRef.current.scrollIntoView({ behavior: 'auto', block: 'nearest' });
                }
            }
        }, 300);
    }, []);

    React.useEffect(
        () => {
            setTextSpans(processSpans(message || '', spans));
        },
        [message, spans],
    );

    React.useEffect(
        () => {
            setSenderNameEmojify(emoji(sender.name));
        },
        [sender.name],
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
        const { text, mentions } = convertFromInputValue(data);

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
    const canDelete = sender.id === messenger.user.id || useRole('super-admin');
    const attachments = comment.__typename === 'GeneralMessage' ? comment.attachments : undefined;
    const reactions =
        comment.__typename === 'GeneralMessage' || comment.__typename === 'StickerMessage'
            ? comment.reactions
            : [];

    return (
        <div
            ref={containerRef}
            className={wrapper}
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
                    senderNameEmojify={senderNameEmojify}
                    date={parseInt(date, 10)}
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
                        />
                        {!deleted && (
                            <CommentTools
                                reactions={reactions}
                                onReactionClick={() => onReactionClick(comment)}
                                onReplyClick={() => onReplyClick(id)}
                                onEditClick={canEdit ? () => setEdit(true) : undefined}
                                onDeleteClick={canDelete ? () => onDeleteClick(id) : undefined}
                            />
                        )}
                        {highlighted && (
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
