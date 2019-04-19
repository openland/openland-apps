import * as React from 'react';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { useClient } from 'openland-web/utils/useClient';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { XView } from 'react-mental';
import { showModalBox, XModalBoxStyles } from 'openland-x/showModalBox';
import { XButton } from 'openland-x/XButton';
import { XModalController } from 'openland-x/showModal';
import { useForm } from 'openland-form/useForm';
import { XServiceMessage } from 'openland-x/XServiceMessage';
import { XErrorMessage } from 'openland-x/XErrorMessage';

const LeaveDialog = React.memo<{ id: string, ctx: XModalController }>((props) => {
    let router = React.useContext(XRouterContext)!;
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
    // let user = React.useContext(UserInfoContext)!!;

    return (
        <XView flexDirection="column" position="relative">
            {form.error && <XErrorMessage message={form.error} />}
            <XView flexDirection="column" paddingHorizontal={XModalBoxStyles.contentPadding} paddingBottom={30} fontSize={18} lineHeight="28px">
                Are you sure you want to leave? You will lose access to all internal chats at{' '}
                {data.organizationProfile.name}. You can only join{' '}
                {data.organizationProfile.name} by invitation in the future.
            </XView>
            <XView height={72} backgroundColor="rgb(242, 243, 244)" flexDirection="row" justifyContent="flex-end" alignItems="center" paddingHorizontal={XModalBoxStyles.contentPadding}>
                <XView paddingRight={12}>
                    <XButton text="Cancel" style="ghost" size="large" onClick={() => props.ctx.hide()} />
                </XView>
                <XButton style="danger" text="Yes, I am sure" size="large" onClick={doConfirm} loading={form.loading} />
            </XView>
        </XView>
    )
});

export function showLeaveConfirmation(id: string) {
    showModalBox({ 'title': 'Leave organization' }, (ctx) => {
        return (<LeaveDialog id={id} ctx={ctx} />);
    })
}