import * as React from 'react';
import Glamorous from 'glamorous';

let TableHeader = Glamorous.table({

    width: '100%', // alignSelf: 'stretch' is not working here for some reason

    fontWeight: 600,
    lineHeight: '20px',

    borderCollapse: 'collapse',

    '> thead': {
        backgroundColor: '#EBECF8',
        color: '#525f7f',

        '> tr > td > div': {
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 16,
            paddingRight: 16,

            fontSize: 13,
            fontWeight: 'normal',
            lineHeight: 'normal',
            textAlign: 'left',
            color: '#525f7f'
        }
    },
    '> tbody': {
        color: '#182642',
        '> tr': {
            cursor: 'pointer',
            borderBottom: '1px solid #F5F6F8',
            '&:hover': {
                backgroundColor: '#f6f9fc'
            }
        },
        '> tr > td > div': {
            paddingTop: 9,
            paddingBottom: 9,
            paddingLeft: 16,
            paddingRight: 16,
            fontSize: 13,
            fontWeight: 600,
            lineHeight: 'normal',
            textAlign: 'left',
            color: '#182642'
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