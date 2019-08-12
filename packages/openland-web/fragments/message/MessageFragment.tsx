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

    const handleCommentSent = React.useCallback((data: URickTextValue, replyId?: string) => {
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
                replyComment: replyId
            });
        }
    }, [messageId]);

    const handleAttachSent = React.useCallback((files: File[], replyId?: string) => {
        if (files.length) {
            showAttachConfirm(files, (res) => {
                console.warn('boom', { res, replyId });
                // res.map(f => new UploadCareUploading(UploadCare.fileFrom('object', f), f.name))
                //     .map(this.conversation!.sendFile);
            });
        }
    }, [messageId]);

    const groupId = message.source && message.source.__typename === 'MessageSourceChat' && message.source.chat.__typename === 'SharedRoom' ? message.source.chat.id : undefined;

    return (
        <div className={wrapperClass}>
            <XScrollView3 flexGrow={1} flexBasis={0} flexShrink={1} alignItems="flex-start">
                <div className={contentClass}>
                    <MessageView message={message} />
                    <CommentsList messageId={messageId} groupId={groupId} onSent={handleCommentSent} />
                </div>
            </XScrollView3>

            <CommentInput onSent={handleCommentSent} groupId={groupId} />
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