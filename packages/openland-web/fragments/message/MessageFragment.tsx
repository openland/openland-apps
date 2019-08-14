import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { css } from 'linaria';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { CommentInput } from './components/CommentInput';
import { CommentsList } from './components/CommentsList';
import { MessageView } from './components/MessageView';
import { URickTextValue, AllMention } from 'openland-web/components/unicorn/URickInput';
import { findSpans } from 'openland-y-utils/findSpans';
import { prepareLegacyMentionsForSend } from 'openland-engines/legacy/legacymentions';
import UUID from 'uuid/v4';
import { UserForMention } from 'openland-api/Types';
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

    const handleCommentSent = React.useCallback((data: URickTextValue) => {
        let text = '';
        let mentions: (UserForMention | AllMention)[] = [];
        for (let t of data) {
            if (typeof t === 'string') {
                text += t;
            } else if (t.__typename === 'User') {
                text += '@' + t.name;
                mentions.push(t);
            } else {
                text += '@All';
                mentions.push(t);
            }
        }

        const textValue = text.trim();

        if (textValue.length > 0) {
            client.mutateAddMessageComment({
                messageId,
                repeatKey: UUID(),
                mentions: prepareLegacyMentionsForSend(textValue, mentions),
                message: textValue,
                spans: findSpans(textValue),
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

                            client.mutateAddMessageComment({
                                messageId,
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
            <UHeader title="Comments" appearance="wide" />
            <MessageFragmentInner messageId={unicorn.id} />
        </>
    );
});