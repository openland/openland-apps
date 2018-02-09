import * as React from 'react';
import Glamorous from 'glamorous';

let XCardFieldContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row'
});

let XCardFieldTitle = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    width: '200px',
    paddingLeft: '32px',
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