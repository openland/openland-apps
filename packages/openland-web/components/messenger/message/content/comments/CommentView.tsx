import * as React from 'react';
import { XView } from 'react-mental';
import { XRichTextInput2RefMethods } from 'openland-x/XRichTextInput2/useInputMethods';
import { RoomMembers_members } from 'openland-api/Types';
import { MessageComponent } from 'openland-web/components/messenger/message/MessageComponent';
import { DataSourceWebMessageItem } from 'openland-web/components/messenger/data/WebMessageItemDataSource';
import { UploadContextProvider } from 'openland-web/modules/FileUploading/UploadContext';
import { UserShort } from 'openland-api/Types';
import { useAddComment } from './useAddComment';
import { CommentsInput } from './CommentsInput';
import { uploadFile } from './uploadFile';

type CommentViewT = {
    message: DataSourceWebMessageItem & { depth: number };
    deleted?: boolean;
    offset: number;
    onCommentReplyClick?: (event: React.MouseEvent<any>) => void;
    me?: UserShort | null;
    showInputId: string | null;
    setShowInputId: (a: string | null) => void;
    currentCommentsInputRef: React.MutableRefObject<XRichTextInput2RefMethods | null>;
    members: RoomMembers_members[];
    messageId: string;
    onCommentBackToUserMessageClick?: (event: React.MouseEvent<any>) => void;
    usernameOfRepliedUser?: string;
};

export const CommentView = React.memo(
    ({
        message,
        deleted,
        offset,
        onCommentReplyClick,
        me,
        showInputId,
        setShowInputId,
        currentCommentsInputRef,
        members,
        messageId,
        onCommentBackToUserMessageClick,
        usernameOfRepliedUser,
    }: CommentViewT) => {
        const addComment = useAddComment();
        return (
            <div data-comment-id={message.id}>
                <XView
                    key={message.key}
                    marginLeft={offset}
                    width={`calc(800px - 32px - 32px - ${offset}px)`}
                >
                    <MessageComponent
                        onCommentBackToUserMessageClick={onCommentBackToUserMessageClick}
                        usernameOfRepliedUser={usernameOfRepliedUser}
                        deleted={deleted}
                        commentDepth={message.depth}
                        noSelector
                        isComment
                        onCommentReplyClick={onCommentReplyClick}
                        message={message}
                        onlyLikes={true}
                        me={me}
                    />

                    {showInputId === message.key && (
                        <UploadContextProvider>
                            <CommentsInput
                                topLevelComment={message.depth === 0}
                                commentsInputRef={currentCommentsInputRef}
                                members={members}
                                minimal
                                onSendFile={async (file: UploadCare.File) => {
                                    return await uploadFile({
                                        file,
                                        onProgress: (progress: number) => {
                                            console.log('onProgress', progress);
                                        },
                                    });
                                }}
                                onSend={async (msgToSend, mentions, uploadedFileKey) => {
                                    await addComment({
                                        messageId,
                                        mentions,
                                        message: msgToSend,
                                        replyComment: message.key,
                                        fileAttachments: uploadedFileKey
                                            ? [{ fileId: uploadedFileKey }]
                                            : [],
                                    });

                                    setShowInputId(null);
                                }}
                            />
                        </UploadContextProvider>
                    )}
                </XView>
            </div>
        );
    },
);
