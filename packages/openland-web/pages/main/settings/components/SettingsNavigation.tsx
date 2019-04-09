import * as React from 'react';
import { XView } from 'react-mental';
import { MenuItem } from 'openland-web/components/MainLayout';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { Navigation } from '../../../../components/Navigation';
import { XMemo } from 'openland-y-utils/XMemo';
import { XScrollView3 } from 'openland-x/XScrollView3';

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
                <XView flexGrow={1} position="relative" flexShrink={1}>
                    <XScrollView3 height="100%" flexGrow={1}>
                        {children}
                    </XScrollView3>
                </XView>
            }
        />
    );
});
