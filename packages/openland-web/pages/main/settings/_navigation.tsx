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
                    <Sidebar.Subitem anchor="/settings/organization#contacts">Contacts</Sidebar.Subitem>
                    <XWithRole role={['super-admin', 'software-developer']}>
                        <Sidebar.Subitem path="/settings/members">Members</Sidebar.Subitem>
                    </XWithRole >
                    <Sidebar.Item path="/settings/profile">User profile</Sidebar.Item>
                </Sidebar>
            </Scaffold.Menu>
            <Scaffold.Content padding={false} >
                {props.children}
            </Scaffold.Content>
        </Scaffold>
    </>);