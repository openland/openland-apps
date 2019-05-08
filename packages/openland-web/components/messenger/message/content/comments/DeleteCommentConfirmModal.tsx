import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { useForm } from 'openland-form/useForm';
import { XErrorMessage } from 'openland-x/XErrorMessage';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { XModalFooterButton } from 'openland-web/components/XModalFooterButton';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XView } from 'react-mental';

type DeleteCommentT = {
    messageId: string;
    commentIdToDelete: string | null;
};

const DeleteCommentDialog = React.memo<
    {
        ctx: XModalController;
    } & DeleteCommentT
>(({ messageId, commentIdToDelete, ctx }) => {
    const client = useClient();
    const form = useForm();

    const doConfirm = React.useCallback(() => {
        form.doAction(async () => {
            await client.mutateDeleteComment({
                id: commentIdToDelete!!,
            });

            await client.refetchMessageComments({
                messageId,
            });
            ctx.hide();
        });
    }, []);

    return (
        <XView borderRadius={8} overflow="hidden">
            {form.error && <XErrorMessage message={form.error} />}
            <XModalContent fontSize={18} lineHeight="28px">
                Delete this comment for everyone? This cannot be undone.
            </XModalContent>
            <XModalFooter>
                <XModalFooterButton text="Cancel" style="ghost" onClick={() => ctx.hide()} />
                <XModalFooterButton
                    text="Delete"
                    style="danger"
                    onClick={doConfirm}
                    loading={form.loading}
                />
            </XModalFooter>
        </XView>
    );
});

export function showDeleteCommentConfirmation(deleteCommentProps: DeleteCommentT) {
    showModalBox({ title: 'Delete comment' }, ctx => {
        return <DeleteCommentDialog {...deleteCommentProps} ctx={ctx} />;
    });
}
