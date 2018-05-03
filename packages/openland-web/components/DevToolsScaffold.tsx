import * as React from 'react';
import { Scaffold } from './Scaffold';
import { XHead } from './X/XHead';
import { Sidebar } from './Sidebar';

export function DevToolsScaffold(props: { title: string, children?: any }) {
    return (
        <>
            <XHead title={[props.title]} />
            <Scaffold>
                <Scaffold.Menu>
                    <Sidebar title="Dev Tools">
                        <Sidebar.Item path="/super">Organizations</Sidebar.Item>
                        <Sidebar.Item path="/super/debug">Debugging</Sidebar.Item>
                        <Sidebar.Item path="/super/features">Features</Sidebar.Item>
                        <Sidebar.Item path="/super/admins">Super Admins</Sidebar.Item>
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