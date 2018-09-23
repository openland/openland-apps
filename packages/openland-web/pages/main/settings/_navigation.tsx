import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { Sidebar } from '../../../components/Sidebar';
import { XWithRole } from 'openland-x-permissions/XWithRole';

export const Navigation = (props: { title: string, children?: any }) => (
    <>
        <XDocumentHead title={props.title} />
        <Scaffold>
            <Scaffold.Menu>
                <Sidebar title="Settings">
                    <Sidebar.Item path="/settings/organization">Organization</Sidebar.Item>
                    <Sidebar.Subitem anchor="/settings/organization#general">General</Sidebar.Subitem>
                    <Sidebar.Subitem anchor="/settings/organization#links">Links</Sidebar.Subitem>
                    <XWithRole role={['super-admin', 'software-developer']}>
                        <Sidebar.Subitem anchor="/settings/organization#members">Members</Sidebar.Subitem>
                        <Sidebar.Subitem anchor="/settings/organization#super-admin">Super admin</Sidebar.Subitem>
                    </XWithRole >
                    <Sidebar.Item path="/settings/profile">User</Sidebar.Item>
                    <Sidebar.Item path="/settings/invites">Invites</Sidebar.Item>
                    <Sidebar.Item path="/settings/notifications">Notifications</Sidebar.Item>
                    <Sidebar.Item path="/settings/dev">Development Center</Sidebar.Item>
                </Sidebar>
            </Scaffold.Menu>
            <Scaffold.Content padding={false}>
                {props.children}
            </Scaffold.Content>
        </Scaffold>
    </>
);