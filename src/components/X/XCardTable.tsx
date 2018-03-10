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
}))

let XCardTableTDDiv = Glamorous.div<{ justifyContent?: 'flex-start' | 'flex-end' | 'center' }>((props) => ({
    display: 'flex',
    justifyContent: props.justifyContent,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 9,
    paddingBottom: 9,
    fontWeight: 600,
    color: '#182642',
    fontSize: 13,
    lineHeight: 'normal',

    '> i': {
        fontSize: 20,
        color: 'rgb(82, 95, 127)'
    },

    '> a': {
        minHeight: 'auto !important',
        padding: '0 !important',
        background: 'transparent',
        justifyContent: 'flex-end'
    }
}))

const XCardTableTDDivAsLink = Glamorous(XLink)<{ justifyContent?: 'flex-start' | 'flex-end' | 'center' }>((props) => ({
    display: 'flex',
    justifyContent: props.justifyContent,
    fontWeight: 600,
    color: '#182642',
    fontSize: 13,
    lineHeight: 'normal',
    width: '100%',
    height: '100%',
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 16,
    paddingRight: 16,
    '> i': {
        fontSize: 20,
        color: 'rgb(82, 95, 127)'
    },
    '&:hover': {
        color: 'inherit'
    }
}))

export function XCardTableHeader(props: { children: any }) {
    return (<thead><tr>{props.children}</tr></thead>);
}

export function XCardTableBody(props: { children: any }) {
    return (<tbody>{props.children}</tbody>);
}

const XCardTableBodyRowStyle = Glamorous.tr<{ noHover?: boolean }>((props) => ({
    position: 'relative',
    cursor: 'pointer',
    borderBottom: '1px solid #F5F6F8',
    '&:hover': {
        backgroundColor: props.noHover ? undefined : '#f6f9fc'
    }
}))

interface XCardTableRowProps {
    onClick?: (e?: any) => void,
    path?: string,
    href?: string,
    noHover?: boolean
}

export class XCardTableRow extends React.Component<XCardTableRowProps> {
    render() {
        let content: any[] = []
        React.Children.map(this.props.children, (child: React.ReactElement<XCardTableCellProps>) => {
            if (React.isValidElement(child) && (child.props as any)._isTableCellElement === true && (this.props.path!! || this.props.href!!)) {
                let element = React.cloneElement(child as any, {
                    path: this.props.path,
                    href: this.props.href
                })
                content.push(element)
            } else {
                content.push(child)
            }
        })
        return (
            <XCardTableBodyRowStyle onClick={this.props.onClick} noHover={this.props.noHover}>
                {content}
            </XCardTableBodyRowStyle>
        );
    }
}

interface XCardTableCellProps {
    children: any,
    width?: number,
    justifyContent?: 'flex-start' | 'flex-end' | 'center',
    path?: string,
    href?: string
}

export class XCardTableCell extends React.Component<XCardTableCellProps> {
    static defaultProps = {
        _isTableCellElement: true
    }
    render() {
        return (
            <XCardTableTD width={this.props.width}>
                {(this.props.path || this.props.href)
                    ? (<XCardTableTDDivAsLink path={this.props.path} href={this.props.href} justifyContent={this.props.justifyContent}>{this.props.children}</XCardTableTDDivAsLink>)
                    : (<XCardTableTDDiv justifyContent={this.props.justifyContent}>{this.props.children}</XCardTableTDDiv>)}
            </XCardTableTD>
        )
    }
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
        )
    }
}