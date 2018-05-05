import * as React from 'react';
import Glamorous from 'glamorous';
import XStyles from './X/XStyles';
import { XLink } from 'openland-x/XLink';

const SidebarContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    width: '208px',
    paddingRight: '8px'
});

const SidebarHeader = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: XStyles.paddings.large,
    paddingRight: XStyles.paddings.large,
    paddingTop: XStyles.paddings.large,
    paddingBottom: XStyles.paddings.large,

    ...XStyles.text.h600
});

export const SidebarItem = Glamorous(XLink)({
    ...XStyles.text.m500,
    lineHeight: '32px',
    paddingLeft: XStyles.paddings.large,
    paddingRight: XStyles.paddings.large,
    '&.is-active': {
        color: XStyles.color.accent
    }
});

export const SidebarSubItem = Glamorous(XLink)({
    ...XStyles.text.m500,
    lineHeight: '32px',
    paddingLeft: XStyles.paddings.xlarge,
    paddingRight: XStyles.paddings.large,
    '&.is-active': {
        color: XStyles.color.accent
    }
});

export class Sidebar extends React.Component<{ title: string }> {
    static Item = SidebarItem;
    static Subitem = SidebarSubItem;

    render() {
        return (
            <SidebarContainer>
                <SidebarHeader>{this.props.title}</SidebarHeader>
                {this.props.children}
            </SidebarContainer>
        );
    }
}