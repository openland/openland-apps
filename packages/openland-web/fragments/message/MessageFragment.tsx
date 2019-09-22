import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { css } from 'linaria';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { CommentInput } from './components/CommentInput';
import { CommentsList } from './components/CommentsList';
import { MessageView } from './components/MessageView';
import { URickTextValue, convertFromInputValue } from 'openland-web/components/unicorn/URickInput';
import { findSpans } from 'openland-y-utils/findSpans';
import { prepareLegacyMentionsForSend } from 'openland-engines/legacy/legacymentions';
import UUID from 'uuid/v4';
import { UHeader } from 'openland-unicorn/UHeader';
import { showAttachConfirm } from '../chat/components/AttachConfirm';
import { DropZone } from '../chat/components/DropZone';

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

const MessageFragmentInner = React.memo((props: { messageId: string }) => {
    const { messageId } = props;
    const client = useClient();
    const message = client.useMessage({ messageId }, { fetchPolicy: 'cache-and-network' }).message;

    if (!message || message.__typename === 'ServiceMessage') {
        return null;
    }

    const [highlightId, setHighlightId] = React.useState<string | undefined>(undefined);

    const handleReplyClick = React.useCallback((id: string) => {
        setHighlightId(current => id === current ? undefined : id);
    }, [highlightId]);

    const handleCommentSent = React.useCallback(async (data: URickTextValue) => {
        const { text, mentions } = convertFromInputValue(data);

        if (text.length > 0) {
            await client.mutateAddComment({
                peerId: messageId,
                repeatKey: UUID(),
                mentions: prepareLegacyMentionsForSend(text, mentions),
                message: text,
                spans: findSpans(text),
                replyComment: highlightId
            });

            setHighlightId(undefined);
        }
    }, [messageId, highlightId]);

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
                                peerId: messageId,
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
    }, [messageId, highlightId]);

    const groupId = message.source && message.source.__typename === 'MessageSourceChat' && message.source.chat.__typename === 'SharedRoom' ? message.source.chat.id : undefined;

    return (
        <div className={wrapperClass}>
            <XScrollView3 flexGrow={1} flexBasis={0} flexShrink={1} alignItems="flex-start">
                <div className={contentClass}>
                    <MessageView message={message} />
                    <CommentsList
                        messageId={messageId}
                        groupId={groupId}
                        onReply={handleReplyClick}
                        onSent={handleCommentSent}
                        onSentAttach={handleCommentSentAttach}
                        highlightId={highlightId}
                    />
                </div>
            </XScrollView3>

            <CommentInput
                onSent={handleCommentSent}
                onSentAttach={handleCommentSentAttach}
                groupId={groupId}
            />

            <DropZone
                onDrop={handleCommentSentAttach}
                text={highlightId ? 'Drop here to send to the branch' : undefined}
            />
        </div>
    );
});

export const MessageFragment = React.memo(() => {
    const unicorn = useUnicorn();

    return (
        <>
            <UHeader title="Message" appearance="wide" />
            <MessageFragmentInner messageId={unicorn.id} />
        </>
    );
});