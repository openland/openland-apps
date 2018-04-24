import * as React from 'react';
import Glamorous from 'glamorous';
import XStyles from './XStyles';

let XCardFieldContainer = Glamorous.div<{ compact?: boolean }>((props) => ({
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: props.compact ? 16 : 24,
    paddingRight: props.compact ? 16 : 24,
    marginBottom: 8,
    '&:last-child': {
        marginBottom: 0
    }
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
    paddingTop: '12px',
    paddingBottom: '12px',
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
    marginBottom: 8
}));

let XCardPropertySubTitle = Glamorous.div<{ compact?: boolean }>((props) => ({
    ...XStyles.text.h500,
    paddingLeft: props.compact ? 16 : 24,
    paddingRight: props.compact ? 16 : 24,
    textAlign: 'left',
    color: '#262626',
    marginBottom: 8
}));

export function XCardPropertyColumns(props: { children: any, wrap?: boolean, grow?: number }) {
    return (
        <XCardPropertyColumsDiv fwrap={props.wrap}>
            {React.Children.toArray(props.children).map((v, i) => (
                <XCardPropertyColumnsContainerDiv key={'chilren_' + i} grow={props.grow}>{v}</XCardPropertyColumnsContainerDiv>
            ))}
        </XCardPropertyColumsDiv>
    );
}

export function XCardPropertyList(props: { children: any, title?: string, compact?: boolean, width?: number, subtitle?: boolean }) {
    return (
        <XCardPropertyListDiv width={props.width}>
            {props.title && (props.subtitle ? (<XCardPropertySubTitle compact={props.compact}>{props.title} </XCardPropertySubTitle>) : (<XCardPropertyTitle compact={props.compact}>{props.title} </XCardPropertyTitle>))}
            {props.children}
        </XCardPropertyListDiv>
    );
}

export function XCardProperty(props: { children: any, title?: string, width?: number, compact?: boolean }) {
    return (
        <XCardFieldContainer compact={props.compact}>
            {props.title && (<XCardFieldTitle width={props.width}>{props.title}</XCardFieldTitle>)}
            {React.Children.count(props.children) > 0 && <XCardFieldValue>{props.children}</XCardFieldValue>}
        </XCardFieldContainer>
    );
}