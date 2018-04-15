import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from './X/XLink';
import XStyles from './X/XStyles';

const SidebarContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    width: '208px',
    paddingRight: '8px'
});

const SidebarHeader = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,

    ...XStyles.text.h600
});

export const SidebarItem = Glamorous(XLink)({
    ...XStyles.text.m500,
    lineHeight: '32px',
    paddingLeft: '16px',
    paddingRight: '16px',
    '&.is-active': {
        color: XStyles.color.accent
    }
});

export class Sidebar extends React.Component<{ title: string }> {
    static Item = SidebarItem;

    render() {
        return (
            <SidebarContainer>
                <SidebarHeader>{this.props.title}</SidebarHeader>
                {this.props.children}
            </SidebarContainer>
        );
    }
}