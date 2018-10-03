import '../../init';
import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { Sidebar } from '../../../components/Sidebar';

export function DevToolsScaffold(props: { title: string, children?: any }) {
    return (
        <>
            <XDocumentHead title={[props.title]} />
            <Scaffold>
                <Scaffold.Menu>
                    <Sidebar title="Dev Tools">
                        <Sidebar.Item path="/super">Organizations</Sidebar.Item>
                        <Sidebar.Item path="/super/users">Online</Sidebar.Item>
                        <Sidebar.Item path="/super/stats">Stats</Sidebar.Item>
                        <Sidebar.Item path="/super/features">Features</Sidebar.Item>
                        <Sidebar.Item path="/super/admins">Super Admins</Sidebar.Item>
                        <Sidebar.Item path="/super/debug">Debugging</Sidebar.Item>
                        <Sidebar.Item path="/super/readers">Event Readers</Sidebar.Item>
                    </Sidebar>
                </Scaffold.Menu>
                <Scaffold.Content>
                    {props.children}
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}