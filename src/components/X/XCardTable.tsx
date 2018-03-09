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
            },

            '> td > div': {
                paddingTop: 9,
                paddingBottom: 9,
                fontWeight: 600,
                color: '#182642',
            }

        }
    }
});

let XCardTableTD = Glamorous.td<{width?: number}>((props) => ({
    width: props.width ? props.width : undefined,
    verticalAlign: 'middle'
}))

let XCardTableTDDiv = Glamorous.div<{justifyContent?: 'flex-start' | 'flex-end'}>((props) => ({
    display: 'flex',
    justifyContent: props.justifyContent,
    paddingLeft: 16,
    paddingRight: 16,

    fontSize: 13,
    fontWeight: 'normal',
    lineHeight: 'normal',

    '> a': {
        minHeight: 'auto !important',
        padding: '0 !important',
        background: 'transparent',
        justifyContent: 'flex-end'
    }
}))

export function XCardTableHeader(props: { children: any }) {
    return (<thead><tr>{props.children}</tr></thead>);
}

export function XCardTableBody(props: { children: any }) {
    return (<tbody>{props.children}</tbody>);
}

export function XCardTableCell(props: { children: any, width?: number, justifyContent?: 'flex-start' | 'flex-end'}) {
    return (
            <XCardTableTD width={props.width}>
                <XCardTableTDDiv justifyContent={props.justifyContent}>{props.children}</XCardTableTDDiv>
            </XCardTableTD>
    );
}

export class XCardTable extends React.Component {
    static Header = XCardTableHeader;
    static Cell = XCardTableCell;
    static Body = XCardTableBody;

    render() {
        return (
            <TableHeader>
                {this.props.children}
            </TableHeader>
        )
    }
}