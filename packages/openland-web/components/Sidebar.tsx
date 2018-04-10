import * as React from 'react';
import Glamorous from 'glamorous';
import { XCard } from './X/XCard';

const SidebarContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    width: '208px',
    paddingRight: '8px'
});

export function Sidebar(props: { title: string, children: any }) {
    return (
        <SidebarContainer>
            <XCard.Header text={props.title} />
            {props.children}
        </SidebarContainer>
    );
}