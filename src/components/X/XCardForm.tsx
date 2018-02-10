import * as React from 'react';
import Glamorous from 'glamorous';

let XFormInput = Glamorous.input<{placeholder?: string}>({
    display: 'block',
    boxSizing: 'border-box',
    fontSize: '16px',
    color: '#8898aa',
    width: '240px',
    padding: '10px 12px',
    borderRadius: '5px',
    border: '1px solid #bad1e9'
})

let XFormContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff'
});

let XFormFieldTitle = Glamorous.div({
    width: '400px',
    textAlign: 'right',
    paddingRight: '24px',
    paddingTop: '10px',
    color: '#262626',
    fontSize: '17px',
    lineHeight: '26px',
})

let XFormFieldDescription = Glamorous.div({
    color: '#5D677A',
    fontSize: '15px',
    lineHeight: '26px',
})

let XFormFieldValue = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '2px',
    paddingBottom: '2px',
})

let XFormPropertyListDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '16px',
    paddingBottom: '16px'
})

export function XCardFormList(props: { children: any }) {
    return <XFormPropertyListDiv>{props.children}</XFormPropertyListDiv>
}

export function XCardFormCell(props: { title: string, placeholder?: string, description?: string }) {
    return (
        <XFormContainer>
            <XFormFieldTitle>{props.title}</XFormFieldTitle>
            <XFormFieldValue>
                <XFormInput placeholder={props.placeholder} />
                {props.description && <XFormFieldDescription>{props.description}</XFormFieldDescription>}
            </XFormFieldValue>
        </XFormContainer>
    )
}