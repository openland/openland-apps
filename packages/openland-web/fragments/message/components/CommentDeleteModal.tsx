import * as React from 'react';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { useClient } from 'openland-web/utils/useClient';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { useForm } from 'openland-form/useForm';
import { XErrorMessage } from 'openland-x/XErrorMessage';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { XModalFooterButton } from 'openland-web/components/XModalFooterButton';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XView } from 'react-mental';

const CommentDeleteModal = React.memo<{ id: string; ctx: XModalController }>(props => {
    const client = useClient();
    const form = useForm();
    const doConfirm = React.useCallback(() => {
        form.doAction(async () => {
            await client.mutateDeleteComment({
                id: props.id
            });
            props.ctx.hide();
        });
    }, []);

    return (
        <>
            {form.error && <XErrorMessage message={form.error} />}
            <XView flexDirection="column" borderRadius={8} overflow="hidden">
                <XModalContent fontSize={18} lineHeight="28px">
                    Delete this comment for everyone? This cannot be undone.
                </XModalContent>
                <XModalFooter>
                    <XModalFooterButton
                        text="Cancel"
                        style="ghost"
                        onClick={() => props.ctx.hide()}
                    />
                    <XModalFooterButton
                        text="Delete"
                        style="danger"
                        onClick={doConfirm}
                        loading={form.loading}
                    />
                </XModalFooter>
            </XView>
        </>
    );
});

export function showCommentDeleteModal(id: string) {
    showModalBox({ title: 'Delete comment' }, ctx => {
        return <CommentDeleteModal id={id} ctx={ctx} />;
    });
}
