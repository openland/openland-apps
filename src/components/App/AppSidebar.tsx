import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from '../X/XLink';
import XStyled from '../X/XStyled';

let Container = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    width: '240px',
    alignSelf: 'stretch',
    paddingTop: '56px'
})

let SidebarItemDiv = XStyled(XLink)({
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: '24px',
    marginTop: '4px',
    marginBottom: '4px',
    paddingLeft: '32px',
    paddingRight: '32px',
    alignItems: 'center',

    fontWeight: 500,
})

function AppSidebarItem(props: { title: string }) {
    return (
        <SidebarItemDiv>{props.title}</SidebarItemDiv>
    )
}

export class AppSidebar extends React.Component {
    static Item = AppSidebarItem;

    render() {
        return (
            <Container>
                {this.props.children}
            </Container>
        )
    }
}