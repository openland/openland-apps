import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { css } from 'linaria';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { CommentInput } from './CommentInput';
import { CommentsList } from './CommentsList';
import { URickTextValue, convertFromInputValue } from 'openland-web/components/unicorn/URickInput';
import { findSpans } from 'openland-y-utils/findSpans';
import { prepareLegacyMentionsForSend } from 'openland-engines/legacy/legacymentions';
import UUID from 'uuid/v4';
import { StickerFragment } from 'openland-api/Types';
import { showAttachConfirm } from 'openland-web/fragments/chat/components/AttachConfirm';
import { DropZone } from 'openland-web/fragments/chat/components/DropZone';
import { showNoiseWarning } from 'openland-web/fragments/chat/components/NoiseWarning';

const wrapperClass = css`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
`;

const contentClass = css`
    padding: 0 16px;
    max-width: 824px;
    width: 100%;
    margin: 0 auto;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

interface CommentsWrapperProps {
    peerId: string;
    peerView: JSX.Element;
    groupId?: string;
    commentId?: string;
}

export const CommentsWrapper = React.memo((props: CommentsWrapperProps) => {
    const { peerId, peerView, groupId, commentId } = props;
    const client = useClient();
    const [highlightId, setHighlightId] = React.useState<string | undefined>(commentId);

    const handleReplyClick = React.useCallback((id: string) => {
        setHighlightId(current => id === current ? undefined : id);
    }, [highlightId]);

    const handleCommentSent = React.useCallback(async (data: URickTextValue) => {
        const { text, mentions } = convertFromInputValue(data);

        const mentionsPrepared = prepareLegacyMentionsForSend(text, mentions);

        if (text.length > 0) {
            if (groupId && mentionsPrepared.filter(m => m.all === true).length) {
                try {
                    await showNoiseWarning(
                        `Notify all members?`,
                        'By using @All, you’re about to notify all group members even when they muted this chat. Please use it only for important messages'
                    );
                } catch {
                    return false;
                }
            }

            await client.mutateAddComment({
                peerId,
                repeatKey: UUID(),
                mentions: mentionsPrepared,
                message: text,
                spans: findSpans(text),
                replyComment: highlightId
            });

            setHighlightId(undefined);
        }

        return true;
    }, [peerId, highlightId]);

    const handleStickerSent = React.useCallback(async (sticker: StickerFragment) => {
        await client.mutateAddStickerComment({
            peerId,
            repeatKey: UUID(),
            stickerId: sticker.id,
            replyComment: highlightId
        });

        setHighlightId(undefined);
    }, [peerId, highlightId]);

    const handleCommentSentAttach = React.useCallback((files: File[]) => {
        if (files.length > 0) {
            showAttachConfirm(files, (res) => new Promise(resolve => {
                const uploadedFiles: string[] = [];

                res.map(u => {
                    u.watch((state) => {
                        if (state.uuid && !uploadedFiles.includes(state.uuid)) {
                            uploadedFiles.push(state.uuid);
                        }

                        if (uploadedFiles.length === res.length) {
                            resolve();

                            client.mutateAddComment({
                                peerId,
                                repeatKey: UUID(),
                                fileAttachments: uploadedFiles.map(f => ({ fileId: f })),
                                replyComment: highlightId
                            });

                            setHighlightId(undefined);
                        }
                    });
                });
            }));
        }
    }, [peerId, highlightId]);

    return (
        <div className={wrapperClass}>
            <XScrollView3 flexGrow={1} flexBasis={0} flexShrink={1} alignItems="flex-start">
                <div className={contentClass}>
                    {peerView}

                    <CommentsList
                        peerId={peerId}
                        groupId={groupId}
                        onReply={handleReplyClick}
                        onSent={handleCommentSent}
                        onSentAttach={handleCommentSentAttach}
                        onStickerSent={handleStickerSent}
                        highlightId={highlightId}
                    />
                </div>
            </XScrollView3>
            <CommentInput
                onSent={handleCommentSent}
                onSentAttach={handleCommentSentAttach}
                onStickerSent={handleStickerSent}
                groupId={groupId}
                forceAutofocus={!highlightId}
            />
            <DropZone
                onDrop={handleCommentSentAttach}
                text={highlightId ? 'Drop here to send to the branch' : undefined}
            />
        </div>
    );
});