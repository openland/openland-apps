import * as React from 'react';
import { XView } from 'react-mental';
import { MenuItem } from 'openland-web/components/MainLayout';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { Navigation } from '../../../../components/Navigation';
import { XScrollView2 } from 'openland-x/XScrollView2';

export const SettingsNavigation = React.memo(
    ({ title, children }: { title: string; children: any }) => {
        return (
            <Navigation
                title={title}
                swapFragmentsOnMobile
                tab={'empty'}
                menuChildrenContent={
                    <>
                        <MenuItem title="Profile" path="/settings/profile" />
                        <MenuItem title="Notifications" path="/settings/notifications" />
                        <XWithRole role={['feature-non-production']}>
                            <MenuItem title="Apps" path="/settings/apps" />
                        </XWithRole>
                    </>
                }
                secondFragment={
                    <XView flexGrow={1} position="relative">
                        <XScrollView2 height="100%" flexGrow={1}>{children}</XScrollView2>
                    </XView>
                }
            />
        );
    },
);
