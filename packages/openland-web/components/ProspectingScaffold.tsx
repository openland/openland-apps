import * as React from 'react';
import { Scaffold } from './Scaffold';
import { Sidebar } from './Sidebar';

export function ProspectingScaffold(props: { children: any }) {
    return (
        <Scaffold>
            <Scaffold.Menu>
                <Sidebar title="Prospecting">
                    <Sidebar.Item query={{ field: 'public' }}>Private land</Sidebar.Item>
                    <Sidebar.Item query={{ field: 'public', value: 'true' }}>Public land</Sidebar.Item>
                </Sidebar>
            </Scaffold.Menu>
            {props.children}
        </Scaffold>
    );
}