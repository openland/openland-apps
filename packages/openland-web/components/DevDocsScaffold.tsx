import * as React from 'react';
import { Scaffold } from './Scaffold';
import { XHead } from './X/XHead';
import { Sidebar } from './Sidebar';

export function DevDocsScaffold(props: { title: string, children?: any }) {
    return (
        <>
            <XHead title={[props.title]} />
            <Scaffold>
                <Scaffold.Menu>
                    <Sidebar title="X Framework">
                        <Sidebar.Item path="/ui">Main</Sidebar.Item>
                    </Sidebar>
                </Scaffold.Menu>
                <Scaffold.Content>
                    {props.children}
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}