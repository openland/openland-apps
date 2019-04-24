import * as React from 'react';
import { XView } from 'react-mental';
import { XRichTextInput2RefMethods } from 'openland-x/XRichTextInput2/useInputMethods';
import { RoomMembers_members } from 'openland-api/Types';
import { MessageComponent } from 'openland-web/components/messenger/message/MessageComponent';
import { DataSourceWebMessageItem } from 'openland-web/components/messenger/data/WebMessageItemDataSource';
import { UploadContextProvider } from 'openland-web/fragments/MessageComposeComponent/FileUploading/UploadContext';
import { UserShort } from 'openland-api/Types';
import { AddCommentParams } from './CommentsModalInner';
import { CommentsInput } from './CommentsInput';

export const CommentView = React.memo(
    ({
        message,
        offset,
        onCommentReplyClick,
        me,
        showInputId,
        setShowInputId,
        currentCommentsInputRef,
        members,
        addComment,
    }: {
        message: DataSourceWebMessageItem & { depth: number };
        offset: number;
        onCommentReplyClick?: (event: React.MouseEvent<any>) => void;
        me?: UserShort | null;
        showInputId: string | null;
        setShowInputId: (a: string | null) => void;
        currentCommentsInputRef: React.MutableRefObject<XRichTextInput2RefMethods | null>;
        members: RoomMembers_members[];
        addComment: (a: AddCommentParams) => {};
    }) => {
        return (
            <XView
                key={message.key}
                marginLeft={offset}
                width={`calc(800px - 32px - 32px - ${offset}px)`}
            >
                <MessageComponent
                    commentDepth={message.depth}
                    noSelector
                    isComment
                    onCommentReplyClick={onCommentReplyClick}
                    message={message}
                    onlyLikes={true}
                    isChannel={true}
                    me={me}
                />

                {showInputId === message.key && (
                    <UploadContextProvider>
                        <CommentsInput
                            commentsInputRef={currentCommentsInputRef}
                            members={members}
                            minimal
                            onSend={async (msgToSend, mentions) => {
                                await addComment({
                                    mentions,
                                    message: msgToSend,
                                    replyComment: message.key,
                                    // fileAttachments: [],
                                });
                                setShowInputId(null);
                            }}
                        />
                    </UploadContextProvider>
                )}
            </XView>
        );
    },
);
