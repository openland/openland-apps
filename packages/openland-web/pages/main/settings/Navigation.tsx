import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { MainLayout, Sidebar, SidebarItem } from '../../../components/MainLayout';

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
                            <SidebarItem title="Developer keys" path="/settings/dev" />
                        </Sidebar>
                    </MainLayout.Menu>
                    <MainLayout.Content>{props.children}</MainLayout.Content>
                </MainLayout>
            </Scaffold.Content>
        </Scaffold>
    </>
);
