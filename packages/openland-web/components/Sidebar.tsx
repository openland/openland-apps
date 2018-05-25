import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from 'openland-x/XLink';
import XStyles from 'openland-x/XStyles';

const SidebarContainer = Glamorous.div<{width?: number, paddingLeft?: number, paddingRight?: number}>((props) => ({
    display: 'flex',
    flexDirection: 'column',
    width: props.width ? props.width : 208,
    paddingRight: props.paddingRight ? props.paddingRight : 8,
    paddingLeft: props.paddingLeft ? props.paddingLeft :  8
}));

const SidebarHeader = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: XStyles.paddings.large,
    paddingRight: XStyles.paddings.large,
    paddingTop: XStyles.paddings.large,
    paddingBottom: XStyles.paddings.large,
    flexShrink: 0,

    fontSize: 18,
    fontWeight: 600,
    lineHeight: 1.11,
    color: '#334562'
    // ...XStyles.text.h600
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

export class Sidebar extends React.Component<{ title: string, width?: number, paddingLeft?: number, paddingRight?: number }> {
    static Item = SidebarItem;
    static Subitem = SidebarSubItem;

    render() {
        return (
            <SidebarContainer width={this.props.width} paddingLeft={this.props.paddingLeft} paddingRight={this.props.paddingRight}>
                <SidebarHeader>{this.props.title}</SidebarHeader>
                {this.props.children}
            </SidebarContainer>
        );
    }
}