import * as React from 'react';
import Glamorous from 'glamorous';

let XCardFieldContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '24px',
    paddingRight: '24px',
});

let XCardFieldTitle = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    width: '200px',
    lineHeight: 1.6,
    paddingTop: '2px',
    paddingBottom: '2px',
    opacity: 0.7
})

let XCardFieldValue = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    lineHeight: 1.6,
    paddingTop: '2px',
    paddingBottom: '2px',
})

let XCardPropertyListDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '16px',
    paddingBottom: '16px'
})

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
})

export function XCardPropertyColumns(props: { children: any }) {
    return (
        <XCardPropertyColumsDiv>
            {React.Children.toArray(props.children).map((v, i) => (
                <XCardPropertyColumnsContainerDiv key={'chilren_' + i}>{v}</XCardPropertyColumnsContainerDiv>
            ))}
        </XCardPropertyColumsDiv>
    )
}

export function XCardPropertyList(props: { children: any }) {
    return <XCardPropertyListDiv>{props.children}</XCardPropertyListDiv>
}

export function XCardProperty(props: { title: string, children: any }) {
    return (
        <XCardFieldContainer>
            <XCardFieldTitle>{props.title}</XCardFieldTitle>
            {React.Children.count(props.children) > 0 && <XCardFieldValue>{props.children}</XCardFieldValue>}
        </XCardFieldContainer>
    )
}