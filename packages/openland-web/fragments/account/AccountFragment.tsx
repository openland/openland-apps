import * as React from 'react';
import { XView } from 'react-mental';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { useController } from 'openland-web/pages/unicorn/components/UnicornController';
import { Notifications } from './Notifications';
import { AppearanceTab } from './AppearanceTab';
import { showModalBox } from 'openland-x/showModalBox';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { NativeAppsModal } from 'openland-web/components/NativeAppsModal';

export const AccountFragment = React.memo(() => {
    let controller = useController();
    return (
        <XView flexDirection="column">
            <UListItem
                text="Notifications"
                onClick={() => {
                    controller.push(<Notifications />);
                }}
            />
            <UListItem
                text="Appearance"
                onClick={() => {
                    controller.push(<AppearanceTab />);
                }}
            />
            <UListItem
                text="Download Apps" 
                onClick={() => {
                    showModalBox({ fullScreen: true }, () => (
                        <XScrollView3 flexGrow={1} flexShrink={1}>
                            <NativeAppsModal />
                        </XScrollView3>
                    ));
                }}
            />
        </XView>
    );
});