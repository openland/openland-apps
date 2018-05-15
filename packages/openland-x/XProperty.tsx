import * as React from 'react';
import Glamorous from 'glamorous';
import XStyles from 'openland-x/XStyles';

let XCardFieldContainer = Glamorous.div<{ compact?: boolean, divider?: boolean }>((props) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: props.compact ? 16 : 24,
    paddingRight: props.compact ? 16 : 24,
    marginBottom: 8,
    '&:last-child': {
        marginBottom: 0
    },
    '&::after': props.divider ? {
        content: `''`,
        bottom: -1,
        left: 24,
        position: 'absolute',
        right: 24,
        height: 1,
        backgroundColor: '#e6ebf1'
    } : {}
}));

let XCardFieldTitle = Glamorous.div<{ width?: number }>((props) => ({
    display: 'flex',
    flexDirection: 'row',
    width: props.width ? props.width : 200,
    flexShrink: 0,
    ...XStyles.text.h400,
    // opacity: 0.7,
    // fontSize: 14,
    // fontWeight: 'normal',
    // lineHeight: 1.71,
    lineHeight: '24px',
    textAlign: 'left',
    // color: '#525f7f'
}));

let XCardFieldValue = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',

    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    ...XStyles.text.p,
    // fontSize: 14,
    // fontWeight: 'normal',
    // lineHeight: 1.71,
    lineHeight: '24px',
    textAlign: 'left',
    // color: '#182642'
});

let XCardPropertyListDiv = Glamorous.div<{ width?: number }>((props) => ({
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 12,
    paddingBottom: 12,
    width: props.width
}));

let XCardPropertyColumsDiv = Glamorous.div<{ children: any, fwrap?: boolean }>((props) => ({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: props.fwrap ? 'wrap' : 'nowrap'
}));

let XCardPropertyColumnsContainerDiv = Glamorous.div<{ grow?: number }>((props) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    flexBasis: 0,
    flexGrow: (props.grow !== undefined ? props.grow : 1)
}));

let XCardPropertyTitle = Glamorous.div<{ compact?: boolean }>((props) => ({
    ...XStyles.text.h600,
    paddingLeft: props.compact ? 16 : 24,
    paddingRight: props.compact ? 16 : 24,
    textAlign: 'left',
    color: '#262626',
    marginBottom: 14,
    letterSpacing: -0.4
}));

let XCardPropertySubTitle = Glamorous.div<{ compact?: boolean }>((props) => ({
    ...XStyles.text.h500,
    paddingLeft: props.compact ? 16 : 24,
    paddingRight: props.compact ? 16 : 24,
    textAlign: 'left',
    color: '#262626',
    marginBottom: 10
}));

export const XPropertyColumns = (props: { children: any, wrap?: boolean, grow?: number }) => (
    <XCardPropertyColumsDiv fwrap={props.wrap}>
        {React.Children.toArray(props.children).map((v, i) => (
            <XCardPropertyColumnsContainerDiv key={'chilren_' + i} grow={props.grow}>{v}</XCardPropertyColumnsContainerDiv>
        ))}
    </XCardPropertyColumsDiv>
);

export const XPropertyList = (props: { children: any, title?: string, compact?: boolean, width?: number, subtitle?: boolean }) => (
    <XCardPropertyListDiv width={props.width}>
        {props.title && (props.subtitle ? (<XCardPropertySubTitle compact={props.compact}>{props.title} </XCardPropertySubTitle>) : (<XCardPropertyTitle compact={props.compact}>{props.title} </XCardPropertyTitle>))}
        {props.children}
    </XCardPropertyListDiv>
);

export const XProperty = (props: { children: any, title?: string, width?: number, compact?: boolean, divider?: boolean }) => (
    <XCardFieldContainer compact={props.compact} divider={props.divider}>
        {props.title && (<XCardFieldTitle width={props.width}>{props.title}</XCardFieldTitle>)}
        {React.Children.count(props.children) > 0 && <XCardFieldValue>{props.children}</XCardFieldValue>}
    </XCardFieldContainer>
);