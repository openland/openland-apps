import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from './XLink';
import XStyles from './XStyles';

let TableHeader = Glamorous.table({
    width: 'calc(100% - ' + (XStyles.paddings.xlarge * 2) + 'px)',
    ...XStyles.text.h600,
    borderCollapse: 'collapse',
    marginLeft: XStyles.paddings.xlarge,
    marginRight: XStyles.paddings.xlarge,

    '> thead': {
        backgroundColor: '#ffffff',
        color: '#525f7f',
        borderBottomColor: '#d8d8da',
        borderBottomWidth: '2px',
        borderBottomStyle: 'solid',

        '> tr > td > div': {
            paddingTop: XStyles.paddings.medium,
            paddingBottom: XStyles.paddings.medium,
            ...XStyles.text.h400
        }
    },
    '& tr > td:first-child > div': {
        paddingLeft: XStyles.paddings.small
    },
    '& tr > td:last-child > div': {
        paddingRight: XStyles.paddings.small
    },
    '& tr > td:first-child > a': {
        paddingLeft: XStyles.paddings.small
    },
    '& tr > td:last-child > a': {
        paddingRight: XStyles.paddings.small
    },
    '> tbody': {
        color: '#182642'
    }
});

const XTableBodyRowStyle = Glamorous.tr<{ noHover?: boolean }>((props) => ({
    cursor: props.noHover ? 'default' : 'pointer',
    borderBottom: '1px solid #F5F6F8',
    '&:hover': {
        backgroundColor: props.noHover ? undefined : '#f6f9fc'
    }
}));

let XTableTD = Glamorous.td<{ width?: number }>((props) => ({
    width: props.width ? props.width : undefined,
    maxWidth: props.width ? props.width : 0,
    verticalAlign: 'middle'
}));

let XTableTDDiv = Glamorous.div<{ textAlign?: 'left' | 'right' | 'center' }>((props) => ({
    display: 'flex',
    alignContent: 'center',
    height: 39,
    width: '100%',
    alignItems: 'center',
    paddingLeft: XStyles.paddings.large,
    paddingRight: XStyles.paddings.large,
    paddingTop: 12,
    paddingBottom: 9,
    ...XStyles.text.p,
    color: '#182642',

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

const XTableTDDivAsLink = Glamorous(XLink)<{ textAlign?: 'left' | 'right' | 'center' }>((props) => ({
    display: 'flex',
    alignContent: 'center',
    height: 39,
    width: '100%',
    alignItems: 'center',
    ...XStyles.text.p,
    color: '#182642',
    lineHeight: 'normal',
    paddingTop: 12,
    paddingBottom: 9,
    paddingLeft: XStyles.paddings.large,
    paddingRight: XStyles.paddings.large,
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
    textAlign?: 'left' | 'right' | 'center';
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