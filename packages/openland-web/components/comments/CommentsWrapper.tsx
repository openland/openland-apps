import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { css } from 'linaria';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { CommentInput } from './CommentInput';
import { CommentsList } from './CommentsList';
import { URickTextValue } from 'openland-web/components/unicorn/URickInput';
import { findSpans } from 'openland-y-utils/findSpans';
import { prepareLegacyMentionsForSend } from 'openland-engines/legacy/legacymentions';
import UUID from 'uuid/v4';
import { StickerFragment } from 'openland-api/spacex.types';
import { showAttachConfirm } from 'openland-web/fragments/chat/components/AttachConfirm';
import { DropZone } from 'openland-web/fragments/chat/components/DropZone';
import { showNoiseWarning } from 'openland-web/fragments/chat/components/NoiseWarning';
import { extractTextAndMentions } from 'openland-web/utils/convertTextAndMentions';
import { isFileImage } from 'openland-web/utils/UploadCareUploading';

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
    noDefaultReply?: boolean;
}

export const CommentsWrapper = React.memo((props: CommentsWrapperProps) => {
    const { peerId, peerView, groupId, commentId, noDefaultReply } = props;
    const client = useClient();
    const [replyingId, setReplyingId] = React.useState<string | undefined>(noDefaultReply ? undefined : commentId);
    const [attachOpen, setAttachOpen] = React.useState(false);

    const handleReplyClick = React.useCallback((id: string) => {
        setReplyingId(current => id === current ? undefined : id);
    }, [replyingId]);

    const handleCommentSent = React.useCallback(async (data: URickTextValue, topLevel: boolean = false) => {
        const { text, mentions } = extractTextAndMentions(data);

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
                replyComment: topLevel ? undefined : replyingId
            });

            if (!topLevel) {
                setReplyingId(undefined);
            }
        }

        return true;
    }, [peerId, replyingId]);

    const handleStickerSent = React.useCallback(async (sticker: StickerFragment, topLevel: boolean = false) => {
        await client.mutateAddStickerComment({
            peerId,
            repeatKey: UUID(),
            stickerId: sticker.id,
            replyComment: topLevel ? undefined : replyingId
        });

        if (!topLevel) {
            setReplyingId(undefined);
        }
    }, [peerId, replyingId]);

    const handleCommentSentAttach = React.useCallback((files: File[], isImage: boolean, topLevel: boolean = false) => {
        if (files.length > 0) {
            setAttachOpen(true);
            showAttachConfirm(
                {
                    files,
                    isImage,
                    onSubmit: (res, text, mentions) => new Promise(resolve => {
                        const uploadedFiles: string[] = [];

                        res.map(({ file }) => {
                            file.watch((state) => {
                                if (state.uuid && !uploadedFiles.includes(state.uuid)) {
                                    uploadedFiles.push(state.uuid);
                                }

                                if (uploadedFiles.length === res.length) {
                                    resolve();

                                    client.mutateAddComment({
                                        peerId,
                                        repeatKey: UUID(),
                                        fileAttachments: uploadedFiles.map(f => ({ fileId: f })),
                                        replyComment: topLevel ? undefined : replyingId,
                                        message: text,
                                        spans: text ? findSpans(text) : null,
                                        mentions: text && mentions ? prepareLegacyMentionsForSend(text, mentions) : null
                                    });

                                    if (!topLevel) {
                                        setReplyingId(undefined);
                                    }
                                }
                            });
                        });
                    }),
                    onCancel: () => setAttachOpen(false),
                    chatId: groupId
                });
        }
    }, [peerId, replyingId]);

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
                        replyingId={replyingId}
                        highlightId={commentId}
                    />
                </div>
            </XScrollView3>
            <CommentInput
                onSent={data => handleCommentSent(data, true)}
                onSentAttach={(files, isImage) => handleCommentSentAttach(files, isImage, true)}
                onStickerSent={sticker => handleStickerSent(sticker, true)}
                groupId={groupId}
                forceAutofocus={!replyingId}
            />
            <DropZone
                isHidden={attachOpen}
                onDrop={files => handleCommentSentAttach(files, files.every(f => isFileImage(f)))}
                text={replyingId ? 'Drop here to send to the branch' : undefined}
            />
        </div>
    );
});