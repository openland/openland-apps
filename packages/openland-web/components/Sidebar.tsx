import * as React from 'react';
import Glamorous from 'glamorous';
import { XCard } from './X/XCard';
import { XLink } from './X/XLink';
import { XHeader } from './X/XHeader';

const SidebarContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    width: '208px',
    paddingRight: '8px'
});

export const SidebarItem = Glamorous(XLink)({
    paddingLeft: '16px',
    paddingRight: '16px',
    fontSize: '16px',
    fontWeight: 700,
    '&.is-active': {
        color: '#522BFF'
    }
});

// export function SidebarItem(props: { title: string, path: string }) {
//     return (

//     )
// }

export class Sidebar extends React.Component<{ title: string }> {
    static Item = SidebarItem;

    render() {
        return (
            <SidebarContainer>
                <XHeader text={this.props.title} />
                {this.props.children}
            </SidebarContainer>
        );
    }
}