import * as React from 'react';
import Glamorous from 'glamorous';

const SidebarContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    width: '208px',
    paddingRight: '8px'
});

const SidebarHeader = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    height: '56px',
    fontSize: '20px',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '8px',
    paddingBottom: '8px',
    alignItems: 'center'
});

export function Sidebar(props: { title: string, children: any }) {
    return (
        <SidebarContainer>
            <SidebarHeader>{props.title}</SidebarHeader>
            {}
        </SidebarContainer>
    );
}