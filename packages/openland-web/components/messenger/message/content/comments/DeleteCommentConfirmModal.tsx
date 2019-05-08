import * as React from 'react';
import { XVertical } from 'openland-x-layout/XVertical';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { useClient } from 'openland-web/utils/useClient';
import { XModalForm } from 'openland-x-modal/XModalForm2';

export const DeleteCommentConfirmModal = ({
    messageId,
    commentIdToDelete,
    setCommentIdToDelete,
}: {
    messageId: string;
    commentIdToDelete: string | null;
    setCommentIdToDelete: (a: string | null) => void;
}) => {
    const client = useClient();
    return (
        <XModalForm
            submitProps={{
                text: 'Delete',
                style: 'danger',
            }}
            title={`Delete comment`}
            defaultData={{}}
            defaultAction={async () => {
                await client.mutateDeleteComment({
                    id: commentIdToDelete!!,
                });

                await client.refetchMessageComments({
                    messageId,
                });
                setCommentIdToDelete(null);
            }}
            isOpen={!!commentIdToDelete}
            onClosed={() => {
                setCommentIdToDelete(null);
            }}
            submitBtnText="Delete"
        >
            <XFormLoadingContent>
                <XVertical flexGrow={1} separator={8}>
                    Delete this comment for everyone? This cannot be undone.
                </XVertical>
            </XFormLoadingContent>
        </XModalForm>
    );
};
