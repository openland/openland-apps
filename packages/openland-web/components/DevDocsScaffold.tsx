import * as React from 'react';
// import Glamorous from 'glamorous';
import { Scaffold } from './Scaffold';
import { XHead } from './X/XHead';
import { Sidebar } from './Sidebar';
import { XHeader } from './X/XHeader';

// const ContentView = Glamorous.div({
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     paddingLeft: '16px',
//     paddingRight: '16px'
// });

export function DevDocsScaffold(props: { title?: string, children?: any, bottomOffset?: boolean }) {
    return (
        <>
            {props.title !== undefined && (<XHead title={props.title} />)}
            <Scaffold>
                <Scaffold.Menu>
                    <Sidebar title="X Framework">
                        <Sidebar.Item path="/ui">Home</Sidebar.Item>
                        <Sidebar.Item path="/ui/typography">Typography</Sidebar.Item>
                        <Sidebar.Item path="/ui/grid">Grid</Sidebar.Item>
                        <Sidebar.Item path="/ui/buttons">Buttons</Sidebar.Item>
                        <Sidebar.Item path="/ui/map">Map</Sidebar.Item>
                    </Sidebar>
                </Scaffold.Menu>
                <Scaffold.Content padding={false} bottomOffset={props.bottomOffset}>
                    {props.title !== undefined && (<XHeader text={props.title} />)}
                    {props.children}
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}         