import * as React from 'react';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { XModalFooterButton } from 'openland-web/components/XModalFooterButton';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XView } from 'react-mental';

const LogoutDialog = React.memo<{ ctx: XModalController }>(props => {
    const router = React.useContext(XRouterContext)!;
    const doConfirm = React.useCallback(() => {
        props.ctx.hide();
        setTimeout(() => {
            router.push('/auth/logout/');
        });
    }, []);

    return (
        <XView flexDirection="column" borderRadius={8} overflow="hidden">
            <XModalContent fontSize={18} lineHeight="28px">
                Are you sure you want to logout?
            </XModalContent>
            <XModalFooter>
                <XModalFooterButton
                    text="Cancel"
                    style="ghost"
                    onClick={() => props.ctx.hide()}
                />
                <XModalFooterButton
                    text="Yes, I am sure"
                    style="danger"
                    onClick={doConfirm}
                />
            </XModalFooter>
        </XView>
    );
});

export function showLogoutConfirmation() {
    showModalBox({ title: 'Logout from app' }, ctx => {
        return <LogoutDialog ctx={ctx} />;
    });
}