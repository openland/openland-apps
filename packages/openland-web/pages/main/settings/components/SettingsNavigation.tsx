import * as React from 'react';
import { XView } from 'react-mental';
import { MenuItem } from 'openland-web/components/MainLayout';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { Navigation } from '../../../../components/Navigation';
import { XScrollView2 } from 'openland-x/XScrollView2';
import { XMemo } from 'openland-y-utils/XMemo';

export const SettingsNavigation = XMemo(({ title, children }: { title: string; children: any }) => {
    return (
        <Navigation
            title={title}
            swapFragmentsOnMobile
            tab={'empty'}
            menuChildrenContent={
                <>
                    <MenuItem title="Profile" path="/settings/profile" />
                    <MenuItem title="Notifications" path="/settings/notifications" />
                    <MenuItem title="Appearance" path="/settings/appearance" />
                    <XWithRole role={['feature-non-production']}>
                        <MenuItem title="Apps" path="/settings/apps" />
                    </XWithRole>
                </>
            }
            secondFragment={
                <XView flexGrow={1} position="relative">
                    <XScrollView2 height="100%" flexGrow={1}>
                        {children}
                    </XScrollView2>
                </XView>
            }
        />
    );
});
