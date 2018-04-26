import * as React from 'react';
import { Scaffold } from './Scaffold';
import { Sidebar } from './Sidebar';

export function ProspectingScaffold(props: { children: any }) {
    return (
        <Scaffold>
            <Scaffold.Menu>
                <Sidebar title="Prospecting">
                    <Sidebar.Item query={{ field: 'pipeline' }}>All</Sidebar.Item>
                    <Sidebar.Item query={{ field: 'pipeline', value: 'private' }}>Private land</Sidebar.Item>
                    <Sidebar.Item query={{ field: 'pipeline', value: 'public' }}>Public land</Sidebar.Item>
                    <Sidebar.Subitem query={{ field: 'pipeline', value: 'hpd' }}>NYC HPD</Sidebar.Subitem>
                </Sidebar>
            </Scaffold.Menu>
            {props.children}
        </Scaffold>
    );
}