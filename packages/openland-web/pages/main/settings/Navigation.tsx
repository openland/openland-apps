import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { MainLayout, Sidebar, SidebarItem } from '../../../components/MainLayout';
import { XWithRole } from 'openland-x-permissions/XWithRole';

export const Navigation = (props: { title: string; children?: any }) => (
    <>
        <XDocumentHead title={props.title} />
        <Scaffold>
            <Scaffold.Content padding={false} bottomOffset={false}>
                <MainLayout>
                    <MainLayout.Menu>
                        <Sidebar route={props.title} title="Settings">
                            <SidebarItem title="Profile" path="/settings/profile" />
                            <SidebarItem title="Notifications" path="/settings/notifications" />
                            <XWithRole role={['feature-non-production']}>
                                <SidebarItem title="Apps" path="/settings/apps" />
                            </XWithRole>
                        </Sidebar>
                    </MainLayout.Menu>
                    <MainLayout.Content>{props.children}</MainLayout.Content>
                </MainLayout>
            </Scaffold.Content>
        </Scaffold>
    </>
);
