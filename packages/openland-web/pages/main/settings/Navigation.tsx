import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { MainLayout, Menu, MenuItem } from '../../../components/MainLayout';
import { XWithRole } from 'openland-x-permissions/XWithRole';

export const MainNavigation = ({ title, children }: { title: string; children?: any }) => (
    <>
        <XDocumentHead title={title} />
        <Scaffold>
            <Scaffold.Content padding={false} bottomOffset={false}>
                <MainLayout>
                    <MainLayout.Menu>
                        <Menu route={title} title="Settings">
                            <MenuItem title="Profile" path="/settings/profile" />
                            <MenuItem title="Notifications" path="/settings/notifications" />
                            <XWithRole role={['feature-non-production']}>
                                <MenuItem title="Apps" path="/settings/apps" />
                            </XWithRole>
                        </Menu>
                    </MainLayout.Menu>
                    <MainLayout.Content>{children}</MainLayout.Content>
                </MainLayout>
            </Scaffold.Content>
        </Scaffold>
    </>
);
