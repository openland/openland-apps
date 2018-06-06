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
                    <Sidebar.Item path="/settings/profile">Profile</Sidebar.Item>
                    <Sidebar.Item path="/settings/invites">Invites</Sidebar.Item>
                </Sidebar>
            </Scaffold.Menu>
            <Scaffold.Content>
                {props.children}
            </Scaffold.Content>
        </Scaffold>
    </>);