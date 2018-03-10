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

const XTableBodyRowStyle = Glamorous.tr<{ noHover?: boolean }>((props) => ({
    cursor: 'pointer',
    borderBottom: '1px solid #F5F6F8',
    '&:hover': {
        backgroundColor: props.noHover ? undefined : '#f6f9fc'
    }
}));

let XTableTD = Glamorous.td<{ width?: number }>((props) => ({
    width: props.width ? props.width : undefined,
    maxWidth: 0,
    verticalAlign: 'middle'
}));

let XTableTDDiv = Glamorous.div<{ textAlign?: 'left' | 'right' }>((props) => ({
    display: 'flex',
    alignContent: 'center',
    height: 39,
    width: '100%',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 9,
    fontWeight: 600,
    color: '#182642',
    fontSize: 13,
    lineHeight: 'normal',

    '> a': {
        minHeight: 'auto !important',
        padding: '0 !important',
        background: 'transparent',
        justifyContent: 'flex-end'
    },
    '> div': {
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: props.textAlign,
        '> i': {
            fontSize: 20,
            color: 'rgb(82, 95, 127)'
        }
    }
}));

const XTableTDDivAsLink = Glamorous(XLink)<{ textAlign?: 'left' | 'right' }>((props) => ({
    display: 'flex',
    alignContent: 'center',
    height: 39,
    width: '100%',
    alignItems: 'center',
    fontWeight: 600,
    color: '#182642',
    fontSize: 13,
    lineHeight: 'normal',
    paddingTop: 12,
    paddingBottom: 9,
    paddingLeft: 16,
    paddingRight: 16,
    '&:hover': {
        color: 'inherit'
    },
    '> div': {
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: props.textAlign,
        '> i': {
            fontSize: 20,
            color: 'rgb(82, 95, 127)'
        }
    }
}));

export function XTableHeader(props: { children: any }) {
    return (<thead><tr>{props.children}</tr></thead>);
}

export function XTableBody(props: { children: any }) {
    return (<tbody>{props.children}</tbody>);
}

interface XTableRowProps {
    onClick?: (e?: any) => void;
    path?: string;
    href?: string;
    noHover?: boolean;
}

export class XTableRow extends React.Component<XTableRowProps> {
    render() {
        let content: any[] = [];
        for (let i of React.Children.toArray(this.props.children)) {
            if (React.isValidElement(i) && (this.props.path!! || this.props.href!!)) {
                let element = React.cloneElement(i as any, {
                    path: this.props.path,
                    href: this.props.href
                });
                content.push(element);
            } else {
                content.push(i);
            }
        }
        return (
            <XTableBodyRowStyle onClick={this.props.onClick} noHover={this.props.noHover}>
                {content}
            </XTableBodyRowStyle>
        );
    }
}

interface XTableCellProps {
    children: any;
    width?: number;
    textAlign?: 'left' | 'right';
    path?: string;
    href?: string;
}

export function XTableCell(props: XTableCellProps) {
    return (
        <XTableTD width={props.width}>
            {(props.path || props.href)
                ? (<XTableTDDivAsLink path={props.path} href={props.href} textAlign={props.textAlign}><div>{props.children}</div></XTableTDDivAsLink>)
                : (<XTableTDDiv textAlign={props.textAlign}><div>{props.children}</div></XTableTDDiv>)}
        </XTableTD>
    );
}

export class XTable extends React.Component {
    static Header = XTableHeader;
    static Body = XTableBody;
    static Row = XTableRow;
    static Cell = XTableCell;

    render() {
        return (
            <TableHeader>
                {this.props.children}
            </TableHeader>
        );
    }
}