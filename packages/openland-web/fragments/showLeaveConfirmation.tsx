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

const LeaveDialog = React.memo<{ id: string, ctx: XModalController }>((props) => {
    const router = React.useContext(XRouterContext)!;
    const user = React.useContext(UserInfoContext)!!;
    const client = useClient();
    const data = client.useOrganizationProfile({ organizationId: props.id });
    const form = useForm();
    const doConfirm = React.useCallback(() => {
        form.doAction(async () => {

            // Apply mutation
            await client.mutateOrganizationMemberRemove({
                organizationId: props.id,
                userId: user.user!.id
            });
            await client.refetchMyOrganizations();
            await client.refetchAccount();
            props.ctx.hide();

            // Redirect to the home
            setTimeout(() => {
                router.push('/');
            });
        })
    }, [])

    return (
        <>
            {form.error && <XErrorMessage message={form.error} />}
            <XModalContent fontSize={18} lineHeight="28px">
                Are you sure you want to leave? You will lose access to all internal chats at{' '}
                {data.organizationProfile.name}. You can only join{' '}
                {data.organizationProfile.name} by invitation in the future.
            </XModalContent>
            <XModalFooter>
                <XModalFooterButton text="Cancel" style="ghost" onClick={() => props.ctx.hide()} />
                <XModalFooterButton text="Yes, I am sure" style="danger" onClick={doConfirm} loading={form.loading} />
            </XModalFooter>
        </>
    )
});

export function showLeaveConfirmation(id: string) {
    showModalBox({ 'title': 'Leave organization' }, (ctx) => {
        return (<LeaveDialog id={id} ctx={ctx} />);
    })
}