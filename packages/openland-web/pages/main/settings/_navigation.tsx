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
                    <Sidebar.Item path="/settings/profile">Profile</Sidebar.Item>
                    <Sidebar.Item path="/settings/notifications">Notifications</Sidebar.Item>
                    <Sidebar.Item path="/settings/invites">Invites</Sidebar.Item>
                    <Sidebar.Item path="/settings/dev">Developer keys</Sidebar.Item>
                </Sidebar>
            </Scaffold.Menu>
            <Scaffold.Content padding={false}>
                {props.children}
            </Scaffold.Content>
        </Scaffold>
    </>
);