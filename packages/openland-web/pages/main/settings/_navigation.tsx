import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { Sidebar } from '../../../components/Sidebar';

export const Navigation = (props: { title: string, children?: any }) => (
    <>
        <XDocumentHead title={props.title} />
        <Scaffold>
            <Scaffold.Menu>
                <Sidebar title="Settings">
                    <Sidebar.Item path="/settings/organization">Organization</Sidebar.Item>
                    <Sidebar.Subitem anchor="/settings/organization#do">Dev. opportunities</Sidebar.Subitem>
                    <Sidebar.Subitem anchor="/settings/organization#ar">Acquisitions</Sidebar.Subitem>
                    <Sidebar.Subitem anchor="/settings/organization#contacts">Contacts</Sidebar.Subitem>
                    <Sidebar.Subitem anchor="/settings/invites">Team</Sidebar.Subitem>
                    <Sidebar.Item path="/settings/profile">Profile</Sidebar.Item>
                </Sidebar>
            </Scaffold.Menu>
            <Scaffold.Content padding={false} >
                {props.children}
            </Scaffold.Content>
        </Scaffold>
    </>);