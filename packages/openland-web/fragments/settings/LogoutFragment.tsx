import * as React from 'react';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { XModalContent } from 'openland-web/components/XModalContent';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { XView } from 'react-mental';
import { dropPersistenceCache } from 'openland-api/spacex.persistance.web';
import { useClient } from 'openland-api/useClient';

const LogoutDialog = React.memo<{ ctx: XModalController }>(props => {
    const client = useClient();
    const router = React.useContext(XRouterContext)!;
    const doConfirm = React.useCallback(() => {
        props.ctx.hide();
        setTimeout(async () => {
            await client.mutateOnLogout();
            await dropPersistenceCache();
            router.push('/auth/logout/');
        });
    }, []);

    return (
        <XView flexDirection="column" borderRadius={8} overflow="hidden">
            <XModalContent fontSize={18} lineHeight="28px">
                Are you sure you want to sign out?
            </XModalContent>
            <XModalFooter>
                <UButton
                    text="Cancel"
                    style="tertiary"
                    size="large"
                    onClick={() => props.ctx.hide()}
                />
                <UButton
                    text="Yes, I am sure"
                    style="danger"
                    size="large"
                    onClick={doConfirm}
                />
            </XModalFooter>
        </XView>
    );
});

export function showLogoutConfirmation() {
    showModalBox({ title: 'Sign out from app' }, ctx => {
        return <LogoutDialog ctx={ctx} />;
    });
}
