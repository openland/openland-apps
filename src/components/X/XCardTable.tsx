import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from './XLink';

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
        color: '#182642'
    }
});

let XCardTableTD = Glamorous.td<{ width?: number }>((props) => ({
    width: props.width ? props.width : undefined,
    verticalAlign: 'middle'
}));

let XCardTableTDDiv = Glamorous.div<{ justifyContent?: 'flex-start' | 'flex-end' | 'center' }>((props) => ({
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
}));

export function XCardTableHeader(props: { children: any }) {
    return (<thead><tr>{props.children}</tr></thead>);
}

export function XCardTableBody(props: { children: any }) {
    return (<tbody>{props.children}</tbody>);
}

const XCardTableBodyRowStyle = Glamorous.tr<{ noHover?: boolean }>((props) => ({
    position: 'relative',
    '> a': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    cursor: 'pointer',
    borderBottom: '1px solid #F5F6F8',

    '&:hover': {
        backgroundColor: props.noHover ? undefined : '#f6f9fc'
    },

    '> td > div': {
        paddingTop: 9,
        paddingBottom: 9,
        fontWeight: 600,
        color: '#182642',
    }
}));

interface XCardTableRowProps {
    children: any;
    onClick?: (e?: any) => void;
    path?: string;
    href?: string;
    noHover?: boolean;
}

export function XCardTableRow(props: XCardTableRowProps) {
    return (
        <XCardTableBodyRowStyle onClick={props.onClick} noHover={props.noHover}>
            {props.children}
            {(props.path || props.href) && <XLink path={props.path} href={props.href} />}
        </XCardTableBodyRowStyle>
    );
}

interface XCardTableCellProps {
    children: any;
    width?: number;
    justifyContent?: 'flex-start' | 'flex-end' | 'center';
}

export function XCardTableCell(props: XCardTableCellProps) {
    return (
        <XCardTableTD width={props.width}>
            <XCardTableTDDiv justifyContent={props.justifyContent}>{props.children}</XCardTableTDDiv>
        </XCardTableTD>
    );
}

export class XCardTable extends React.Component {
    static Header = XCardTableHeader;
    static Body = XCardTableBody;
    static Row = XCardTableRow;
    static Cell = XCardTableCell;

    render() {
        return (
            <TableHeader>
                {this.props.children}
            </TableHeader>
        );
    }
}