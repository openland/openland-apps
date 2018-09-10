import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from './XLink';

const XCardWrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    '> :not(:last-child)': {
        borderBottom: '1px solid #f6f9fc'
    }
});

const XCardItemWrapper = Glamorous(XLink)({
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'stretch',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#f6f9fc'
    }
});

export class XSearchListItem extends React.Component<{ path?: string }> {
    render() {
        return (
            <XCardItemWrapper path={this.props.path}>
                {this.props.children}
            </XCardItemWrapper>
        );
    }
}

export function XSearchList(props: { children: any }) {
    return (<XCardWrapper>{props.children}</XCardWrapper>);
}