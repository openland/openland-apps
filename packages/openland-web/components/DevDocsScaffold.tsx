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

export function DevDocsScaffold(props: { title?: string, children?: any, bottomOffset?: boolean, hideSidebar?: boolean }) {
    return (
        <>
            {props.title !== undefined && (<XHead title={props.title} />)}
            <Scaffold>
                {props.hideSidebar !== true && (
                    <Scaffold.Menu>
                        <Sidebar title="X Framework">
                            <Sidebar.Item path="/ui">Home</Sidebar.Item>
                            <Sidebar.Item path="/ui/buttons">Button</Sidebar.Item>
                            <Sidebar.Item path="/ui/inputs">Input</Sidebar.Item>
                            <Sidebar.Item path="/ui/map">Map</Sidebar.Item>
                            <Sidebar.Item path="/ui/bullets">Bullet</Sidebar.Item>
                            <Sidebar.Item>Basic Styles</Sidebar.Item>
                            <Sidebar.Subitem path="/ui/typography">Typography</Sidebar.Subitem>
                            <Sidebar.Subitem path="/ui/grid">Grid</Sidebar.Subitem>
                        </Sidebar>
                    </Scaffold.Menu>
                )}
                <Scaffold.Content padding={false} bottomOffset={props.bottomOffset}>
                    {props.title !== undefined && (<XHeader text={props.title} />)}
                    {props.children}
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}         