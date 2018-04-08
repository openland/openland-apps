import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from './XLink';

export const XTabItem = Glamorous(XLink)({
    cursor: 'pointer',
    userSelect: 'none',
    flexGrow: 1,
    fontSize: 14,
    fontWeight: 500,
    color: '#525f7f',
    backgroundColor: '#f6f9fc',
    paddingTop: 16,
    paddingBottom: 12,
    textAlign: 'center',
    boxShadow: '-1px 0 #e6ebf1',
    '&.is-active': {
        color: '#6772e5',
        backgroundColor: '#fff',
        boxShadow: 'rgb(103, 114, 229) 0px 3px inset, rgb(230, 235, 241) -1px 0px inset'
    }
});

const XTabsDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    boxShadow: '0 7px 14px 0 rgba(50, 50, 93, .1), 0 3px 6px 0 rgba(0, 0, 0, .07)',
    borderRadius: 4,
    overflow: 'hidden'
});

export class XTab extends React.Component {

    static Item = XTabItem;

    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <XTabsDiv>
                {this.props.children}
            </XTabsDiv>
        );
    }
}