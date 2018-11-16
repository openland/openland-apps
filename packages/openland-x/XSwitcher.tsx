import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink, XLinkProps } from './XLink';
import { styleResolver } from 'openland-x-utils/styleResolver';
import { XContentWrapper } from './XContentWrapper';

type XSwitcherStyleType = 'default' | 'field' | 'flat' | 'button';
type XSwitcherAlignSelfType = 'stretch' | 'flex-start' | 'flex-end' | 'center';

const styleIdentation = styleResolver({
    'default': {
        padding: '3px 9px 2px',
        boxShadow: '0 0 0 1px rgba(50, 50, 93, .1), 0 2px 5px 0 rgba(50, 50, 93, .08), 0 1px 1.5px 0 rgba(0, 0, 0, .07), 0 1px 2px 0 rgba(0, 0, 0, .08), 0 0 0 0 transparent',
    },

    'field': {
        padding: 0,
        boxShadow: '0 0 0 1px rgba(50, 50, 93, .1), 0 2px 5px 0 rgba(50, 50, 93, .08), 0 1px 1.5px 0 rgba(0, 0, 0, .07), 0 1px 2px 0 rgba(0, 0, 0, .08), 0 0 0 0 transparent',
    },

    'flat': {
        padding: '3px 0 2px',
    },

    'button': {
        padding: '18px 0 0',
    }
});

const styleItemIdentation = styleResolver({
    'default': {
        fontSize: 14,
        fontWeight: 400,
        paddingLeft: 14,
        paddingRight: 14,
        color: '#6b7c93',
        lineHeight: 1.6,

        '&.is-active': {
            fontWeight: 600,
            color: '#6772e5',
        }
    },

    'field': {
        fontSize: 14,
        fontWeight: 400,
        paddingLeft: 14,
        paddingRight: 14,
        height: 32,
        color: '#182642',
        lineHeight: '2.29',

        '&:hover': {
            backgroundColor: '#F5F6F8'
        },
        '&.is-active': {
            fontWeight: 600,
            color: '#fff',
            backgroundColor: '#4428e0',

            '&:hover': {
                backgroundColor: '#4428e0',
            }
        }
    },

    'flat': {
        fontSize: 14,
        fontWeight: 400,
        marginRight: 20,
        color: '#6b7c93',
        lineHeight: 1.6,

        '&.is-active': {
            fontWeight: 600,
            color: '#6772e5',
            borderBottom: '2px solid #6772e5',
        }
    },

    'button': {
        padding: '0 16px',
        fontSize: 16,
        fontWeight: 400,
        lineHeight: '32px',
        letterSpacing: 0,
        color: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 16,
        marginRight: 4,

        '&:first-child': {
            marginLeft: -16,
        },

        '&:hover': {
            color: '#000000',
        },

        '&.is-active': {
            color: '#000000',
            background: '#f5f5f5'
        }
    }
});

const styleCounterIdentation = styleResolver({
    'default': {
        fontSize: '12px',
        background: '#bcc3cc',
        borderRadius: 7,
        color: '#fff',
        marginLeft: 6,
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 2,
        paddingTop: 1,
        paddingBottom: 2,
        fontWeight: 600,
    },

    'field': {
        fontSize: '12px',
        background: '#bcc3cc',
        borderRadius: 7,
        color: '#fff',
        marginLeft: 6,
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 2,
        paddingTop: 1,
        paddingBottom: 2,
        fontWeight: 600,
    },

    'flat': {
        fontSize: '12px',
        background: '#bcc3cc',
        borderRadius: 7,
        color: '#fff',
        marginLeft: 6,
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 2,
        paddingTop: 1,
        paddingBottom: 2,
        fontWeight: 600,
    },

    'button': {
        fontSize: 14,
        fontWeight: 400,
        lineHeight: '32px',
        letterSpacing: 0,
        color: 'rgba(0, 0, 0, 0.4)',
        marginLeft: 6,

        '&.is-highlight': {
            color: '#1790ff'
        }
    }
});

const XSwitcherWrapper = Glamorous.div<{ alignSelf?: XSwitcherAlignSelfType; styleTheme?: XSwitcherStyleType }>([
    (props) => ({
        display: 'flex',
        alignSelf: props.alignSelf,
        borderRadius: 4,
        overflow: 'hidden',
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',

        '& .switcher-item': styleItemIdentation(props.styleTheme),
        '& .switcher-counter': styleCounterIdentation(props.styleTheme)
    }),
    (props) => styleIdentation(props.styleTheme),
]);

const XSwitcherItemStyle = Glamorous(XLink)<{ alignSelf?: XSwitcherAlignSelfType }>([
    (props) => ({
        cursor: 'pointer',
        alignSelf: props.alignSelf,
    })
]);

interface XSwitcherItemProps extends XLinkProps {
    children: any;
    alignSelf?: XSwitcherAlignSelfType;
    counter?: string | number;
    highlight?: boolean;
}

let XSwitcherItem = (props: XSwitcherItemProps) => {
    const { alignSelf, children, counter, highlight, ...other } = props;

    return (
        <XSwitcherItemStyle
            alignSelf={alignSelf}
            className={'switcher-item' + (highlight ? ' is-highlight' : '')}
            {...other}
        >
            {children}
            {counter !== undefined && <span className={'switcher-counter' + (highlight ? ' is-highlight' : '')}>{counter}</span>}
        </XSwitcherItemStyle>
    );
};

interface XSwitcherProps {
    alignSelf?: XSwitcherAlignSelfType;
    style?: XSwitcherStyleType;
    children: any;
}

export class XSwitcher extends React.Component<XSwitcherProps> {
    static Item = XSwitcherItem;

    render() {
        let { style, alignSelf, children } = this.props;

        return (
            <XSwitcherWrapper
                styleTheme={style}
                alignSelf={alignSelf}
            >
                {style === 'button' && (
                    <XContentWrapper withFlex={true}>
                        {children}
                    </XContentWrapper>
                )}
                {style !== 'button' && children}
            </XSwitcherWrapper>
        );
    }
}