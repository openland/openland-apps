import * as React from 'react';
import Glamorous from 'glamorous';

let XCardFieldContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 8,
    '&:last-child': {
        marginBottom: 0
    }
});

let XCardFieldTitle = Glamorous.div<{width?: number}>((props) => ({
    display: 'flex',
    flexDirection: 'row',
    width: props.width ? props.width : 200,
    flexShrink: 0,
    opacity: 0.7,
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 1.71,
    textAlign: 'left',
    color: '#525f7f'
}));

let XCardFieldValue = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',

    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 1.71,
    textAlign: 'left',
    color: '#182642'
});

let XCardPropertyListDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '12px',
    paddingBottom: '12px'
});

let XCardPropertyColumsDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'row'
});

let XCardPropertyColumnsContainerDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    flexBasis: 0,
    flexGrow: 1
});

let XCardPropertyTitle = Glamorous.div({
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: 'normal',
    paddingLeft: 16,
    paddingRight: 16,
    textAlign: 'left',
    color: '#262626',
    marginBottom: 8
});

export function XCardPropertyColumns(props: { children: any }) {
    return (
        <XCardPropertyColumsDiv>
            {React.Children.toArray(props.children).map((v, i) => (
                <XCardPropertyColumnsContainerDiv key={'chilren_' + i}>{v}</XCardPropertyColumnsContainerDiv>
            ))}
        </XCardPropertyColumsDiv>
    );
}

export function XCardPropertyList(props: { children: any, title?: string }) {
    return (
        <XCardPropertyListDiv>
            {props.title && <XCardPropertyTitle>{props.title}</XCardPropertyTitle>}
            {props.children}
        </XCardPropertyListDiv>
    );
}

export function XCardProperty(props: { title: string, children: any, width?: number }) {
    return (
        <XCardFieldContainer>
            <XCardFieldTitle width={props.width}>{props.title}</XCardFieldTitle>
            {React.Children.count(props.children) > 0 && <XCardFieldValue>{props.children}</XCardFieldValue>}
        </XCardFieldContainer>
    );
}