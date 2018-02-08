import * as React from 'react';
import Glamorous from 'glamorous';

let TableHeader = Glamorous.table({

    width: '100%', // alignSelf: 'stretch' is not working here for some reason

    fontSize: '13px',
    fontWeight: 600,
    lineHeight: '20px',

    borderCollapse: 'collapse',

    '> thead': {
        backgroundColor: '#f6f9fc',
        color: '#525f7f',
        
        '> tr': {
            borderBottom: '1px solid #e6ebf1',
        },

        '> tr > td > div': {
            paddingTop: '8px',
            paddingBottom: '8px',
            paddingLeft: '16px',
            paddingRight: '16px',
        }
    },
    '> tbody': {
        color: '#525f7f',
        '> tr': {
            cursor: 'pointer',
            borderBottom: '1px solid #e6ebf1',
            '&:hover': {
                backgroundColor: '#f6f9fc'
            }
        },
        '> tr > td > div': {
            paddingTop: '8px',
            paddingBottom: '8px',
            paddingLeft: '16px',
            paddingRight: '16px',
        }
    }
});

export function XCardTableHeader(props: { children: any }) {
    return (<thead><tr>{props.children}</tr></thead>);
}

export function XCardTableCell(props: { children: any }) {
    return (<td><div>{props.children}</div></td>);
}

export class XCardTable extends React.Component {
    static Header = XCardTableHeader;
    static Cell = XCardTableCell;

    render() {
        return (
            <TableHeader>
                {this.props.children}
            </TableHeader>
        )
    }
}