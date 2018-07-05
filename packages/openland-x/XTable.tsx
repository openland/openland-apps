import * as React from 'react';
import Glamorous from 'glamorous';
import { CSSProperties } from 'glamorous';
import * as classnames from 'classnames';
import XStyles from './XStyles';
import { XIcon } from 'openland-x/XIcon';
import { XLink } from 'openland-x/XLink';

let TableHeader = Glamorous.table({
    width: 'calc(100% - ' + (XStyles.paddings.xlarge * 2) + 'px)',
    ...XStyles.text.h600,
    borderCollapse: 'collapse',
    marginLeft: XStyles.paddings.xlarge,
    marginRight: XStyles.paddings.xlarge,

    '> thead': {
        backgroundColor: '#ffffff',
        color: '#525f7f',
        borderBottomColor: 'rgba(151, 151, 151, 0.14)',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',

        '> tr > td > div': {
            paddingTop: XStyles.paddings.medium,
            paddingBottom: XStyles.paddings.medium,
            // ...XStyles.text.h400
            opacity: 0.4,
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: 0.1,
            color: '#1f3449'
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
    // '> tbody': {
    //     color: '#182642'
    // }
});

const XTableBodyRowStyle = Glamorous.tr<{ noHover?: boolean }>((props) => ({
    cursor: props.noHover ? 'default' : 'pointer',
    borderBottom: '1px solid rgba(229, 233, 242, 0.5)',
    '&:hover': {
        backgroundColor: props.noHover ? undefined : '#f6f9fc'
    }
}));

let XTableTD = Glamorous.td<{ width?: number }>((props) => ({
    width: props.width ? props.width : undefined,
    maxWidth: props.width ? props.width : 0,
    verticalAlign: 'middle'
}));

const XTableTDDivStyles = {
    display: 'flex',
    alignContent: 'center',
    height: 39,
    width: '100%',
    alignItems: 'center',
    paddingLeft: XStyles.paddings.large,
    paddingRight: XStyles.paddings.large,
    paddingTop: 12,
    paddingBottom: 9,
    // ...XStyles.text.p
    fontSize: 14,
    letterSpacing: 0.1,
    color: '#1f3449'
} as CSSProperties;

let XTableTDDiv = Glamorous.div({
    ...XTableTDDivStyles,
    '> a': {
        minHeight: 'auto !important',
        padding: '0 !important',
        background: 'transparent',
        justifyContent: 'flex-end'
    }
});

const XTableTDDivAsLink = Glamorous(XLink)({
    ...XTableTDDivStyles,
    '&:hover': {
        color: 'inherit'
    }
});

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
            <XTableBodyRowStyle className={(this.props as any).className} onClick={this.props.onClick} noHover={this.props.noHover || (!this.props.onClick && !this.props.path && !this.props.href)}>
                {content}
            </XTableBodyRowStyle>
        );
    }
}

type OrderBy = 'NO_SORT' | 'ASC' | 'DESC';

interface XTableCellProps {
    children: any;
    width?: number;
    textAlign?: 'left' | 'right' | 'center';
    path?: string;
    href?: string;
    query?: { field: string, value?: string };
    orderBy?: OrderBy;
}

const contetnPosition = {
    'left': 'flex-start',
    'right': 'flex-end',
    'center': 'center'
};

const TDChildrenDiv = Glamorous.div<{ justifyContent?: 'flex-start' | 'flex-end' | 'center' }>((props) => ({
    display: 'flex',
    justifyContent: props.justifyContent,
    alignItems: 'center',
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '> i': {
        fontSize: 20,
        color: 'rgb(82, 95, 127)'
    },
    '& > .order-icon': {
        display: 'block',
        width: 18,
        position: 'relative',
        marginLeft: -2,
        userSelect: 'none',
        '& > i': {
            fontSize: 22,
            position: 'absolute',
            left: 0,
            '&.arrow-top': {
                top: -14
            },
            '&.arrow-down': {
                top: -7
            }
        },
        '&.NO_SORT > i': {
            opacity: 0.3
        },
        '&.ASC': {
            '& i.arrow-top': {
                color: '#650FEA'
            },
            '& i.arrow-down': {
                opacity: 0.3
            }
        },
        '&.DESC': {
            '& i.arrow-down': {
                color: '#650FEA'
            },
            '& i.arrow-top': {
                opacity: 0.3
            }
        },
    }
}));

const TDChildren = (props: { children: any, orderBy?: OrderBy, textAlign?: 'left' | 'right' | 'center' }) => (
    <TDChildrenDiv justifyContent={contetnPosition[props.textAlign || 'flex-start']}>
        {props.children}
        {props.orderBy && (
            <div className={classnames(`order-icon ${props.orderBy}`)}>
                <XIcon icon="arrow_drop_up" className="arrow-top" />
                <XIcon icon="arrow_drop_down" className="arrow-down" />
            </div>
        )}
    </TDChildrenDiv>
);

export function XTableCell(props: XTableCellProps) {
    return (
        <XTableTD width={props.width} className={(props as any).classNames}>
            {
                (props.path || props.href || props.query) ?
                    (
                        <XTableTDDivAsLink path={props.path} href={props.href} query={props.query}>
                            <TDChildren children={props.children} orderBy={props.orderBy} textAlign={props.textAlign} />
                        </XTableTDDivAsLink>
                    )
                    : (
                        <XTableTDDiv>
                            <TDChildren children={props.children} orderBy={props.orderBy} textAlign={props.textAlign} />
                        </XTableTDDiv>
                    )
            }
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
            <TableHeader className={(this.props as any).className}>
                {this.props.children}
            </TableHeader>
        );
    }
}